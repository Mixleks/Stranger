// src/components/VideoPlayer.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Hls from 'hls.js';
import RetroButton from './RetroButton';
import './VideoPlayer.css';
import { saveProgress, loadProgress } from '../utils/progress';

type Source = { src: string; type?: string };
type Track = { src: string; label: string; srclang?: string; default?: boolean };

const fmt = (s: number) => {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
  return (h ? `${h}:` : '') + String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
};

const VideoPlayer: React.FC<{
  episodeId?: string;        // для прогресса
  title: string;
  poster?: string;
  sources: Source[];
  subtitles?: Track[];
  onNext?: () => void;
  nextLabel?: string;
}> = ({ episodeId, title, poster, sources, subtitles = [], onNext, nextLabel }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isReady, setReady] = useState(false);
  const [levels, setLevels] = useState<{ index: number; height?: number; bitrate?: number }[]>([]);
  const [currentLevel, setCurrentLevel] = useState<number | 'auto'>('auto');
  const [resumed, setResumed] = useState<number | null>(null);

  const key = useMemo(() => episodeId || sources.map(s => s.src).join('|'), [episodeId, sources]);

  // init
  useEffect(() => {
    const v = videoRef.current!;
    setReady(false);

    // cleanup old
    if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null; }

    const hlsSource = sources.find(s => s.type === 'application/x-mpegURL' || s.src.endsWith('.m3u8'));

    if (hlsSource && Hls.isSupported()) {
      const hls = new Hls({ lowLatencyMode: true, autoStartLoad: true });
      hlsRef.current = hls;
      hls.loadSource(hlsSource.src);
      hls.attachMedia(v);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setReady(true);
        setLevels(hls.levels.map((lv, idx) => ({ index: idx, height: lv.height, bitrate: lv.bitrate })));
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        setCurrentLevel(data.level === -1 ? 'auto' : data.level);
      });
    } else {
      // native playback (Safari HLS / MP4)
      setReady(true);
    }

    // resume
    const p = loadProgress(key);
    if (p?.t && p.t > 5) setResumed(p.t);

    const onTime = () => {
      saveProgress(key, v.currentTime, v.duration || undefined);
    };

    const onEnded = () => {
      saveProgress(key, 0, v.duration || undefined);
      if (onNext) onNext();
    };

    v.addEventListener('timeupdate', onTime);
    v.addEventListener('ended', onEnded);

    const onKey = (e: KeyboardEvent) => {
      if (!document.activeElement || (document.activeElement as HTMLElement).tagName === 'INPUT') return;
      if (e.code === 'Space') { e.preventDefault(); v.paused ? v.play() : v.pause(); }
      if (e.key === 'ArrowRight') v.currentTime += 5;
      if (e.key === 'ArrowLeft') v.currentTime -= 5;
      if (e.key.toLowerCase() === 'f') v.requestFullscreen();
      if (e.key.toLowerCase() === 'm') v.muted = !v.muted;
      if (e.key.toLowerCase() === 'p') { if (document.pictureInPictureElement) document.exitPictureInPicture(); else v.requestPictureInPicture?.(); }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('ended', onEnded);
      if (hlsRef.current) { hlsRef.current.destroy(); hlsRef.current = null; }
    };
  }, [key]);

  // seek to resume once metadata is loaded
  useEffect(() => {
    const v = videoRef.current!;
    const onMeta = () => {
      if (resumed && resumed < v.duration - 3) {
        v.currentTime = resumed;
      }
      setResumed(null);
    };
    v.addEventListener('loadedmetadata', onMeta);
    return () => v.removeEventListener('loadedmetadata', onMeta);
  }, [resumed]);

  const setLevel = (lvl: number | 'auto') => {
    const hls = hlsRef.current;
    if (!hls) return;
    if (lvl === 'auto') {
      hls.currentLevel = -1;
      setCurrentLevel('auto');
    } else {
      hls.currentLevel = lvl;
      setCurrentLevel(lvl);
    }
  };

  return (
    <div className="playerWrap">
      <div className="playerTop">
        <h3 className="playerTitle">{title}</h3>
        <div className="rightInfo">
          <span className="pill">{isReady ? 'READY' : 'LOADING'}</span>
        </div>
      </div>

      <video ref={videoRef} className="video" controls playsInline poster={poster}>
        {sources.map((s, i) => <source key={i} src={s.src} type={s.type} />)}
        {subtitles.map((t, i) => <track key={i} src={t.src} kind="subtitles" label={t.label} srcLang={t.srclang} default={t.default} />)}
      </video>

      <div className="controlsRow">
        <RetroButton onClick={() => videoRef.current?.requestFullscreen()}>Fullscreen (F)</RetroButton>
        <RetroButton onClick={() => { const v = videoRef.current!; v.playbackRate = v.playbackRate === 1 ? 1.25 : 1; }}>
          Speed {videoRef.current?.playbackRate?.toFixed(2) || '1.00'}x
        </RetroButton>
        <RetroButton onClick={() => { const v = videoRef.current!; v.muted = !v.muted; }}>
          {videoRef.current?.muted ? 'Unmute (M)' : 'Mute (M)'}
        </RetroButton>
        {'requestPictureInPicture' in HTMLVideoElement.prototype && (
          <RetroButton onClick={() => {
            const v = videoRef.current!;
            if (document.pictureInPictureElement) document.exitPictureInPicture();
            else v.requestPictureInPicture?.();
          }}>PiP (P)</RetroButton>
        )}

        {/* Quality selector (HLS) */}
        {levels.length > 0 && (
          <div className="quality">
            <span>Quality:</span>
            <button className={currentLevel === 'auto' ? 'q on' : 'q'} onClick={() => setLevel('auto')}>Auto</button>
            {levels.map(l => (
              <button key={l.index}
                className={currentLevel === l.index ? 'q on' : 'q'}
                onClick={() => setLevel(l.index)}>
                {l.height ? `${l.height}p` : l.index}
              </button>
            ))}
          </div>
        )}

        {onNext && <RetroButton onClick={onNext}>Next ▶ {nextLabel ? `(${nextLabel})` : ''}</RetroButton>}
      </div>
    </div>
  );
};

export default VideoPlayer;
