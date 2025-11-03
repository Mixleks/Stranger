import { Link } from "react-router-dom";
import { seasons } from "../data/seasons";

export default function SeasonGrid() {
  return (
    <section className="seasons">
      {seasons.map((s) => (
        <Link
          key={s.id}
          to={`/season/${s.id}`}
          className="season-card"
          aria-label={s.title}
        >
          <img
            src={s.poster}
            alt={s.title}
            loading="lazy"
            decoding="async"
            className="season-img"
            onError={(e)=>{ (e.target as HTMLImageElement).style.opacity="0.2"; }}
          />
          <div className="season-title">{s.title}</div>
        </Link>
      ))}
    </section>
  );
}
