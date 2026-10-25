import sys, os, json, re
sys.stdout.reconfigure(encoding='utf-8')
from bs4 import BeautifulSoup

course_slugs = [
    "mern-fullstack",
    "react-java-fullstack",
    "react-python-fullstack",
    "genai-foundations",
    "genai-mastery",
    "genai-llm-developer",
    "ai-data-science",
    "data-analytics-ai",
    "data-engineering",
    "ui-ux-design",
    "web-designing",
    "graphic-designing",
    "video-editing",
    "graphic-designing-dm",
    "multimedia-animation",
    "digital-marketing",
    "seo-analyst",
    "storytelling-content-writing",
    "cloud-devops",
    "automation-testing",
    "mobile-app-development",
    "hr-finance",
    "tally",
    "business-analyst",
    "python-for-kids",
    "fullstack-internship",
]

def clean_text(text):
    return re.sub(r'\s+', ' ', text).strip()

def parse_course_full(slug):
    fpath = f"content/raw_pages/courses__{slug}.html"
    if not os.path.exists(fpath):
        return None

    with open(fpath, "r", encoding="utf-8") as f:
        html = f.read()
    soup = BeautifulSoup(html, "html.parser")

    # Title
    title = ""
    h1 = soup.find("h1")
    if h1:
        title = clean_text(h1.get_text())

    # Meta
    meta_desc = ""
    m = soup.find("meta", attrs={"name": "description"})
    if m:
        meta_desc = m.get("content", "")

    # Main hero description
    hero_desc = ""
    if h1:
        parent = h1.parent
        p = parent.find_next("p")
        if p:
            hero_desc = clean_text(p.get_text())

    # Details card
    details = {
        "duration": "6 Months",
        "level": "Beginner to Advanced",
        "lessons": "48 Lessons",
        "mode": "Offline / Online",
    }
    for card in soup.find_all("div", class_=lambda c: c and ("Course Details" in c or "p-6" in c or "p-4" in c)):
        for item in card.find_all("div"):
            t = item.get_text()
            if "Duration" in t and ":" in t:
                details["duration"] = clean_text(t.split(":")[-1])
            elif "Level" in t and ":" in t:
                details["level"] = clean_text(t.split(":")[-1])
            elif "Lessons" in t and ":" in t:
                details["lessons"] = clean_text(t.split(":")[-1])
            elif "Mode" in t and ":" in t:
                details["mode"] = clean_text(t.split(":")[-1])

    # Overview paragraph
    overview = ""
    for sec in soup.find_all("section"):
        if "Program Overview" in sec.get_text() or "ProgramOverview" in sec.get_text():
            for p in sec.find_all("p"):
                txt = clean_text(p.get_text())
                if len(txt) > 40:
                    overview = txt
                    break
            break

    # Why Learn cards
    why_learn = []
    for sec in soup.find_all("section"):
        if "Why Learn" in sec.get_text():
            for h in sec.find_all(["h4", "h3"]):
                htxt = clean_text(h.get_text())
                if "Why Learn" not in htxt and htxt != title:
                    p = h.find_next_sibling("p") or h.find_next("p")
                    ptxt = clean_text(p.get_text()) if p else ""
                    if htxt and ptxt and not any(w["title"] == htxt for w in why_learn):
                        why_learn.append({"title": htxt, "desc": ptxt})
            break

    # Curriculum modules
    curriculum = []
    for sec in soup.find_all("section"):
        if "Curriculum" in sec.get_text() or "Syllabus" in sec.get_text():
            # Modules are h3 or h4
            for mod_head in sec.find_all(["h3", "h4"]):
                mod_txt = clean_text(mod_head.get_text())
                if "Curriculum" in mod_txt or "Why" in mod_txt:
                    continue
                # Find container with spans
                parent_block = mod_head.find_parent("div")
                topics = []
                if parent_block:
                    container = parent_block.find_next_sibling("div") or parent_block
                    for sp in container.find_all(["span", "li", "p"]):
                        stxt = clean_text(sp.get_text())
                        if len(stxt) > 2 and stxt not in topics and not stxt.isdigit() and stxt != mod_txt:
                            topics.append(stxt)
                # Clean numbered prefix if any
                clean_mod = re.sub(r'^\d+\s*', '', mod_txt)
                if clean_mod and not any(c["module"] == clean_mod for c in curriculum):
                    curriculum.append({"module": clean_mod, "topics": topics[:8]})
            break

    # Why Choose Karka (6 reasons)
    why_choose = []
    for sec in soup.find_all("section"):
        if "Why Choose Karka" in sec.get_text():
            for h in sec.find_all(["h3", "h4"]):
                htxt = clean_text(h.get_text())
                if "Why Choose" in htxt or htxt == title:
                    continue
                p = h.find_next_sibling("p") or h.find_next("p")
                ptxt = clean_text(p.get_text()) if p else ""
                if htxt and ptxt and not any(w["title"] == htxt for w in why_choose):
                    why_choose.append({"title": htxt, "desc": ptxt})
            break

    # FAQs
    faqs = []
    for sec in soup.find_all("section"):
        if "FAQs" in sec.get_text() or "Frequently Asked" in sec.get_text():
            for btn in sec.find_all(["button", "summary", "h3", "h4", "div"]):
                qtxt = clean_text(btn.get_text())
                if "?" in qtxt and len(qtxt) < 140:
                    ans = btn.find_next_sibling("div") or btn.find_next("p")
                    atxt = clean_text(ans.get_text()) if ans else ""
                    if qtxt and atxt and atxt != qtxt and not any(f["q"] == qtxt for f in faqs):
                        faqs.append({"q": qtxt, "a": atxt})
            break

    # Instructor
    instructor = {
        "name": "Senior Industry Mentor",
        "role": "Staff Software Architect",
        "company": "Karka Tech Network",
        "exp": "8+ Years Experience"
    }
    for sec in soup.find_all("section"):
        if "Instructors" in sec.get_text() or "Instructor" in sec.get_text():
            for h in sec.find_all(["h3", "h4"]):
                itxt = clean_text(h.get_text())
                if itxt and "Instructors" not in itxt:
                    instructor["name"] = itxt
                    # find role / exp
                    p = h.find_next("p")
                    if p:
                        instructor["role"] = clean_text(p.get_text())
                    break
            break

    return {
        "slug": slug,
        "title": title or slug.replace("-", " ").title(),
        "heroDesc": hero_desc,
        "metaDesc": meta_desc,
        "overview": overview or hero_desc,
        "details": details,
        "whyLearn": why_learn[:4],
        "curriculum": curriculum[:6],
        "whyChoose": why_choose[:6],
        "instructor": instructor,
        "faqs": faqs[:6],
    }

def main():
    results = {}
    for slug in course_slugs:
        c = parse_course_full(slug)
        if c:
            results[slug] = c
            print(f"Parsed {slug}: {len(c['curriculum'])} modules, {len(c['whyLearn'])} reasons, {len(c['faqs'])} FAQs")

    with open("content/all_courses_full.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    print("Successfully saved content/all_courses_full.json")

if __name__ == "__main__":
    main()
