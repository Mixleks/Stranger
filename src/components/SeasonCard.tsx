import { useState } from "react";
import type { Season } from "../data/seasons";

type Props = { season: Season };

export default function SeasonCard({ season }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`season-card ${open ? "open" : ""}`}>
      <button className="season-cover" onClick={() => setOpen((v) => !v)}>
        <div className="season-bg" style={{ backgroundImage: `url(${season.poster})` }} />
        <div className="season-overlay" />
        <div className="season-title">{season.title}</div>
      </button>

      {open && (
        <div className="episodes">
          {season.episodes.map((ep, i) => (
            <button
              className="episode-row"
              key={ep.id}
              onClick={() => console.log("play/open:", ep)}
              title="Открыть серию"
            >
              <span className="ep-index">{i + 1}</span>
              <span className="ep-title">{ep.title}</span>
              {ep.duration && <span className="ep-duration">{ep.duration}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
