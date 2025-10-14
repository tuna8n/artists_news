// next-app/app/page.tsx
import fs from "fs";
import path from "path";

type Article = {
  title: string;
  link: string;
  published: string;
  source?: string;
};

export default function HomePage() {
  // ルートから見た data/news.json のパス
  const filePath = path.join(process.cwd(), "../data/news.json");

  let data = { updated: "", articles: [] as Article[] };
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    data = JSON.parse(raw);
  } catch (e) {
    console.warn("news.json が見つかりません。まずは scrape_news.py をローカルで実行して生成してください。");
  }

  const articles: Article[] = data.articles || [];

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">📰 サカナクション 最新ニュース</h1>

      <ul className="space-y-3">
        {articles.length === 0 && (
          <li className="p-4 bg-white rounded-lg shadow">まだ記事がありません。</li>
        )}
        {articles.map((a, i) => (
          <li key={i} className="p-4 bg-white rounded-2xl shadow hover:shadow-md transition">
            <a href={a.link} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline">
              {a.title}
            </a>
            <div className="text-sm text-gray-500 mt-1">
              {a.source && <span>{a.source} ・ </span>}
              {a.published ? new Date(a.published).toLocaleString("ja-JP") : ""}
            </div>
          </li>
        ))}
      </ul>

      <footer className="text-center text-gray-400 text-sm mt-8">
        更新日時: {data.updated ? new Date(data.updated).toLocaleString("ja-JP") : "—"}
      </footer>
    </main>
  );
}
