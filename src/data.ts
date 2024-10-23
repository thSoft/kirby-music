export type Theme = {
  id: string;
  title: string;
  score?: string;
};

export type Section = {
  start: number;
  themeIds: string[];
};

export type KeySignature = { tonic: string; mode: string };
export type KeyChange = { start: number; key: KeySignature };

export type Track = {
  id: string;
  videoId: string;
  title: string;
  sections: Section[];
  keyChanges?: KeyChange[];
  duration?: number;
  url?: string;
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
  { id: "magolor b", title: "Magolor B", score: "A3 B/2c/2 edcB | A3 B/2c/2 dBGB | " },
  { id: "anticipation", title: "Anticipation", score: "[C8- E8 G8] | [C8- F8 A8] | [C8- G8 B8] | [C8 F8 A8] |" },
  { id: "flight", title: "Flight", score: "A/2B/2 | c6 z B/2c/2 | d>c B4" },
  { id: "triumph", title: "Triumph" },
  { id: "triumph b", title: "Return", score: "z2 G>G c2 ce | fc'af e2 d2 |" },
  { id: "star", title: "Star" },
  { id: "sky", title: "Sky" },
  { id: "halcandra", title: "Halcandra" },
  { id: "halcandra b", title: "Halcandra B" },
  { id: "halcandra c", title: "Halcandra C" },
  { id: "crown", title: "Crown", score: "AE BE c/2B/2 z |" },
  { id: "nightmare", title: "Nightmare", score: "z/2 g/2g/2g/2 g/2g/2g/2g/2 g/2^f/2e/2d/2 e/2A/2c/2d/2 | B8 |" },
  { id: "kirby", title: "Kirby", score: "G>G | c4 z2 c>e | gc'ba g2 e>g | f2 d>e d2 e>d | c6" },
  { id: "kirby b", title: "Kirby B", score: "A>B | c2 B>c d2 c>d | e2 d>e A2" },
  {
    id: "ominous",
    title: "Ominous",
    score: "V:1 stem=up\n[A8- c8 e8] | [A8- B8 ^d8 ^f8] | [A8- d8 f8] | [A8 c8 e8] |",
  },
];

export const games: Game[] = [
  {
    id: "Kirby's Dream Land",
    title: "Kirby's Dream Land",
    tracks: [
      {
        id: "Green Greens",
        videoId: "twPSaCABakA",
        title: "Green Greens",
        sections: [
          { start: 6.5, themeIds: ["kirby"] },
          { start: 21, themeIds: ["kirby b"] },
        ],
        keyChanges: [
          { start: 0, key: { tonic: "c", mode: "major" } },
          { start: 21, key: { tonic: "eb", mode: "major" } },
        ],
        duration: 50,
      },
    ],
  },
  {
    id: "Kirby's Adventure",
    title: "Kirby's Adventure",
    tracks: [
      {
        id: "Final Battle 2",
        videoId: "dNZDnZQ7lWg",
        title: "Final Battle 2",
        sections: [{ start: 7, themeIds: ["nightmare"] }],
        keyChanges: [{ start: 0, key: { tonic: "g#", mode: "minor" } }],
        duration: 32.6,
      },
    ],
  },
  {
    id: "Kirby's Return to Dream Land (Deluxe)",
    title: "Kirby's Return to Dream Land (Deluxe)",
    tracks: [
      {
        id: "Four Adventurers: Cookie Country",
        videoId: "g_lQuWbLxn0",
        title: "Four Adventurers: Cookie Country",
        sections: [
          { start: 2.9, themeIds: ["anticipation"] },
          { start: 8.5, themeIds: ["hero"] },
          { start: 31, themeIds: ["road"] },
        ],
        keyChanges: [{ start: 0, key: { tonic: "f", mode: "major" } }],
        duration: 42.5,
        url: "https://wikirby.com/wiki/Four_Adventurers:_Cookie_Country",
      },
      {
        id: "The Adventure Begins",
        videoId: "pwe4B0Z0aW8",
        title: "The Adventure Begins",
        sections: [
          { start: 2.9, themeIds: ["adventure"] },
          { start: 20.7, themeIds: ["hero"] },
          { start: 32.4, themeIds: ["hero"] },
          { start: 36.7, themeIds: ["adventure"] },
          { start: 38.2, themeIds: ["triumph b"] },
        ],
        keyChanges: [{ start: 0, key: { tonic: "F", mode: "major" } }],
        duration: 48.7,
      },
      {
        id: "Magolor, the Far-Flung Traveler",
        videoId: "4EITf3jgfKw",
        title: "Magolor, the Far-Flung Traveler",
        sections: [
          { start: 0.6, themeIds: ["magolor"] },
          { start: 13.5, themeIds: ["magolor b"] },
        ],
        keyChanges: [
          { start: 0, key: { tonic: "D", mode: "major" } },
          { start: 13.5, key: { tonic: "F", mode: "major" } },
          { start: 16.6, key: { tonic: "D", mode: "major" } },
          { start: 19.7, key: { tonic: "F", mode: "major" } },
        ],
        duration: 26,
      },
      {
        id: "Sky Tower",
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
        id: "The Lor Starcutter Reborn",
        videoId: "y_G9sQgc7kk",
        title: "The Lor Starcutter Reborn",
        sections: [
          { start: 0, themeIds: ["anticipation"] },
          { start: 5.8, themeIds: ["magolor"] },
        ],
        keyChanges: [{ start: 0, key: { tonic: "F", mode: "major" } }],
      },
      {
        id: "Halcandra: A New Enemy",
        videoId: "oclpDTlnXeM",
        title: "Halcandra: A New Enemy",
        sections: [
          { start: 5.9, themeIds: ["halcandra"] },
          { start: 28.8, themeIds: ["halcandra b"] },
          { start: 40, themeIds: ["adventure"] },
          { start: 42.9, themeIds: ["magolor"] },
          { start: 76.2, themeIds: ["halcandra c"] },
          { start: 98.2, themeIds: ["magolor"] },
        ],
      },
      {
        id: "Dangerous Dinner",
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
        id: "Fly, Kirby!",
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
        id: "Limitless Power",
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
        id: "Road to Victory",
        videoId: "U5Jm-diYDCw",
        title: "Road to Victory",
        sections: [
          { start: 3.2, themeIds: ["road"] },
          { start: 28.7, themeIds: ["victory"] },
          { start: 54.4, themeIds: ["road"] },
        ],
        duration: 67,
      },
      {
        id: "Supreme Ruler's Coronation - OVERLORD",
        videoId: "YytAAZCKzps",
        title: "Supreme Ruler's Coronation - OVERLORD",
        sections: [
          { start: 0, themeIds: ["magolor b"] },
          { start: 11.8, themeIds: ["anticipation"] },
          { start: 22.8, themeIds: ["hero"] },
          { start: 34, themeIds: ["adventure"] },
          { start: 39.4, themeIds: ["flight"] },
          { start: 51.7, themeIds: ["crown"] },
          { start: 57.8, themeIds: ["magolor"] },
          { start: 71, themeIds: ["anticipation"] },
          { start: 77.5, themeIds: ["nightmare"] },
          { start: 89.2, themeIds: ["adventure"] },
          { start: 90.7, themeIds: ["nightmare", "road"] },
          { start: 104.1, themeIds: ["hero"] },
          { start: 117, themeIds: ["victory"] },
          { start: 123.3, themeIds: ["magolor"] },
          { start: 129.6, themeIds: ["victory"] },
          { start: 138.7, themeIds: ["road"] },
          { start: 141.8, themeIds: ["victory"] },
          { start: 154.2, themeIds: ["victory", "magolor"] },
          { start: 166.5, themeIds: ["kirby", "road"] },
          { start: 173.1, themeIds: ["triumph", "nightmare"] },
          { start: 186, themeIds: ["ominous"] },
        ],
        keyChanges: [
          { start: 0, key: { tonic: "f", mode: "minor" } },
          { start: 71, key: { tonic: "c#", mode: "minor" } },
          { start: 90.7, key: { tonic: "f", mode: "minor" } },
          { start: 157.2, key: { tonic: "g#", mode: "minor" } },
        ],
        duration: 201.4,
      },
    ],
  },
];
