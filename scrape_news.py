# scrape_news.py
import feedparser
import json
from datetime import datetime

# GoogleニュースRSS（サカナクションで検索）
url = "https://news.google.com/rss/search?q=サカナクション&hl=ja&gl=JP&ceid=JP:ja"

feed = feedparser.parse(url)
articles = []

for entry in feed.entries[:10]:  # 最新10件
    articles.append({
        "title": entry.title,
        "link": entry.link,
        "published": entry.published,
        "source": entry.source.title if "source" in entry else "",
    })

# 保存（data/news.json）
with open("data/news.json", "w", encoding="utf-8") as f:
    json.dump({
        "updated": datetime.now().isoformat(),
        "articles": articles
    }, f, ensure_ascii=False, indent=2)

print(f"{len(articles)}件のニュースを保存しました！")
