export const themes = [
  { id: "road", title: "Road" },
  { id: "victory", title: "Victory" },
  { id: "adventure", title: "Adventure" },
  { id: "hero", title: "Hero" },
  { id: "magolor", title: "Magolor" },
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
];

export const colors = [
  "#e6194b",
  "#3cb44b",
  "#ffe119",
  "#4363d8",
  "#f58231",
  "#911eb4",
  "#46f0f0",
  "#f032e6",
  "#bcf60c",
  "#fabebe",
  "#008080",
  "#e6beff",
  "#9a6324",
  "#fffac8",
  "#800000",
  "#aaffc3",
  "#808000",
  "#ffd8b1",
  "#000075",
  "#808080",
  "#ffffff",
  "#000000",
];

export const games = [
  {
    title: "Kirby's Return to Dream Land (Deluxe)",
    tracks: [
      {
        videoId: "g_lQuWbLxn0",
        title: "Four Adventurers: Cookie Country",
        sections: [
          { start: 2.9, themes: ["anticipation"] },
          { start: 8.5, themes: ["hero"] },
          { start: 31, themes: ["road"] },
        ],
        duration: 82.5,
      },
      {
        videoId: "pwe4B0Z0aW8",
        title: "The Adventure Begins",
        sections: [
          { start: 2.9, themes: ["adventure"] },
          { start: 20.7, themes: ["hero"] },
          { start: 32.4, themes: ["hero"] },
          { start: 36.7, themes: ["adventure"] },
          { start: 38.2, themes: ["triumph b"] },
        ],
        duration: 48.5,
      },
      {
        videoId: "4EITf3jgfKw",
        title: "Magolor, the Far-Flung Traveler",
        sections: [
          { start: 0.6, themes: ["magolor"] },
          { start: 13.5, themes: ["magolor b"] },
        ],
        duration: 26,
      },
      {
        videoId: "vRS-Fjnv_UM",
        title: "Sky Tower",
        sections: [
          { start: 0, themes: ["star"] },
          { start: 6, themes: ["sky"] },
          { start: 23.9, themes: ["victory"] },
          { start: 44.8, themes: ["road"] },
        ],
        duration: 50.7,
      },
      {
        videoId: "y_G9sQgc7kk",
        title: "The Lor Starcutter Reborn",
        sections: [
          { start: 0, themes: ["anticipation"] },
          { start: 5.8, themes: ["magolor"] },
        ],
      },
      {
        videoId: "b7GxDSzgeck",
        title: "Halcandra: A New Enemy",
        sections: [
          { start: 5.7, themes: ["halcandra"] },
          { start: 18, themes: ["road"] },
          { start: 28.6, themes: ["halcandra b"] },
          { start: 39.8, themes: ["road"] },
          { start: 42.7, themes: ["magolor"] },
          { start: 76, themes: ["hero var"] },
          { start: 98, themes: ["magolor"] },
        ],
      },
      {
        videoId: "sQsGBOlRKNM",
        title: "Dangerous Dinner",
        sections: [
          { start: 0, themes: ["anticipation"] },
          { start: 5.3, themes: ["hero"] },
          { start: 16, themes: ["adventure"] },
          { start: 26.7, themes: ["anticipation"] },
        ],
        duration: 31.9,
      },
      {
        videoId: "vNFs58zdW_4",
        title: "Fly, Kirby!",
        sections: [
          { start: 5.8, themes: ["flight"] },
          { start: 28.2, themes: ["flight"] },
          { start: 51, themes: ["hero"] },
          { start: 62.2, themes: ["flight"] },
          { start: 68, themes: ["triumph"] },
          { start: 70.8, themes: ["hero"] },
        ],
        duration: 79,
      },
      {
        videoId: "irOwhfBpnFU",
        title: "Limitless Power",
        sections: [
          { start: 0.8, themes: ["crown"] },
          { start: 23.4, themes: ["hero"] },
          { start: 33.4, themes: ["crown"] },
          { start: 53.3, themes: ["anticipation"] },
        ],
        duration: 63.3,
      },
      {
        videoId: "U5Jm-diYDCw",
        title: "Road to Victory",
        sections: [
          { start: 3.2, themes: ["road"] },
          { start: 28.7, themes: ["victory"] },
          { start: 54.4, themes: ["road"] },
        ],
        duration: 67,
      },
    ],
  },
];
