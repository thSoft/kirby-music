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
  title: string;
  videoId: string;
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
  { id: "triumph", title: "Triumph", score: "a3 g/2f/2 edcd | e2 d>e A2 A2 | B6 B>^c | B6 " },
  { id: "return", title: "Return", score: "G>G | c6 ce | fc'af e2 d2 |" },
  { id: "star", title: "Star", score: "DGc EAd Fc|e Gdg ecAE |" },
  { id: "sky", title: "Sky", score: "cF/2G/2 c4 G/2c/2f/2g/2 | c'f/2g/2 c'6 |" },
  { id: "halcandra", title: "Halcandra", score: "A6 c2 | B6 G2 | A6 c2 | B6 z2 | G6 B2 | A3 E3 C2 | G8 |" },
  { id: "halcandra b", title: "Halcandra B", score: "g4 c4 | f4 z4 | e7 d/2c/2 | d4 z4 |" },
  { id: "halcandra c", title: "Halcandra C", score: "g3 ^f/2g/2 a4 |" },
  { id: "crown", title: "Crown", score: "AE BE c/2B/2 z |" },
  { id: "nightmare", title: "Nightmare", score: "z/2 g/2g/2g/2 g/2g/2g/2g/2 g/2^f/2e/2d/2 e/2A/2c/2d/2 | B8 |" },
  { id: "kirby", title: "Kirby", score: "G>G | c6 c>e | gc'ba g2 e>g | f2 d>e d2 e>d | c6" },
  { id: "kirby b", title: "Kirby B", score: "A>B | c2 B>c d2 c>d | e2 d>e A2" },
  { id: "jamba heart", title: "Jamba Heart", score: "E>E AB cd | e6 |" },
  {
    id: "ominous",
    title: "Ominous",
    score: "V:1 stem=up\n[A8- c8 e8] | [A8- B8 ^d8 ^f8] | [A8- d8 f8] | [A8 c8 e8] |",
  },
  { id: "supplication", title: "Supplication", score: "z/2 c/2B/2c/2 A/2BcA/2E |" },
  { id: "friend star intro", title: "Friend Star Intro", score: " A-|AABA cA2A-|AABA cA2" },
  { id: "friend star", title: "Friend Star", score: " c-|ccBc dA2c-|ccBc dA2" },
];

export const games: Game[] = [
  {
    id: "Kirby's Dream Land",
    title: "Kirby's Dream Land",
    tracks: [
      {
        id: "Green Greens",
        title: "Green Greens",
        videoId: "twPSaCABakA",
        sections: [
          { start: 6.6, themeIds: ["kirby"] },
          { start: 21.8, themeIds: ["kirby b"] },
        ],
        keyChanges: [
          { start: 0, key: { tonic: "c", mode: "major" } },
          { start: 21.8, key: { tonic: "eb", mode: "major" } },
        ],
        duration: 32,
        url: "https://wikirby.com/wiki/Green_Greens_(theme)",
      },
    ],
  },
  {
    id: "Kirby's Adventure",
    title: "Kirby's Adventure",
    tracks: [
      {
        id: "Final Boss",
        title: "Final Boss",
        videoId: "dNZDnZQ7lWg",
        sections: [{ start: 7, themeIds: ["nightmare"] }],
        keyChanges: [{ start: 0, key: { tonic: "g#", mode: "minor" } }],
        duration: 32.6,
        url: "https://wikirby.com/wiki/Final_Boss_(theme_from_Kirby%27s_Adventure)",
      },
    ],
  },
  {
    id: "Kirby Super Star",
    title: "Kirby Super Star",
    tracks: [
      {
        id: "Kirby's Triumphant Return",
        title: "Kirby's Triumphant Return",
        videoId: "VclEVQA0_O8",
        sections: [
          { start: 0, themeIds: ["triumph"] },
          { start: 7, themeIds: ["return"] },
        ],
        keyChanges: [
          { start: 0, key: { tonic: "c", mode: "minor" } },
          { start: 7, key: { tonic: "c", mode: "major" } },
        ],
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
        title: "Four Adventurers: Cookie Country",
        videoId: "g_lQuWbLxn0",
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
        title: "The Adventure Begins",
        videoId: "pwe4B0Z0aW8",
        sections: [
          { start: 2.9, themeIds: ["adventure"] },
          { start: 20.7, themeIds: ["hero"] },
          { start: 32.4, themeIds: ["hero"] },
          { start: 36.7, themeIds: ["adventure"] },
          { start: 38.2, themeIds: ["return"] },
        ],
        keyChanges: [{ start: 0, key: { tonic: "F", mode: "major" } }],
        duration: 48.7,
        url: "https://wikirby.com/wiki/The_Adventure_Begins",
      },
      {
        id: "Magolor, the Far-Flung Traveler",
        title: "Magolor, the Far-Flung Traveler",
        videoId: "4EITf3jgfKw",
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
        url: "https://wikirby.com/wiki/Magolor,_the_Far-Flung_Traveler",
      },
      {
        id: "Sky Tower",
        title: "Sky Tower",
        videoId: "vRS-Fjnv_UM",
        sections: [
          { start: 0, themeIds: ["star"] },
          { start: 6, themeIds: ["sky"] },
          { start: 23.9, themeIds: ["victory"] },
          { start: 44.8, themeIds: ["road"] },
        ],
        keyChanges: [{ start: 0, key: { tonic: "db", mode: "major" } }],
        duration: 50.7,
        url: "https://wikirby.com/wiki/Sky_Tower",
      },
      {
        id: "The Lor Starcutter Reborn",
        title: "The Lor Starcutter Reborn",
        videoId: "y_G9sQgc7kk",
        sections: [
          { start: 0, themeIds: ["anticipation"] },
          { start: 5.7, themeIds: ["magolor"] },
        ],
        keyChanges: [{ start: 0, key: { tonic: "F", mode: "major" } }],
      },
      {
        id: "Halcandra: A New Enemy",
        title: "Halcandra: A New Enemy",
        videoId: "oclpDTlnXeM",
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
        title: "Dangerous Dinner",
        videoId: "sQsGBOlRKNM",
        sections: [
          { start: 0, themeIds: ["anticipation"] },
          { start: 5.3, themeIds: ["hero"] },
          { start: 16, themeIds: ["adventure"] },
          { start: 26.7, themeIds: ["anticipation"] },
        ],
        keyChanges: [{ start: 0, key: { tonic: "d", mode: "minor" } }],
        duration: 31.9,
        url: "https://wikirby.com/wiki/Dangerous_Dinner_(theme)",
      },
      {
        id: "Fly, Kirby!",
        title: "Fly, Kirby!",
        videoId: "vNFs58zdW_4",
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
        title: "Limitless Power",
        videoId: "irOwhfBpnFU",
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
        title: "Road to Victory",
        videoId: "U5Jm-diYDCw",
        sections: [
          { start: 3.2, themeIds: ["road"] },
          { start: 28.7, themeIds: ["victory"] },
          { start: 54.4, themeIds: ["road"] },
        ],
        duration: 67,
      },
      {
        id: "Supreme Ruler's Coronation - OVERLORD",
        title: "Supreme Ruler's Coronation - OVERLORD",
        videoId: "YytAAZCKzps",
        sections: [
          { start: 0, themeIds: ["magolor b"] },
          { start: 11.8, themeIds: ["anticipation"] },
          { start: 22.8, themeIds: ["hero"] },
          { start: 34, themeIds: ["adventure"] },
          { start: 39.4, themeIds: ["flight"] },
          { start: 51.4, themeIds: ["crown"] },
          { start: 57.8, themeIds: ["magolor"] },
          { start: 70.9, themeIds: ["anticipation"] },
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
          { start: 186, themeIds: ["ominous", "hero"] },
        ],
        keyChanges: [
          { start: 0, key: { tonic: "f", mode: "minor" } },
          { start: 70.9, key: { tonic: "c#", mode: "minor" } },
          { start: 90.7, key: { tonic: "f", mode: "minor" } },
          { start: 157.2, key: { tonic: "g#", mode: "minor" } },
        ],
        duration: 201.5,
        url: "https://wikirby.com/wiki/Supreme_Ruler%27s_Coronation_-_OVERLORD",
      },
    ],
  },
  {
    id: "Kirby Star Allies",
    title: "Kirby Star Allies",
    tracks: [
      {
        id: "Suite: The Star Conquering Traveler",
        title: "Suite: The Star Conquering Traveler",
        videoId: "y5l3Zz58264",
        sections: [
          { start: 0, themeIds: ["jamba heart"] },
          { start: 16.5, themeIds: ["supplication", "ominous"] },
          { start: 41.8, themeIds: ["jamba heart"] },
          { start: 54.5, themeIds: ["supplication"] },
          { start: 79.7, themeIds: ["supplication", "jamba heart"] },
          { start: 98.5, themeIds: ["friend star intro"] },
        ],
        keyChanges: [{ start: 0, key: { tonic: "c", mode: "minor" } }],
        duration: 105,
      },
    ],
  },
];
