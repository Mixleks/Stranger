import { Link, useParams, useNavigate } from "react-router-dom";
import { seasons } from "../data/seasons";

export default function SeasonPage() {
  const { seasonId } = useParams();
  const nav = useNavigate();
  const season = seasons.find(s => String(s.id) === String(seasonId));

  if (!season) {
    return <div style={{color:"#fff", padding:20}}>Сезон не найден</div>;
  }

  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: "20px" }}>
      <button onClick={()=>nav(-1)} className="btn-back">← Назад</button>

      <header className="season-header">
        <img
          src={season.poster}
          alt={season.title}
          loading="lazy"
          decoding="async"
          className="season-hero"
        />
        <h2 className="season-heading">{season.title}</h2>
      </header>

      <ul className="episode-list">
        {season.episodes.map((ep, idx) => (
          <li key={ep.id} className="episode-row">
            <img
              src={ep.thumbnail || season.poster}
              alt={ep.title}
              className="episode-thumb"
              loading="lazy"
              decoding="async"
            />
            <div className="episode-meta">
              <div className="episode-title">
                <span className="ep-index">{idx + 1}</span> {ep.title}
                {ep.duration && <span className="ep-duration"> · {ep.duration}</span>}
              </div>
              {ep.description && <p className="ep-desc">{ep.description}</p>}
              <Link className="btn-watch" to={`/watch/${season.id}/${ep.id}`}>
                ▶ Смотреть
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
