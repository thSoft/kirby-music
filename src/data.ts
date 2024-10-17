import distinctColors from "distinct-colors";

export type Theme = {
  id: string;
  title: string;
  score?: string;
};

export type Section = {
  start: number;
  themeIds: string[];
};

export type Key = { tonic: string; mode: string };
export type KeyChange = { start: number; key: Key };

export type Track = {
  videoId: string;
  title: string;
  sections: Section[];
  keyChanges?: KeyChange[];
  duration?: number;
};

export type Game = {
  id: string;
  title: string;
  tracks: Track[];
};

export const themes: Theme[] = [
  { id: "road", title: "Road", score: "Gcd Gc/2d/2 Gcd | gfed e G2 |" },
  { id: "victory", title: "Victory", score: "z A/2B/2 cA/2B/2 c2 z e | d z B3 z" },
  { id: "adventure", title: "Adventure", score: "cG dG ed/2c/2 dG |" },
  { id: "hero", title: "Hero", score: "c3 G/2c/2 g2 G2 | c3 G/2c/2 g G3 |" },
  { id: "magolor", title: "Magolor", score: "g2 g2 g>a gf | e>f ed c2 G2 | " },
  { id: "magolor b", title: "Magolor B" },
  { id: "anticipation", title: "Anticipation" },
  { id: "flight", title: "Flight" },
  { id: "triumph", title: "Triumph" },
  { id: "triumph b", title: "Triumph B" },
  { id: "star", title: "Star" },
  { id: "sky", title: "Sky" },
  { id: "halcandra", title: "Halcandra" },
  { id: "halcandra b", title: "Halcandra B" },
  { id: "hero var", title: "Hero (var.)" },
  { id: "crown", title: "Crown" },
  { id: "nightmare", title: "Nightmare" },
];

export const colors = distinctColors({ count: themes.length });

export const games: Game[] = [
  {
    id: "rtdl",
    title: "Kirby's Return to Dream Land (Deluxe)",
    tracks: [
      {
        videoId: "g_lQuWbLxn0",
        title: "Four Adventurers: Cookie Country",
        sections: [
          { start: 2.9, themeIds: ["anticipation"] },
          { start: 8.5, themeIds: ["hero"] },
          { start: 31, themeIds: ["road"] },
        ],
        keyChanges: [{ start: 0, key: { tonic: "F", mode: "major" } }],
        duration: 82.5,
      },
      {
        videoId: "pwe4B0Z0aW8",
        title: "The Adventure Begins",
        sections: [
          { start: 2.9, themeIds: ["adventure"] },
          { start: 20.7, themeIds: ["hero"] },
          { start: 32.4, themeIds: ["hero"] },
          { start: 36.7, themeIds: ["adventure"] },
          { start: 38.2, themeIds: ["triumph b"] },
        ],
        duration: 48.5,
      },
      {
        videoId: "4EITf3jgfKw",
        title: "Magolor, the Far-Flung Traveler",
        sections: [
          { start: 0.6, themeIds: ["magolor"] },
          { start: 13.5, themeIds: ["magolor b"] },
        ],
        duration: 26,
      },
      {
        videoId: "vRS-Fjnv_UM",
        title: "Sky Tower",
        sections: [
          { start: 0, themeIds: ["star"] },
          { start: 6, themeIds: ["sky"] },
          { start: 23.9, themeIds: ["victory"] },
          { start: 44.8, themeIds: ["road"] },
        ],
        duration: 50.7,
      },
      {
        videoId: "y_G9sQgc7kk",
        title: "The Lor Starcutter Reborn",
        sections: [
          { start: 0, themeIds: ["anticipation"] },
          { start: 5.8, themeIds: ["magolor"] },
        ],
      },
      {
        videoId: "b7GxDSzgeck",
        title: "Halcandra: A New Enemy",
        sections: [
          { start: 5.7, themeIds: ["halcandra"] },
          { start: 18, themeIds: ["road"] },
          { start: 28.6, themeIds: ["halcandra b"] },
          { start: 39.8, themeIds: ["road"] },
          { start: 42.7, themeIds: ["magolor"] },
          { start: 76, themeIds: ["hero var"] },
          { start: 98, themeIds: ["magolor"] },
        ],
      },
      {
        videoId: "sQsGBOlRKNM",
        title: "Dangerous Dinner",
        sections: [
          { start: 0, themeIds: ["anticipation"] },
          { start: 5.3, themeIds: ["hero"] },
          { start: 16, themeIds: ["adventure"] },
          { start: 26.7, themeIds: ["anticipation"] },
        ],
        duration: 31.9,
      },
      {
        videoId: "vNFs58zdW_4",
        title: "Fly, Kirby!",
        sections: [
          { start: 5.8, themeIds: ["flight"] },
          { start: 28.2, themeIds: ["flight"] },
          { start: 51, themeIds: ["hero"] },
          { start: 62.2, themeIds: ["flight"] },
          { start: 68, themeIds: ["triumph"] },
          { start: 70.8, themeIds: ["hero"] },
        ],
        duration: 79,
      },
      {
        videoId: "irOwhfBpnFU",
        title: "Limitless Power",
        sections: [
          { start: 0.8, themeIds: ["crown"] },
          { start: 23.4, themeIds: ["hero"] },
          { start: 33.4, themeIds: ["crown"] },
          { start: 53.3, themeIds: ["anticipation"] },
        ],
        duration: 63.3,
      },
      {
        videoId: "U5Jm-diYDCw",
        title: "Road to Victory",
        sections: [
          { start: 3.2, themeIds: ["road"] },
          { start: 28.7, themeIds: ["victory"] },
          { start: 54.4, themeIds: ["road"] },
        ],
        duration: 67,
      },
    ],
  },
  {
    id: "adv",
    title: "Kirby's Adventure",
    tracks: [
      {
        videoId: "dNZDnZQ7lWg",
        title: "Final Battle 2",
        sections: [{ start: 7, themeIds: ["nightmare"] }],
        duration: 32.6,
      },
    ],
  },
];
