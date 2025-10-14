# scrape_news.py
import feedparser
import json
from datetime import datetime
from pathlib import Path

# GoogleニュースRSS（サカナクションで検索）
RSS_URL = "https://news.google.com/rss/search?q=サカナクション&hl=ja&gl=JP&ceid=JP:ja"

def fetch_news(url, limit=20):
    feed = feedparser.parse(url)
    articles = []
    for entry in feed.entries[:limit]:
        # published がない場合のためのフォールバック
        published = getattr(entry, "published", "")
        source = ""
        if hasattr(entry, "source"):
            source = getattr(entry.source, "title", "")
        articles.append({
            "title": entry.title,
            "link": entry.link,
            "published": published,
            "source": source
        })
    return articles

def save_json(data, path="data/news.json"):
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    with p.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    articles = fetch_news(RSS_URL, limit=20)
    payload = {
        "updated": datetime.utcnow().isoformat() + "Z",
        "count": len(articles),
        "articles": articles
    }
    save_json(payload)
    print(f"Saved {len(articles)} articles to data/news.json")
