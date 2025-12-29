import fs from 'fs';
import path from 'path';

function parseMDYToUTCDate(mdy) {
  // articles.json stores dates as "MM/DD/YYYY"
  const [mmRaw, ddRaw, yyyyRaw] = String(mdy).split('/');
  const mm = Number(mmRaw);
  const dd = Number(ddRaw);
  const yyyy = Number(yyyyRaw);
  if (!mm || !dd || !yyyy) return null;
  return new Date(Date.UTC(yyyy, mm - 1, dd));
}

function formatArticleDate(mdy) {
  const d = parseMDYToUTCDate(mdy);
  if (!d) return mdy;
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(d);
}

function formatArticleDateTimeAttr(mdy) {
  const d = parseMDYToUTCDate(mdy);
  if (!d) return undefined;
  // YYYY-MM-DD for <time dateTime="...">
  return d.toISOString().slice(0, 10);
}

function parseMonthYearToUTCDate(monthYear) {
  // ai-tidbits-bestof.json stores dates like "March 2025"
  const raw = String(monthYear ?? '').trim();
  const m = raw.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!m) return null;

  const monthName = m[1].toLowerCase();
  const year = Number(m[2]);
  if (!year) return null;

  const months = {
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
  };

  const monthIndex = months[monthName];
  if (monthIndex == null) return null;

  return new Date(Date.UTC(year, monthIndex, 1));
}

function formatTidbitDate(monthYear) {
  const d = parseMonthYearToUTCDate(monthYear);
  if (!d) return monthYear;
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(d);
}

function formatTidbitDateTimeAttr(monthYear) {
  const d = parseMonthYearToUTCDate(monthYear);
  if (!d) return undefined;
  // YYYY-MM for <time dateTime="..."> (month string)
  return d.toISOString().slice(0, 7);
}

async function getData() {
  const articlesPath = path.join(process.cwd(), 'public/assets/data/articles.json');
  const tidbitsPath = path.join(process.cwd(), 'public/assets/data/ai-tidbits-bestof.json');
  
  const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
  const tidbits = JSON.parse(fs.readFileSync(tidbitsPath, 'utf8'));

  // Sort newest -> oldest by publish date (articles.json is "MM/DD/YYYY")
  articles.sort((a, b) => {
    const da = parseMDYToUTCDate(a?.date)?.getTime();
    const db = parseMDYToUTCDate(b?.date)?.getTime();
    if (da == null && db == null) return 0;
    if (da == null) return 1;
    if (db == null) return -1;
    return db - da;
  });

  // Sort newest -> oldest by publish date (ai-tidbits-bestof.json is "Month YYYY")
  tidbits.sort((a, b) => {
    const da = parseMonthYearToUTCDate(a?.date)?.getTime();
    const db = parseMonthYearToUTCDate(b?.date)?.getTime();
    if (da == null && db == null) return 0;
    if (da == null) return 1;
    if (db == null) return -1;
    return db - da;
  });
  
  return { articles, tidbits };
}

export const metadata = {
  title: 'Writing - Sahar Mor',
  description: 'Articles and AI Tidbits posts by Sahar Mor on AI, technology, and entrepreneurship.',
};

export default async function Writing() {
  const { articles, tidbits } = await getData();

  return (
    <>
      <section className="hero">
        <h1>Writing</h1>
        <p>Articles and thoughts on AI, technology, and entrepreneurship.</p>
      </section>

      <section id="ai-tidbits">
        <h2>AI Tidbits Selected Posts</h2>
        <ul className="list" id="tidbits-list">
          {tidbits.map((post, index) => (
            <li key={index} className="list-item">
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                <div className="tidbit-meta">
                  <span className="series-label">{post.series}</span>
                  <span className="tidbit-meta-sep" aria-hidden="true">·</span>
                  <time className="tidbit-date" dateTime={formatTidbitDateTimeAttr(post.date)}>
                    {formatTidbitDate(post.date)}
                  </time>
                </div>
                <span className="list-item-title">{post.title}</span>
                <span className="list-item-description">{post.subtitle}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="articles">
        <h2>Articles</h2>
        <ul className="list" id="articles-list">
          {articles.map((article, index) => (
            <li key={index} className="list-item">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <span className="list-item-title">{article.title}</span>
                <time
                  className="list-item-meta"
                  dateTime={formatArticleDateTimeAttr(article.date)}
                >
                  {formatArticleDate(article.date)}
                </time>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

