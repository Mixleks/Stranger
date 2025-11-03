// src/pages/Watch.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from '@components/VideoPlayer';
import catalog from '@data/catalog';

 const Watch: React.FC = () => {
  const nav = useNavigate();
  const { seasonSlug, episodeSlug } = useParams();

  const [seasonIndex, setSeasonIndex] = useState(0);
  const [episodeIndex, setEpisodeIndex] = useState(0);

  // sync from URL
  useEffect(() => {
    if (seasonSlug && episodeSlug) {
      const si = catalog.seasons.findIndex(s => s.slug === seasonSlug);
      if (si >= 0) {
        const ei = catalog.seasons[si].episodes.findIndex(e => e.slug === episodeSlug);
        if (ei >= 0) {
          setSeasonIndex(si);
          setEpisodeIndex(ei);
          return;
        }
      }
    }
  }, [seasonSlug, episodeSlug]);

  // sync to URL when user clicks в боковом меню
  useEffect(() => {
    const s = catalog.seasons[seasonIndex];
    const e = s.episodes[episodeIndex];
    if (!seasonSlug || !episodeSlug || seasonSlug !== s.slug || episodeSlug !== e.slug) {
      nav(`/watch/${s.slug}/${e.slug}`, { replace: true });
    }
  }, [seasonIndex, episodeIndex]);

  const s = catalog.seasons[seasonIndex];
  const e = s.episodes[episodeIndex];

  const next = s.episodes[episodeIndex + 1];

  const current = useMemo(() => e, [seasonIndex, episodeIndex]);

  return (
    <section>
      <h2>Watch</h2>
      <div style={{display:'grid', gridTemplateColumns:'280px 1fr', gap:16}}>
        <aside style={{borderRight:'1px solid rgba(255,0,0,0.3)', paddingRight:12}}>
          {catalog.seasons.map((ss, si)=>(
            <details key={ss.id} open={si===seasonIndex} style={{marginBottom:12}}>
              <summary style={{cursor:'pointer', color: si===seasonIndex ? '#fff' : '#f88'}}
                onClick={()=>{ setSeasonIndex(si); setEpisodeIndex(0); }}>
                Season {ss.number} — {ss.title}
              </summary>
              <ul style={{listStyle:'none', paddingLeft:8}}>
                {ss.episodes.map((ee, ei)=>(
                  <li key={ee.id} style={{margin:'6px 0'}}>
                    <button
                      onClick={()=>{ setSeasonIndex(si); setEpisodeIndex(ei); }}
                      style={{width:'100%', textAlign:'left', background:'transparent', border:'1px solid rgba(255,0,0,0.3)', padding:'6px 8px', color: (si===seasonIndex && ei===episodeIndex)? '#fff' : '#faa', cursor:'pointer'}}>
                      {ee.number}. {ee.title}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </aside>

        <div>
          <VideoPlayer
            episodeId={current.id}
            title={current.title}
            poster={current.poster}
            sources={current.sources}
            subtitles={current.subtitles}
            nextLabel={next?.title}
            onNext={()=>{
              if (next) {
                setEpisodeIndex(episodeIndex+1);
              } else {
                // перейти к первой серии следующего сезона, если есть
                const ns = catalog.seasons[seasonIndex+1];
                if (ns) { setSeasonIndex(seasonIndex+1); setEpisodeIndex(0); }
              }
            }}
          />
          <p style={{opacity:.8, marginTop:8}}>
            S{s.number}E{e.number} — {current.title}
            {current.durationSec ? ` • ${Math.round(current.durationSec/60)} мин` : ''}
          </p>
          {current.description && <p style={{opacity:.8, marginTop:4}}>{current.description}</p>}
          <p style={{marginTop:12}}><Link to="/">← На главную</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Watch;
