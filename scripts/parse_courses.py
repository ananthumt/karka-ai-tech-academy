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

def parse_course(slug):
    fpath = f"content/raw_pages/courses__{slug}.html"
    if not os.path.exists(fpath):
        print(f"Missing {fpath}")
        return None
        
    with open(fpath, "r", encoding="utf-8") as f:
        html = f.read()
    soup = BeautifulSoup(html, "html.parser")

    title = ""
    h1 = soup.find("h1")
    if h1:
        title = h1.get_text(strip=True)

    desc = ""
    # Usually a paragraph right after H1 or in hero
    for p in soup.find_all("p"):
        ptxt = p.get_text(strip=True)
        if len(ptxt) > 50 and not ptxt.startswith("Join the AI") and not ptxt.startswith("Empowering the next"):
            desc = ptxt
            break

    # Meta
    meta_desc = ""
    m = soup.find("meta", attrs={"name": "description"})
    if m:
        meta_desc = m.get("content", "")

    # Stats / details
    details = {}
    for div in soup.find_all(["div", "li", "span"]):
        txt = div.get_text(strip=True)
        if "Duration" in txt and ":" in txt:
            details["duration"] = txt.split(":")[-1].strip()
        elif "Level" in txt and ":" in txt:
            details["level"] = txt.split(":")[-1].strip()
        elif "Lessons" in txt and ":" in txt:
            details["lessons"] = txt.split(":")[-1].strip()
        elif "Mode" in txt and ":" in txt:
            details["mode"] = txt.split(":")[-1].strip()

    # Why Learn items
    why_learn = []
    # Find section with "Why Learn"
    for sec in soup.find_all("section"):
        if "Why Learn" in sec.get_text():
            for h in sec.find_all(["h3", "h4"]):
                htxt = h.get_text(strip=True)
                p = h.find_next_sibling("p") or h.find_next("p")
                ptxt = p.get_text(strip=True) if p else ""
                if htxt and ptxt and htxt != title:
                    why_learn.append({"title": htxt, "desc": ptxt})
            break

    # Curriculum modules
    curriculum = []
    for sec in soup.find_all("section"):
        if "Curriculum" in sec.get_text() or "Syllabus" in sec.get_text():
            for h in sec.find_all(["h3", "h4"]):
                htxt = h.get_text(strip=True)
                # find topics list
                parent = h.parent
                topics = [li.get_text(strip=True) for li in parent.find_all("li")]
                if not topics:
                    # check next ul
                    ul = h.find_next("ul")
                    if ul:
                        topics = [li.get_text(strip=True) for li in ul.find_all("li")]
                curriculum.append({"module": htxt, "topics": topics})
            break

    # Why Choose Karka (6 reasons)
    why_choose = []
    for sec in soup.find_all("section"):
        if "Why Choose Karka" in sec.get_text():
            for h in sec.find_all(["h3", "h4"]):
                htxt = h.get_text(strip=True)
                p = h.find_next_sibling("p") or h.find_next("p")
                ptxt = p.get_text(strip=True) if p else ""
                if htxt and ptxt:
                    why_choose.append({"title": htxt, "desc": ptxt})
            break

    # FAQs
    faqs = []
    for sec in soup.find_all("section"):
        if "Frequently Asked Questions" in sec.get_text() or "FAQ" in sec.get_text():
            for btn in sec.find_all(["button", "summary", "h3", "h4"]):
                qtxt = btn.get_text(strip=True)
                if "?" in qtxt and len(qtxt) < 150:
                    ans = btn.find_next("p") or btn.find_next_sibling("p") or btn.find_next("div")
                    atxt = ans.get_text(strip=True) if ans else ""
                    if qtxt and atxt and atxt != qtxt:
                        faqs.append({"q": qtxt, "a": atxt})
            break

    return {
        "slug": slug,
        "title": title,
        "desc": desc,
        "metaDesc": meta_desc,
        "details": details,
        "whyLearn": why_learn,
        "curriculum": curriculum,
        "whyChoose": why_choose,
        "faqs": faqs,
    }

def main():
    all_courses = {}
    for slug in course_slugs:
        c = parse_course(slug)
        if c:
            all_courses[slug] = c
            print(f"Parsed {slug}: {c['title']} ({len(c['whyLearn'])} why, {len(c['curriculum'])} modules, {len(c['faqs'])} faqs)")

    with open("content/parsed_courses.json", "w", encoding="utf-8") as f:
        json.dump(all_courses, f, indent=2, ensure_ascii=False)
    print("Done! Saved to content/parsed_courses.json")

if __name__ == "__main__":
    main()
