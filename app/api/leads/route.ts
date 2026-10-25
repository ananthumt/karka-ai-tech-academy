import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

// In-memory rate limiting map: IP -> array of timestamps
const leadRateLimitMap = new Map<string, number[]>();
const LEAD_RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_LEADS_PER_WINDOW = 10;

function checkLeadRateLimit(ip: string): boolean {
  if (process.env.NODE_ENV !== "production" || ip.includes("127.0.0.1") || ip === "::1" || ip === "localhost") {
    return true;
  }
  const now = Date.now();
  const timestamps = leadRateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < LEAD_RATE_LIMIT_WINDOW);
  if (validTimestamps.length >= MAX_LEADS_PER_WINDOW) {
    leadRateLimitMap.set(ip, validTimestamps);
    return false;
  }
  validTimestamps.push(now);
  leadRateLimitMap.set(ip, validTimestamps);
  return true;
}

// Ensure data directory and file exist
function ensureStorage() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), "utf8");
    }
  } catch (err) {
    console.error("[Leads API] Storage initialization warning (serverless/read-only):", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
    if (!checkLeadRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many submission attempts. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, phone, email, program, source } = body;

    // Strict validation & sanitization
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid full name (at least 2 characters)." },
        { status: 400 }
      );
    }
    const cleanName = name.trim().slice(0, 100).replace(/<[^>]*>?/gm, "");

    const cleanPhone = (phone || "").replace(/[^0-9+]/g, "").slice(0, 18);
    if (!cleanPhone || cleanPhone.length < 8) {
      return NextResponse.json(
        { error: "Please enter a valid phone number (at least 8 digits)." },
        { status: 400 }
      );
    }

    // Optional email validation
    let cleanEmail = "";
    if (email && typeof email === "string" && email.trim().length > 0) {
      cleanEmail = email.trim().slice(0, 100);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        return NextResponse.json(
          { error: "Please enter a valid email address." },
          { status: 400 }
        );
      }
    }

    // 4. Check for recent duplicate submissions (same phone or email within last 2 minutes)
    ensureStorage();
    let existingLeads: any[] = [];
    if (fs.existsSync(LEADS_FILE)) {
      try {
        const existingRaw = fs.readFileSync(LEADS_FILE, "utf8");
        existingLeads = JSON.parse(existingRaw);
      } catch {
        existingLeads = [];
      }
    }

    const twoMinutesAgo = Date.now() - 2 * 60 * 1000;
    const duplicate = existingLeads.find((l: any) => {
      const isSamePhone = l.phone && l.phone === cleanPhone;
      const isSameEmail = cleanEmail && l.email && l.email.toLowerCase() === cleanEmail.toLowerCase();
      const isRecent = l.createdAt && new Date(l.createdAt).getTime() > twoMinutesAgo;
      return (isSamePhone || isSameEmail) && isRecent;
    });

    if (duplicate) {
      return NextResponse.json({
        success: true,
        id: duplicate.id,
        duplicate: true,
        message: "Your inquiry has already been received. Our admissions mentor will reach out to you shortly.",
      });
    }

    const newLead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      program: (program || "General Admissions").toString().slice(0, 100).trim(),
      source: (source || "website_form").toString().slice(0, 100).trim(),
      createdAt: new Date().toISOString(),
      status: "new",
    };

    let storedSuccessfully = false;
    let webhookDelivered = false;

    // Save lead persistently to data/leads.json
    try {
      existingLeads.unshift(newLead);
      fs.writeFileSync(LEADS_FILE, JSON.stringify(existingLeads.slice(0, 500), null, 2), "utf8");
      storedSuccessfully = true;
    } catch (saveErr) {
      console.warn("[Leads API] Storage warning (expected on read-only serverless hosts):", saveErr);
    }

    // Optional webhook dispatch (e.g., Slack, CRM, Zapier)
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const whRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLead),
          signal: AbortSignal.timeout(5000),
        });
        if (whRes.ok) {
          webhookDelivered = true;
        } else {
          console.warn(`[Leads API] Webhook returned non-200 status: ${whRes.status}`);
        }
      } catch (webhookErr) {
        console.error("[Leads API] Webhook dispatch error:", webhookErr);
      }
    }

    // Do not claim delivery unless at least one destination (persistent file storage or webhook) confirmed
    if (!storedSuccessfully && !webhookDelivered) {
      return NextResponse.json(
        {
          error: "Unable to save your inquiry due to a temporary storage issue. Please connect directly via WhatsApp at +91 9487530243 or call our team.",
          whatsappFallback: "https://wa.me/919487530243",
        },
        { status: 503 }
      );
    }

    console.log(`[Lead Captured] ID: ${newLead.id} | Name: ${newLead.name} | Phone: ${newLead.phone} | Program: ${newLead.program} | Stored: ${storedSuccessfully} | Webhook: ${webhookDelivered}`);

    return NextResponse.json({
      success: true,
      id: newLead.id,
      storedLocally: storedSuccessfully,
      webhookDispatched: webhookDelivered,
      message: "Lead recorded successfully. Our admissions team will reach out shortly.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to process lead request", details: err?.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  ensureStorage();
  try {
    const raw = fs.readFileSync(LEADS_FILE, "utf8");
    const leads = JSON.parse(raw);
    return NextResponse.json({
      success: true,
      count: leads.length,
      latestLeadTime: leads[0]?.createdAt || null,
    });
  } catch (err: any) {
    return NextResponse.json({ success: true, count: 0, latestLeadTime: null });
  }
}
