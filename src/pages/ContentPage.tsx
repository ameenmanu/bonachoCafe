import { Link } from "react-router"

type ContentPageProps = {
  eyebrow: string
  title: string
  intro: string
  items: string[][]
  actionLabel?: string
  actionHref?: string
}

export function ContentPage({
  eyebrow,
  title,
  intro,
  items,
  actionLabel,
  actionHref,
}: ContentPageProps) {
  return (
    <section className="content-page">
      <div className="content-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="content-intro">{intro}</p>
        {actionLabel && actionHref && (
          <a
            className="page-action"
            href={actionHref}
            target="_blank"
            rel="noreferrer"
          >
            {actionLabel}
          </a>
        )}
      </div>
      <div className="content-list">
        {items.map(([titleText, description], index) => (
          <article key={titleText}>
            <span>0{index + 1}</span>
            <div>
              <h2>{titleText}</h2>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="content-footer">
        <p>Something good is always cooking.</p>
        <Link to="/">Back to the experience</Link>
      </div>
    </section>
  )
}
