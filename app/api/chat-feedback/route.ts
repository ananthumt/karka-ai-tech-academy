import { NextRequest, NextResponse } from "next/server";

/**
 * Collects thumbs up / down ratings on assistant answers.
 *
 * The chat widget had these buttons wired to local state only, so no signal
 * ever reached the team. Ratings are intentionally anonymous: no IP, no
 * cookie, no user text — only the assistant answer being rated, which is
 * already public website copy. That is what makes the answer quality
 * reviewable without collecting PII.
 *
 * Storage is deliberately not the filesystem (serverless hosts are read-only).
 * Set CHAT_FEEDBACK_WEBHOOK_URL to forward into Slack/Sheets/a CRM; otherwise
 * ratings are logged for the host's log drain.
 */

const MAX_ANSWER_CHARS = 500;
const VALID_RATINGS = new Set(["helpful", "unhelpful"]);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { rating, messageId, answer } = body as Record<string, unknown>;

    if (typeof rating !== "string" || !VALID_RATINGS.has(rating)) {
      return NextResponse.json(
        { error: "rating must be 'helpful' or 'unhelpful'" },
        { status: 400 }
      );
    }

    const record = {
      rating,
      messageId: typeof messageId === "string" ? messageId.slice(0, 64) : "unknown",
      answer: typeof answer === "string" ? answer.slice(0, MAX_ANSWER_CHARS) : "",
      createdAt: new Date().toISOString(),
    };

    const webhookUrl = process.env.CHAT_FEEDBACK_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
          signal: AbortSignal.timeout(4000),
        });
      } catch (webhookErr) {
        console.warn("[Chat Feedback] Webhook dispatch failed:", webhookErr);
      }
    }

    console.log(
      `[Chat Feedback] ${record.rating} | ${record.messageId} | ${record.answer.slice(0, 120)}`
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[Chat Feedback] Error:", err?.message || err);
    // Never surface a failure here: the widget treats this as fire-and-forget.
    return NextResponse.json({ success: true });
  }
}
