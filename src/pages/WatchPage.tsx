import { useParams, useNavigate, Link } from "react-router-dom";
import { seasons } from "../data/seasons";

export default function WatchPage() {
  const { seasonId, episodeId } = useParams();
  const nav = useNavigate();

  const season = seasons.find(s => String(s.id) === String(seasonId));
  const episode = season?.episodes.find(e => e.id === episodeId);

  if (!season || !episode) {
    return <div style={{color:"#fff", padding:20}}>Эпизод не найден</div>;
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px" }}>
      <button onClick={()=>nav(-1)} className="btn-back">← Назад</button>

      <h2 className="watch-title">{season.title} — {episode.title}</h2>

      <div className="player-wrap">
        <video
          controls
          preload="none"              // экономим трафик — загружается только при клике play
          poster={episode.thumbnail || season.poster}
          width="100%"
          style={{ borderRadius: 12, outline: "none" }}
        >
          {/* можно добавить несколько источников для совместимости */}
          {episode.src ? <source src={episode.src} type="video/mp4" /> : null}
          Ваш браузер не поддерживает видео-тег.
        </video>
      </div>

      {episode.description && (
        <p className="watch-desc">{episode.description}</p>
      )}

      {/* навигация по другим сериям этого сезона (минимально, без предзагрузок) */}
      <div className="watch-episodes-mini">
        {season.episodes.map((e, i) => (
          <Link
            key={e.id}
            to={`/watch/${season.id}/${e.id}`}
            className={`mini-ep ${e.id === episode.id ? "active": ""}`}
            title={e.title}
          >
            <span>{i+1}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
