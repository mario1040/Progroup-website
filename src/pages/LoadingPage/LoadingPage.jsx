import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useProgress } from "@react-three/drei";
import { motion, useMotionValue, useTransform } from "framer-motion";
import "./LoadingPage.scss";
import { useExperienceStore } from "../../stores/experienceStore";
import {
  BACK_RUN_COUNTERTOP_EDGES,
  BACK_RUN_COUNTERTOP_FACES,
  BACK_RUN_EDGES,
  BACK_RUN_FACES,
  BACK_RUN_SEAMS,
  BACK_RUN_TOEKICK,
  BACKSPLASH_HATCH,
  COUNTERTOP_EDGES,
  COUNTERTOP_FACES,
  DIM_LINE_1_TICKS,
  DIM_LINE_2,
  DIM_LINE_2_TICKS,
  FAUCET_PATH,
  FRIDGE_EDGES,
  FRIDGE_FACES,
  FRIDGE_HANDLE,
  FRIDGE_SEAMS,
  ISO_FLOOR_GRID,
  ISLAND_DRAWER_LINE,
  ISLAND_EDGES,
  ISLAND_FACES,
  ISLAND_SEAMS,
  PENDANTS,
  RANGE_BURNERS,
  RANGE_HOOD_EDGES,
  RANGE_HOOD_FACES,
  RANGE_OUTLINE,
  SINK_INNER_OUTLINE,
  SINK_OUTLINE,
  VIEWBOX,
  WALL_CABINET_EDGES,
  WALL_CABINET_FACES,
  UNDERCAB_LIGHT_STRIP,
} from "./kitchenGeometry";

const MATERIALS = ["OAK", "WALNUT", "BRASS", "QUARTZ"];

/**
 * Slow cinematic timing
 */
const TIMING = {
  curtain: 1.95,
  curtainDelay: 0.7,
  stageFade: 1.25,
  stageScale: 1.15,
  fill: 1.15,
  line: 1.8,
  detail: 1.55,
  titleReveal: 2.6,
  loadToSolidify: 1600,
  solidifyToReveal: 2800,
  revealToWelcome: 3400,
  welcomeHold: 2600,
};

const clamp01 = (v) => Math.min(Math.max(v, 0), 1);
const windowProgress = (value, start, end) => (value - start) / (end - start);
const drawOffset = (progress, start, end) =>
  1 - clamp01(windowProgress(progress, start, end));
const fadeIn = (progress, start, end) => clamp01(windowProgress(progress, start, end));

const cascadeOffset = (progress, index, count, start, end) => {
  const span = end - start;
  const edgeStart = start + (index / (count + 1)) * span;
  return drawOffset(progress, edgeStart, end);
};

const CuboidWireframe = ({ edges, start, end, progress }) => {
  let solidIndex = 0;
  const solidCount = edges.filter((e) => !e.hidden).length;

  return (
    <>
      {edges.map((edge, i) => {
        if (edge.hidden) {
          return (
            <path
              key={i}
              d={edge.d}
              className="kp-line kp-line--hidden"
              style={{
                opacity: fadeIn(progress, start, start + (end - start) * 0.34),
              }}
            />
          );
        }

        const offset = cascadeOffset(progress, solidIndex, solidCount, start, end);
        solidIndex += 1;

        return (
          <path
            key={i}
            d={edge.d}
            pathLength={1}
            className="kp-line"
            style={{ strokeDasharray: 1, strokeDashoffset: offset }}
          />
        );
      })}
    </>
  );
};

CuboidWireframe.propTypes = {
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      d: PropTypes.string.isRequired,
      hidden: PropTypes.bool,
    })
  ).isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
};

const LineReveal = ({
  d,
  start,
  end,
  progress,
  className = "kp-line kp-line--seam",
}) => (
  <path
    d={d}
    pathLength={1}
    className={className}
    style={{ strokeDasharray: 1, strokeDashoffset: drawOffset(progress, start, end) }}
  />
);

LineReveal.propTypes = {
  d: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  className: PropTypes.string,
};

const PATH_WINDOWS = {
  dim1: [4, 18],
  dim2: [10, 24],
  floor: [0, 22],
  island: [16, 48],
  islandDetails: [34, 54],
  backRun: [30, 56],
  backRunDetails: [44, 70],
  countertop: [40, 64],
  wall: [54, 82],
  fridge: [66, 92],
  fridgeDetails: [78, 98],
  pendant0: [74, 88],
  pendant1: [80, 92],
  pendant2: [86, 96],
  pendant3: [90, 100],
  hood: [58, 78],
  backsplash: [50, 74],
  range: [56, 70],
  sink: [54, 68],
};

const PENDANT_WINDOWS = [
  [74, 88],
  [80, 92],
  [86, 96],
  [90, 100],
];

const LoadingPage = () => {
  const { progress } = useProgress();
  const { setIsExperienceReady } = useExperienceStore();

  const [phase, setPhase] = useState("loading"); // loading | solidify | reveal | done
  const [showWelcome, setShowWelcome] = useState(false);

  const clamped = Math.min(progress, 100);

  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  ).current;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const farX = useTransform(mx, (v) => v * 10);
  const farY = useTransform(my, (v) => v * 10);
  const nearX = useTransform(mx, (v) => v * 22);
  const nearY = useTransform(my, (v) => v * 22);

  const handlePointerMove = useCallback(
    (e) => {
      if (reducedMotion) return;
      const { innerWidth, innerHeight } = window;
      mx.set(e.clientX / innerWidth - 0.5);
      my.set(e.clientY / innerHeight - 0.5);
    },
    [mx, my, reducedMotion]
  );

  useEffect(() => {
    if (clamped >= 100 && phase === "loading") {
      setIsExperienceReady();
      const t = setTimeout(
        () => setPhase("solidify"),
        reducedMotion ? 240 : TIMING.loadToSolidify
      );
      return () => clearTimeout(t);
    }
  }, [clamped, phase, setIsExperienceReady, reducedMotion]);

  useEffect(() => {
    if (phase === "solidify") {
      const t = setTimeout(
        () => setPhase("reveal"),
        reducedMotion ? 320 : TIMING.solidifyToReveal
      );
      return () => clearTimeout(t);
    }
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (phase === "reveal" && !showWelcome) {
      const t = setTimeout(
        () => setShowWelcome(true),
        reducedMotion ? 320 : TIMING.revealToWelcome
      );
      return () => clearTimeout(t);
    }
  }, [phase, showWelcome, reducedMotion]);

  useEffect(() => {
    if (!showWelcome) return;

    const t = setTimeout(
      () => setPhase("done"),
      reducedMotion ? 700 : TIMING.welcomeHold
    );

    return () => clearTimeout(t);
  }, [showWelcome, reducedMotion]);

  const revision = String(Math.min(6, Math.floor(clamped / 17) + 1)).padStart(2, "0");
  const material = MATERIALS[Math.min(MATERIALS.length - 1, Math.floor(clamped / 25))];

  const isSolidifying = phase === "solidify" || phase === "reveal" || phase === "done";
  const isRevealing = phase === "reveal" || phase === "done";

  const gridLines = useMemo(() => ISO_FLOOR_GRID, []);

  if (phase === "done") return null;

  return (
    <div
      className="kp-root fixed inset-0 z-[100000] overflow-hidden select-none"
      onPointerMove={handlePointerMove}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2"
        style={{ backgroundColor: "var(--kp-bg)" }}
        animate={{ y: showWelcome ? "-100%" : isRevealing ? "-100%" : "0%" }}
        transition={{
          duration: reducedMotion ? 0.28 : TIMING.curtain,
          ease: [0.76, 0, 0.24, 1],
          delay: reducedMotion ? 0 : TIMING.curtainDelay,
        }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{ backgroundColor: "var(--kp-bg)" }}
        animate={{ y: showWelcome ? "100%" : isRevealing ? "100%" : "0%" }}
        transition={{
          duration: reducedMotion ? 0.28 : TIMING.curtain,
          ease: [0.76, 0, 0.24, 1],
          delay: reducedMotion ? 0 : TIMING.curtainDelay,
        }}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: showWelcome ? 0 : 1 }}
        transition={{
          duration: reducedMotion ? 0.2 : TIMING.stageFade,
          ease: "easeInOut",
        }}
      >
        <div className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 kp-hud text-[10px] md:text-xs tracking-widest uppercase text-[var(--kp-muted)]">
          <span className="kp-status-dot" />
          <span>Drafting kitchen geometry</span>
        </div>

        <motion.div
          className="relative w-[min(92vw,900px)] aspect-[860/560]"
          animate={{ scale: isSolidifying ? 1.05 : 1 }}
          transition={{
            duration: reducedMotion ? 0.2 : TIMING.stageScale,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <svg viewBox={VIEWBOX} className="w-full h-full overflow-visible">
            <defs>
              <marker
                id="kp-arrow"
                viewBox="0 0 10 10"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M0,0 L10,5 L0,10 Z" fill="var(--kp-line)" />
              </marker>
              <linearGradient id="kp-scan-gradient" x1="0" x2="1">
                <stop offset="0%" stopColor="var(--kp-copper)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--kp-copper)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--kp-copper)" stopOpacity="0" />
              </linearGradient>
            </defs>

            <motion.g style={{ x: farX, y: farY }}>
              {gridLines.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  className="kp-grid-line"
                  style={{
                    opacity: fadeIn(clamped, PATH_WINDOWS.floor[0], PATH_WINDOWS.floor[1]),
                  }}
                />
              ))}
            </motion.g>

            <motion.g
              style={{ x: nearX, y: nearY }}
              className={isSolidifying ? "is-solidifying" : undefined}
            >
              <g>
                <line
                  x1="46"
                  y1="37"
                  x2="790"
                  y2="37"
                  pathLength={1}
                  markerStart="url(#kp-arrow)"
                  markerEnd="url(#kp-arrow)"
                  className="kp-line"
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: drawOffset(
                      clamped,
                      PATH_WINDOWS.dim1[0],
                      PATH_WINDOWS.dim1[1]
                    ),
                  }}
                />
                {DIM_LINE_1_TICKS.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    className="kp-line kp-line--hidden"
                    style={{
                      opacity: fadeIn(clamped, PATH_WINDOWS.dim1[0], PATH_WINDOWS.dim1[1]),
                    }}
                  />
                ))}
              </g>

              <g>
                <LineReveal
                  d={DIM_LINE_2}
                  start={PATH_WINDOWS.dim2[0]}
                  end={PATH_WINDOWS.dim2[1]}
                  progress={clamped}
                />
                {DIM_LINE_2_TICKS.map((d, i) => (
                  <LineReveal
                    key={i}
                    d={d}
                    start={PATH_WINDOWS.dim2[0]}
                    end={PATH_WINDOWS.dim2[1]}
                    progress={clamped}
                    className="kp-line kp-line--hidden"
                  />
                ))}
              </g>

              <motion.polygon
                points={BACK_RUN_FACES.top}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.52 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.12,
                  ease: "easeOut",
                }}
              />
              <motion.polygon
                points={BACK_RUN_FACES.right}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.28 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.18,
                  ease: "easeOut",
                }}
              />
              <motion.polygon
                points={BACK_RUN_FACES.left}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.16 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.24,
                  ease: "easeOut",
                }}
              />
              <CuboidWireframe
                edges={BACK_RUN_EDGES}
                start={PATH_WINDOWS.backRun[0]}
                end={PATH_WINDOWS.backRun[1]}
                progress={clamped}
              />

              <motion.polygon
                points={BACK_RUN_COUNTERTOP_FACES.top}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.35 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.detail,
                  delay: 0.18,
                  ease: "easeOut",
                }}
              />
              <motion.polygon
                points={BACK_RUN_COUNTERTOP_FACES.right}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.18 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.detail,
                  delay: 0.24,
                  ease: "easeOut",
                }}
              />
              <motion.polygon
                points={BACK_RUN_COUNTERTOP_FACES.left}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.1 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.detail,
                  delay: 0.28,
                  ease: "easeOut",
                }}
              />
              <CuboidWireframe
                edges={BACK_RUN_COUNTERTOP_EDGES}
                start={PATH_WINDOWS.backRun[0] + 3}
                end={PATH_WINDOWS.backRun[1] + 3}
                progress={clamped}
              />

              <motion.polygon
                points={WALL_CABINET_FACES.top}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.5 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.26,
                  ease: "easeOut",
                }}
              />
              <motion.polygon
                points={WALL_CABINET_FACES.right}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.28 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.32,
                  ease: "easeOut",
                }}
              />
              <motion.polygon
                points={WALL_CABINET_FACES.left}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.16 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.38,
                  ease: "easeOut",
                }}
              />
              <CuboidWireframe
                edges={WALL_CABINET_EDGES}
                start={PATH_WINDOWS.wall[0]}
                end={PATH_WINDOWS.wall[1]}
                progress={clamped}
              />

              <motion.polygon
                points={FRIDGE_FACES.top}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.44 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.3,
                  ease: "easeOut",
                }}
              />
              <motion.polygon
                points={FRIDGE_FACES.right}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.24 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.36,
                  ease: "easeOut",
                }}
              />
              <motion.polygon
                points={FRIDGE_FACES.left}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.14 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.42,
                  ease: "easeOut",
                }}
              />
              <CuboidWireframe
                edges={FRIDGE_EDGES}
                start={PATH_WINDOWS.fridge[0]}
                end={PATH_WINDOWS.fridge[1]}
                progress={clamped}
              />

              <motion.polygon
                points={COUNTERTOP_FACES.top}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.58 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.34,
                  ease: "easeOut",
                }}
              />
              <motion.polygon
                points={COUNTERTOP_FACES.right}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.32 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.4,
                  ease: "easeOut",
                }}
              />
              <motion.polygon
                points={COUNTERTOP_FACES.left}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.16 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.46,
                  ease: "easeOut",
                }}
              />
              <CuboidWireframe
                edges={COUNTERTOP_EDGES}
                start={PATH_WINDOWS.countertop[0]}
                end={PATH_WINDOWS.countertop[1]}
                progress={clamped}
              />

              <motion.polygon
                points={ISLAND_FACES.top}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.62 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.42,
                  ease: "easeOut",
                }}
              />
              <motion.polygon
                points={ISLAND_FACES.right}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.34 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.48,
                  ease: "easeOut",
                }}
              />
              <motion.polygon
                points={ISLAND_FACES.left}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.18 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.54,
                  ease: "easeOut",
                }}
              />
              <CuboidWireframe
                edges={ISLAND_EDGES}
                start={PATH_WINDOWS.island[0]}
                end={PATH_WINDOWS.island[1]}
                progress={clamped}
              />

              {ISLAND_SEAMS.map((d, i) => (
                <LineReveal
                  key={i}
                  d={d}
                  start={PATH_WINDOWS.islandDetails[0]}
                  end={PATH_WINDOWS.islandDetails[1]}
                  progress={clamped}
                />
              ))}

              <LineReveal
                d={ISLAND_DRAWER_LINE}
                start={PATH_WINDOWS.islandDetails[0]}
                end={PATH_WINDOWS.islandDetails[1]}
                progress={clamped}
                className="kp-line kp-line--detail"
              />

              {BACK_RUN_SEAMS.map((d, i) => (
                <LineReveal
                  key={i}
                  d={d}
                  start={PATH_WINDOWS.backRunDetails[0]}
                  end={PATH_WINDOWS.backRunDetails[1]}
                  progress={clamped}
                />
              ))}
              <LineReveal
                d={BACK_RUN_TOEKICK}
                start={PATH_WINDOWS.backRunDetails[0]}
                end={PATH_WINDOWS.backRunDetails[1]}
                progress={clamped}
                className="kp-line kp-line--hidden"
              />
              <LineReveal
                d={UNDERCAB_LIGHT_STRIP}
                start={PATH_WINDOWS.backRunDetails[0] + 2}
                end={PATH_WINDOWS.backRunDetails[1]}
                progress={clamped}
                className="kp-line kp-line--detail"
              />

              {BACKSPLASH_HATCH.map((d, i) => (
                <LineReveal
                  key={i}
                  d={d}
                  start={PATH_WINDOWS.backsplash[0]}
                  end={PATH_WINDOWS.backsplash[1]}
                  progress={clamped}
                  className="kp-line kp-line--hidden"
                />
              ))}

              <LineReveal
                d={SINK_OUTLINE}
                start={PATH_WINDOWS.sink[0]}
                end={PATH_WINDOWS.sink[1]}
                progress={clamped}
                className="kp-line kp-line--seam"
              />
              <LineReveal
                d={SINK_INNER_OUTLINE}
                start={PATH_WINDOWS.sink[0] + 2}
                end={PATH_WINDOWS.sink[1]}
                progress={clamped}
                className="kp-line kp-line--hidden"
              />
              <path
                d={FAUCET_PATH}
                pathLength={1}
                className="kp-line kp-line--detail"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: drawOffset(
                    clamped,
                    PATH_WINDOWS.sink[0] + 4,
                    PATH_WINDOWS.sink[1]
                  ),
                }}
              />

              <LineReveal
                d={RANGE_OUTLINE}
                start={PATH_WINDOWS.range[0]}
                end={PATH_WINDOWS.range[1]}
                progress={clamped}
                className="kp-line kp-line--seam"
              />
              {RANGE_BURNERS.map((d, i) => (
                <LineReveal
                  key={i}
                  d={d}
                  start={PATH_WINDOWS.range[0] + 3}
                  end={PATH_WINDOWS.range[1]}
                  progress={clamped}
                  className="kp-line kp-line--detail"
                />
              ))}

              <motion.polygon
                points={RANGE_HOOD_FACES.top}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.44 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.58,
                  ease: "easeOut",
                }}
              />
              <motion.polygon
                points={RANGE_HOOD_FACES.right}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.24 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.64,
                  ease: "easeOut",
                }}
              />
              <motion.polygon
                points={RANGE_HOOD_FACES.left}
                fill="var(--kp-copper)"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSolidifying ? 0.14 : 0 }}
                transition={{
                  duration: reducedMotion ? 0.2 : TIMING.fill,
                  delay: 0.7,
                  ease: "easeOut",
                }}
              />
              <CuboidWireframe
                edges={RANGE_HOOD_EDGES}
                start={PATH_WINDOWS.hood[0]}
                end={PATH_WINDOWS.hood[1]}
                progress={clamped}
              />

              <path
                d={FRIDGE_HANDLE}
                pathLength={1}
                className="kp-line kp-line--detail"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: drawOffset(
                    clamped,
                    PATH_WINDOWS.fridgeDetails[0],
                    PATH_WINDOWS.fridgeDetails[1]
                  ),
                }}
              />
              {FRIDGE_SEAMS.map((d, i) => (
                <LineReveal
                  key={i}
                  d={d}
                  start={PATH_WINDOWS.fridgeDetails[0]}
                  end={PATH_WINDOWS.fridgeDetails[1]}
                  progress={clamped}
                />
              ))}

              {BACK_RUN_COUNTERTOP_EDGES && (
                <g opacity="0.5">
                  <CuboidWireframe
                    edges={BACK_RUN_COUNTERTOP_EDGES}
                    start={PATH_WINDOWS.backRun[0] + 4}
                    end={PATH_WINDOWS.backRun[1] + 4}
                    progress={clamped}
                  />
                </g>
              )}

              {PENDANTS.map((pendant, i) => {
                const win = PENDANT_WINDOWS[i] || [90, 100];
                const cordEnd = win[0] + (win[1] - win[0]) * 0.38;

                return (
                  <g key={i}>
                    <path
                      d={pendant.cord}
                      pathLength={1}
                      className="kp-line kp-line--cord"
                      style={{
                        strokeDasharray: 1,
                        strokeDashoffset: drawOffset(clamped, win[0], cordEnd),
                      }}
                    />
                    <CuboidWireframe
                      edges={pendant.edges}
                      start={cordEnd}
                      end={win[1]}
                      progress={clamped}
                    />
                  </g>
                );
              })}

              <line
                x1="0"
                y1={5.6 * clamped}
                x2="860"
                y2={5.6 * clamped}
                stroke="url(#kp-scan-gradient)"
                strokeWidth="1.5"
                opacity="0.8"
              />
            </motion.g>
          </svg>
        </motion.div>

        <div className="hidden md:block absolute bottom-10 right-10 w-64 kp-title-block kp-hud text-[10px] text-[var(--kp-muted)] px-3 py-2">
          <div className="kp-title-block__row flex justify-between py-1.5 uppercase">
            <span className="opacity-70">Project</span>
            <span className="text-[var(--kp-paper)]">Kitchen Renovation</span>
          </div>
          <div className="kp-title-block__row flex justify-between py-1.5 uppercase">
            <span className="opacity-70">Drawing</span>
            <span className="text-[var(--kp-paper)]">Island · Back Run · Fridge Bank</span>
          </div>
          <div className="kp-title-block__row flex justify-between py-1.5 uppercase">
            <span className="opacity-70">Material</span>
            <span className="text-[var(--kp-paper)]">{material}</span>
          </div>
          <div className="flex justify-between py-1.5 uppercase">
            <span className="opacity-70">Rev</span>
            <span className="text-[var(--kp-paper)]">{revision}</span>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5 w-[min(80vw,700px)]">
          <div className="kp-bar-track w-full h-[2px]">
            <div className="kp-bar-fill" style={{ width: `${clamped}%` }}>
              <span className="kp-bar-tip" />
            </div>
          </div>
          <div className="kp-percentage text-4xl md:text-5xl font-medium">
            {String(Math.round(clamped)).padStart(3, "0")}
            <span className="kp-percentage__unit text-lg md:text-xl ml-1">%</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={
          showWelcome
            ? {
                opacity: [0, 1, 1, 0],
                scale: [0.92, 1, 1, 1.06],
                y: [30, 0, 0, -24],
              }
            : { opacity: 0, scale: 0.92, y: 30 }
        }
        transition={{
          duration: reducedMotion ? 0.6 : 2.6,
          times: [0, 0.2, 0.72, 1],
          ease: "easeInOut",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(52px, 9vw, 120px)",
            fontWeight: 700,
            letterSpacing: ".15em",
            color: "white",
            textTransform: "uppercase",
            fontFamily: "var(--font-accent)",
          }}
        >
          Welcome.
        </h1>
      </motion.div>
    </div>
  );
};

export default LoadingPage;
