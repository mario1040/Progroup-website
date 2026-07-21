// kitchenGeometry.js
// A cleaner, richer geometry layer for the kitchen loading experience.
// Keeps the same public export surface so the loading scene can stay intact.

const DEG = Math.PI / 180;
const COS30 = Math.cos(30 * DEG);
const SIN30 = Math.sin(30 * DEG);

const SCALE = 42;
const OFFSET_X = 330;
const OFFSET_Y = 250;

const proj = (x, y, z) => {
  const X = (x - y) * COS30 * SCALE + OFFSET_X;
  const Y = (x + y) * SIN30 * SCALE - z * SCALE + OFFSET_Y;
  return [Number(X.toFixed(1)), Number(Y.toFixed(1))];
};

const line = (x1, y1, z1, x2, y2, z2) => {
  const a = proj(x1, y1, z1);
  const b = proj(x2, y2, z2);
  return `M${a[0]},${a[1]} L${b[0]},${b[1]}`;
};

const polyPath = (points) => {
  const projected = points.map((p) => proj(p[0], p[1], p[2]));
  return `M${projected.map((p) => `${p[0]},${p[1]}`).join(" L")} Z`;
};

const cuboid = (x0, x1, y0, y1, z0, z1) => {
  const corners = {};

  for (const [xi, xv] of [[0, x0], [1, x1]]) {
    for (const [yi, yv] of [[0, y0], [1, y1]]) {
      for (const [zi, zv] of [[0, z0], [1, z1]]) {
        corners[`${xi}${yi}${zi}`] = proj(xv, yv, zv);
      }
    }
  }

  const edgeKeys = [
    ["000", "100"],
    ["100", "110"],
    ["110", "010"],
    ["010", "000"],
    ["001", "101"],
    ["101", "111"],
    ["111", "011"],
    ["011", "001"],
    ["000", "001"],
    ["100", "101"],
    ["110", "111"],
    ["010", "011"],
  ];

  const edges = edgeKeys.map(([aKey, bKey]) => {
    const p1 = corners[aKey];
    const p2 = corners[bKey];
    const touchesBackBottomCorner =
      (aKey === "000" || bKey === "000") &&
      !(aKey === "001" && bKey === "101") &&
      !(aKey === "101" && bKey === "001");

    return {
      d: `M${p1[0]},${p1[1]} L${p2[0]},${p2[1]}`,
      hidden: touchesBackBottomCorner,
    };
  });

  return {
    edges,
    faces: {
      top: `${corners["001"][0]},${corners["001"][1]} ${corners["101"][0]},${corners["101"][1]} ${corners["111"][0]},${corners["111"][1]} ${corners["011"][0]},${corners["011"][1]}`,
      right: `${corners["100"][0]},${corners["100"][1]} ${corners["101"][0]},${corners["101"][1]} ${corners["111"][0]},${corners["111"][1]} ${corners["110"][0]},${corners["110"][1]}`,
      left: `${corners["010"][0]},${corners["010"][1]} ${corners["011"][0]},${corners["011"][1]} ${corners["111"][0]},${corners["111"][1]} ${corners["110"][0]},${corners["110"][1]}`,
    },
  };
};

const paths = (...segments) => segments.map((seg) => line(...seg));

const VIEWBOX_VALUE = "0 0 860 560";

// -----------------------------------------------------------------------------
// Primary architecture
// -----------------------------------------------------------------------------

const ISLAND = cuboid(1.55, 3.62, -1.45, 1.75, 0, 1.3);
const COUNTERTOP = cuboid(1.45, 3.74, -1.58, 1.88, 1.3, 1.46);
const WALL_CABINET = cuboid(4.62, 5.9, -4.05, -1.92, 2.58, 3.34);
const BACK_RUN = cuboid(4.05, 4.95, -4.18, 2.62, 0, 1.08);
const BACK_RUN_CT = cuboid(3.98, 5.02, -4.28, 2.72, 1.08, 1.24);
const FRIDGE = cuboid(4.0, 4.9, 2.7, 4.28, 0, 2.65);
const RANGE_HOOD = cuboid(4.4, 5.3, -2.88, -1.48, 2.92, 3.34);

// -----------------------------------------------------------------------------
// Small visible elements
// -----------------------------------------------------------------------------

const rangeOutline = polyPath([
  [4.28, -1.28, 1.1],
  [4.78, -1.28, 1.1],
  [4.78, -0.35, 1.1],
  [4.28, -0.35, 1.1],
]);

const rangeBurners = paths(
  [4.4, -1.12, 1.15, 4.66, -1.12, 1.15],
  [4.53, -0.99, 1.15, 4.53, -0.48, 1.15],
  [4.66, -0.99, 1.15, 4.66, -0.48, 1.15],
);

const sinkOutline = polyPath([
  [4.22, -0.65, 1.24],
  [4.84, -0.65, 1.24],
  [4.84, 0.48, 1.24],
  [4.22, 0.48, 1.24],
]);

const sinkInner = polyPath([
  [4.32, -0.53, 1.22],
  [4.72, -0.53, 1.22],
  [4.72, 0.36, 1.22],
  [4.32, 0.36, 1.22],
]);

// -----------------------------------------------------------------------------
// Detail strands
// -----------------------------------------------------------------------------

const wallShelfLines = paths(
  [5.36, -4.02, 2.84, 5.36, -1.92, 2.84],
  [5.36, -4.02, 3.09, 5.36, -1.92, 3.09],
  [5.12, -4.02, 2.84, 5.12, -1.92, 2.84],
  [5.12, -4.02, 3.09, 5.12, -1.92, 3.09],
);

const backShelfLines = paths(
  [4.95, -3.6, 0.48, 4.95, 2.5, 0.48],
  [4.95, -3.6, 0.86, 4.95, 2.5, 0.86],
  [4.08, -3.6, 0.48, 4.08, 2.5, 0.48],
  [4.08, -3.6, 0.86, 4.08, 2.5, 0.86],
);

const islandDrawerLines = paths(
  [1.55, 0.18, 0.76, 3.62, 0.18, 0.76],
  [2.38, -1.45, 0.76, 2.38, 0.18, 0.76],
  [3.02, -1.45, 0.76, 3.02, 0.18, 0.76],
  [2.05, -0.6, 0.76, 2.25, -0.6, 0.76],
  [2.7, -0.6, 0.76, 2.9, -0.6, 0.76],
  [3.35, -0.6, 0.76, 3.55, -0.6, 0.76],
  [2.38, 0.18, 0.76, 2.38, 1.62, 0.76],
  [3.02, 0.18, 0.76, 3.02, 1.62, 0.76],
  [2.05, 0.95, 0.76, 2.25, 0.95, 0.76],
  [2.7, 0.95, 0.76, 2.9, 0.95, 0.76],
  [3.35, 0.95, 0.76, 3.55, 0.95, 0.76],
);

const backRunDoorSeams = paths(
  [4.95, -3.92, 0.06, 4.95, -3.92, 1.02],
  [4.95, -2.5, 0.06, 4.95, -2.5, 1.02],
  [4.95, -1.2, 0.06, 4.95, -1.2, 1.02],
  [4.95, 0.1, 0.06, 4.95, 0.1, 1.02],
  [4.95, 1.5, 0.06, 4.95, 1.5, 1.02],
  [4.95, 2.2, 0.06, 4.95, 2.2, 1.02],
  [4.08, -3.92, 0.06, 4.08, -3.92, 1.02],
  [4.08, -2.5, 0.06, 4.08, -2.5, 1.02],
  [4.08, -1.2, 0.06, 4.08, -1.2, 1.02],
  [4.08, 0.1, 0.06, 4.08, 0.1, 1.02],
);

const backRunHandles = paths(
  [4.95, -3.55, 0.6, 4.95, -3.15, 0.6],
  [4.95, -2.3, 0.6, 4.95, -1.9, 0.6],
  [4.95, -1.0, 0.6, 4.95, -0.6, 0.6],
  [4.95, 0.3, 0.6, 4.95, 0.7, 0.6],
  [4.95, 1.7, 0.6, 4.95, 2.1, 0.6],
);

const wallCabinetHandles = paths(
  [5.72, -3.8, 2.7, 5.72, -3.8, 3.1],
  [5.72, -3.15, 2.7, 5.72, -3.15, 3.1],
  [5.72, -2.5, 2.7, 5.72, -2.5, 3.1],
);

// -----------------------------------------------------------------------------
// Opening architecture
// -----------------------------------------------------------------------------

const windowFrameOuter = polyPath([
  [4.08, -3.9, 1.32],
  [5.92, -3.9, 1.32],
  [5.92, -3.9, 3.85],
  [4.08, -3.9, 3.85],
]);

const windowMullionV = line(5.0, -3.9, 1.32, 5.0, -3.9, 3.85);
const windowMullionH = line(4.08, -3.9, 2.58, 5.92, -3.9, 2.58);

const windowSill = polyPath([
  [4.02, -3.88, 1.28],
  [5.98, -3.88, 1.28],
  [5.98, -3.86, 1.32],
  [4.02, -3.86, 1.32],
]);

// -----------------------------------------------------------------------------
// Appliances and functional details
// -----------------------------------------------------------------------------

const rangeOvenDoor = polyPath([
  [4.32, -1.2, 0.32],
  [4.74, -1.2, 0.32],
  [4.74, -0.42, 0.32],
  [4.32, -0.42, 0.32],
]);

const rangeOvenHandle = line(4.38, -1.18, 0.9, 4.68, -1.18, 0.9);
const rangeKnobs = paths(
  [4.33, -1.08, 1.1, 4.33, -1.08, 1.16],
  [4.43, -1.08, 1.1, 4.43, -1.08, 1.16],
  [4.53, -1.08, 1.1, 4.53, -1.08, 1.16],
  [4.63, -1.08, 1.1, 4.63, -1.08, 1.16],
  [4.73, -1.08, 1.1, 4.73, -1.08, 1.16],
);

const sinkDrain = polyPath([
  [4.48, 0.0, 1.23],
  [4.58, 0.0, 1.23],
  [4.58, 0.1, 1.23],
  [4.48, 0.1, 1.23],
]);

const sinkFaucetBase = polyPath([
  [4.82, -0.02, 1.24],
  [5.0, -0.02, 1.24],
  [5.0, 0.14, 1.24],
  [4.82, 0.14, 1.24],
]);

const barStools = [
  {
    seat: polyPath([
      [1.85, -1.68, 1.08],
      [2.15, -1.68, 1.08],
      [2.15, -1.42, 1.08],
      [1.85, -1.42, 1.08],
    ]),
    legs: paths(
      [1.88, -1.65, 0.0, 1.88, -1.65, 1.08],
      [2.12, -1.65, 0.0, 2.12, -1.65, 1.08],
      [1.88, -1.45, 0.0, 1.88, -1.45, 1.08],
      [2.12, -1.45, 0.0, 2.12, -1.45, 1.08],
    ),
    footrest: line(1.88, -1.55, 0.32, 2.12, -1.55, 0.32),
  },
  {
    seat: polyPath([
      [2.65, -1.68, 1.08],
      [2.95, -1.68, 1.08],
      [2.95, -1.42, 1.08],
      [2.65, -1.42, 1.08],
    ]),
    legs: paths(
      [2.68, -1.65, 0.0, 2.68, -1.65, 1.08],
      [2.92, -1.65, 0.0, 2.92, -1.65, 1.08],
      [2.68, -1.45, 0.0, 2.68, -1.45, 1.08],
      [2.92, -1.45, 0.0, 2.92, -1.45, 1.08],
    ),
    footrest: line(2.68, -1.55, 0.32, 2.92, -1.55, 0.32),
  },
  {
    seat: polyPath([
      [3.35, -1.68, 1.08],
      [3.65, -1.68, 1.08],
      [3.65, -1.42, 1.08],
      [3.35, -1.42, 1.08],
    ]),
    legs: paths(
      [3.38, -1.65, 0.0, 3.38, -1.65, 1.08],
      [3.62, -1.65, 0.0, 3.62, -1.65, 1.08],
      [3.38, -1.45, 0.0, 3.38, -1.45, 1.08],
      [3.62, -1.45, 0.0, 3.62, -1.45, 1.08],
    ),
    footrest: line(3.38, -1.55, 0.32, 3.62, -1.55, 0.32),
  },
];

const cuttingBoard = polyPath([
  [1.72, -1.2, 1.46],
  [2.12, -1.2, 1.46],
  [2.12, -0.78, 1.46],
  [1.72, -0.78, 1.46],
]);

const dishwasherOutline = polyPath([
  [4.28, -0.32, 0.0],
  [4.78, -0.32, 0.0],
  [4.78, -0.32, 1.02],
  [4.28, -0.32, 1.02],
]);

const dishwasherHandle = line(4.34, -0.32, 0.72, 4.72, -0.32, 0.72);

const outletLines = paths(
  [4.95, 1.9, 1.42, 4.95, 2.1, 1.42],
  [4.95, 1.9, 1.62, 4.95, 2.1, 1.62],
  [4.95, 1.9, 1.42, 4.95, 1.9, 1.62],
  [4.95, 2.1, 1.42, 4.95, 2.1, 1.62],
  [4.95, -3.7, 1.5, 4.95, -3.55, 1.5],
  [4.95, -3.7, 1.7, 4.95, -3.55, 1.7],
  [4.95, -3.7, 1.5, 4.95, -3.7, 1.7],
  [4.95, -3.55, 1.5, 4.95, -3.55, 1.7],
);

const ceilingLightRail = line(1.55, -1.45, 3.44, 3.62, 1.75, 3.44);

const fridgeShelfLines = paths(
  [4.88, 3.36, 1.82, 4.0, 3.36, 1.82],
  [4.88, 2.8, 0.38, 4.0, 2.8, 0.38],
  [4.88, 2.8, 1.02, 4.0, 2.8, 1.02],
  [4.88, 2.8, 1.52, 4.0, 2.8, 1.52],
);

const microwave = cuboid(5.08, 5.52, -3.52, -3.05, 2.76, 2.98);
const coffeeMaker = cuboid(4.15, 4.38, -0.42, -0.2, 1.24, 1.62);

const paperTowelRod = line(4.28, -3.95, 2.12, 4.28, -3.72, 2.12);
const paperTowelRoll = line(4.28, -3.84, 2.06, 4.28, -3.84, 2.24);

// -----------------------------------------------------------------------------
// Atmosphere
// -----------------------------------------------------------------------------

const extraFloorLines = [
  ...Array.from({ length: 8 }, (_, i) => {
    const x1 = 4.93 + i * 0.36;
    const y1 = -3.79 + i * 0.21;
    const x2 = 0.2 + i * 0.36;
    const y2 = 4.1 + i * 0.21;
    return line(x1, y1, 0, x2, y2, 0);
  }),
  ...Array.from({ length: 8 }, (_, i) => {
    const x1 = 4.57 - i * 0.36;
    const y1 = -3.79 + i * 0.21;
    const x2 = 7.82 - i * 0.36;
    const y2 = -1.9 + i * 0.21;
    return line(x1, y1, 0, x2, y2, 0);
  }),
];

const backsplashHatch = [
  ...Array.from({ length: 8 }, (_, i) => line(4.95, -4.0 + i * 0.88, 1.26, 4.45, -3.56 + i * 0.88, 2.55)),
  ...Array.from({ length: 3 }, (_, i) => line(4.95, -4.18, 1.58 + i * 0.34, 4.95, 2.62, 1.58 + i * 0.34)),
];

const pendant = (x, y, topZ, bodyBottomZ, size = 0.26) => {
  const half = size / 2;
  const body = cuboid(
    x - half,
    x + half,
    y - half,
    y + half,
    bodyBottomZ - 0.22,
    bodyBottomZ,
  );

  return {
    cord: line(x, y, topZ, x, y, bodyBottomZ + 0.38),
    edges: body.edges,
    faces: body.faces,
  };
};

const PENDANTS_VALUE = [
  pendant(4.08, -0.92, 3.42, 2.55, 0.27),
  pendant(3.42, -0.34, 3.36, 2.5, 0.27),
  pendant(2.74, 0.24, 3.3, 2.46, 0.27),
  pendant(2.06, 0.82, 3.24, 2.42, 0.27),
];

// -----------------------------------------------------------------------------
// Floor grid
// -----------------------------------------------------------------------------

const baseFloorGrid = [
  ...Array.from({ length: 12 }, (_, i) => line(4.75 + i * 0.36, -3.9 + i * 0.21, 0, 0.02 + i * 0.36, 4.0 + i * 0.21, 0)),
  ...Array.from({ length: 12 }, (_, i) => line(4.75 - i * 0.36, -3.9 + i * 0.21, 0, 8.0 - i * 0.36, -2.01 + i * 0.21, 0)),
];

export const VIEWBOX = VIEWBOX_VALUE;
export const ISLAND_EDGES = ISLAND.edges;
export const ISLAND_FACES = ISLAND.faces;
export const COUNTERTOP_EDGES = COUNTERTOP.edges;
export const COUNTERTOP_FACES = COUNTERTOP.faces;
export const WALL_CABINET_EDGES = WALL_CABINET.edges;
export const WALL_CABINET_FACES = WALL_CABINET.faces;
export const BACK_RUN_EDGES = BACK_RUN.edges;
export const BACK_RUN_FACES = BACK_RUN.faces;
export const BACK_RUN_COUNTERTOP_EDGES = BACK_RUN_CT.edges;
export const BACK_RUN_COUNTERTOP_FACES = BACK_RUN_CT.faces;
export const FRIDGE_EDGES = FRIDGE.edges;
export const FRIDGE_FACES = FRIDGE.faces;
export const RANGE_HOOD_EDGES = RANGE_HOOD.edges;
export const RANGE_HOOD_FACES = RANGE_HOOD.faces;

export const SINK_OUTLINE = sinkOutline;
export const SINK_INNER_OUTLINE = sinkInner;
export const RANGE_OUTLINE = rangeOutline;
export const RANGE_BURNERS = rangeBurners;

export const BACK_RUN_TOEKICK = line(4.95, -4.18, 0.12, 4.95, 2.62, 0.12);
export const ISLAND_TOEKICK = line(1.55, 1.75, 0.06, 3.62, 1.75, 0.06);
export const FRIDGE_TOEKICK = line(4.0, 4.28, 0.04, 4.9, 4.28, 0.04);

export const BACK_RUN_SEAMS = [
  line(4.95, -3.34, 0.06, 4.95, -3.34, 1.02),
  line(4.95, -2.08, 0.06, 4.95, -2.08, 1.02),
  line(4.95, -0.82, 0.06, 4.95, -0.82, 1.02),
  line(4.95, 0.86, 0.06, 4.95, 0.86, 1.02),
];

export const ISLAND_SEAMS = [
  line(2.0, -1.45, 0.76, 2.0, 1.62, 0.76),
  line(2.76, -1.45, 0.76, 2.76, 1.62, 0.76),
];

export const WALL_SEAMS = [
  line(5.48, -4.02, 2.58, 5.48, -2.42, 2.58),
  line(5.98, -4.02, 2.58, 5.98, -2.42, 2.58),
];

export const FRIDGE_SEAMS = [
  line(4.88, 3.36, 0.05, 4.88, 3.36, 2.56),
  line(4.88, 2.8, 1.78, 4.0, 2.8, 1.78),
];

export const ISLAND_DRAWER_LINE = line(1.55, 0.18, 0.76, 3.62, 0.18, 0.76);
export const DIM_LINE_1 = line(0.02, -3.98, 2.9, 5.88, -3.98, 2.9);
export const DIM_LINE_1_TICKS = [
  line(0.02, -3.98, 2.78, 0.02, -3.98, 3.04),
  line(5.88, -3.98, 2.78, 5.88, -3.98, 3.04),
];
export const DIM_LINE_2 = line(-0.56, -3.38, 1.3, -0.56, -3.38, 0);
export const DIM_LINE_2_TICKS = [
  line(-0.39, -3.38, 1.3, -0.71, -3.38, 1.3),
  line(-0.39, -3.38, 0, -0.71, -3.38, 0),
];

export const BACKSPLASH_HATCH = backsplashHatch;
export const UNDERCAB_LIGHT_STRIP = line(4.08, -4.08, 2.56, 4.98, -4.08, 2.56);
export const FAUCET_PATH = [
  line(4.91, 0.05, 1.24, 4.91, 0.05, 1.95),
  line(4.91, 0.05, 1.95, 5.14, 0.28, 1.95),
  line(5.14, 0.28, 1.95, 5.14, 0.28, 1.58),
].join(" ");
export const FRIDGE_HANDLE = line(4.88, 3.0, 0.42, 4.88, 3.0, 1.95);

// Extended detail exports
export const WALL_SHELF_LINES = wallShelfLines;
export const BACK_SHELF_LINES = backShelfLines;
export const BACK_RUN_SHELF_LINES = backShelfLines;
export const ISLAND_DRAWER_LINES = islandDrawerLines;
export const BACK_RUN_DOOR_SEAMS = backRunDoorSeams;
export const BACK_RUN_HANDLES = backRunHandles;
export const WALL_CABINET_HANDLES = wallCabinetHandles;
export const OUTLET_LINES = outletLines;
export const WINDOW_FRAME_OUTER = windowFrameOuter;
export const WINDOW_MULLION_V = windowMullionV;
export const WINDOW_MULLION_H = windowMullionH;
export const WINDOW_SILL = windowSill;
export const RANGE_OVEN_DOOR = rangeOvenDoor;
export const RANGE_OVEN_HANDLE = rangeOvenHandle;
export const RANGE_KNOBS = rangeKnobs;
export const SINK_DRAIN = sinkDrain;
export const SINK_FAUCET_BASE = sinkFaucetBase;
export const BAR_STOOLS = barStools;
export const CUTTING_BOARD = cuttingBoard;
export const DISHWASHER_OUTLINE = dishwasherOutline;
export const DISHWASHER_HANDLE = dishwasherHandle;
export const CEILING_LIGHT_RAIL = ceilingLightRail;
export const FRIDGE_SHELF_LINES = fridgeShelfLines;
export const MICROWAVE_EDGES = microwave.edges;
export const MICROWAVE_FACES = microwave.faces;
export const COFFEE_MAKER_EDGES = coffeeMaker.edges;
export const COFFEE_MAKER_FACES = coffeeMaker.faces;
export const PAPER_TOWEL_ROD = paperTowelRod;
export const PAPER_TOWEL_ROLL = paperTowelRoll;
export const EXTRA_FLOOR_LINES = extraFloorLines;
export const PENDANTS = PENDANTS_VALUE;
export const ISO_FLOOR_GRID = [...baseFloorGrid, ...extraFloorLines];
