/**
 * Unified article row component used for both AI Tidbits and Articles sections.
 * Displays: Title (left) + Date (right), with optional subtitle below.
 */
export default function ArticleRow({ title, subtitle, date, dateTime, url }) {
  return (
    <li className="article-row">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <div className="article-row__header">
          <span className="article-row__title">{title}</span>
          <time className="article-row__date" dateTime={dateTime}>
            {date}
          </time>
        </div>
        {subtitle ? (
          <span className="article-row__subtitle">{subtitle}</span>
        ) : null}
      </a>
    </li>
  );
}

