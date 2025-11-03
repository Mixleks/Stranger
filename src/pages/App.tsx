import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Watch from "./Watch";
import NoiseOverlay from "../components/NoiseOverlay";
import CRTScan from "../components/CRTScan";
import UpsideFog from "../components/UpsideFog";
import UpsideParticles from "../components/UpsideParticles";
import TextGlitch from "../components/TextGlitch";
import { Suspense, lazy } from "react";
const HomePage = lazy(() => import("./Home")); // уже есть
const SeasonPage = lazy(() => import("./SeasonPage")); // создаём
const WatchPage = lazy(() => import("./WatchPage"));

export default function App() {
  return (
    <>
      <UpsideParticles></UpsideParticles>
      <UpsideFog></UpsideFog>
      <nav style={{ padding: 20 }}>
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#c80101ff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M22 20v-7.826a4 4 0 0 0-1.253-2.908l-7.373-6.968a2 2 0 0 0-2.748 0L3.253 9.266A4 4 0 0 0 2 12.174V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2"
            />
          </svg>
        </Link>
      </nav>

      <Suspense
        fallback={
          <div style={{ color: "#fff", textAlign: "center" }}>Loading…</div>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/seasons" element={<HomePage />} />{" "}
          {/* сетка сезонов на главной */}
          <Route path="/season/:seasonId" element={<SeasonPage />} />
          <Route path="/watch/:seasonId/:episodeId" element={<WatchPage />} />
          <Route
            path="*"
            element={<div style={{ color: "#fff" }}>Not found</div>}
          />
        </Routes>
      </Suspense>
    </>
  );
}
