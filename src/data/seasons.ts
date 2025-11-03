export type Episode = {
  id: string;              // "s1e1"
  title: string;           // название серии
  duration?: string;       // "48м"
  src?: string;            // путь к видео (mp4 / m3u8), можно позже
  thumbnail?: string;      // постер серии (webp)
  description?: string;    // текст описания
};
export type Season = {
  id: number;              // 1..5
  title: string;           // "1 сезон"
  poster: string;          // "/posters/season1.webp"
  episodes: Episode[];
};

export const seasons: Season[] = [
  {
    id: 1,
    title: "1 сезон",
    poster: "https://upload.wikimedia.org/wikipedia/ru/thumb/b/b1/Stranger_Things_season_1.jpg/500px-Stranger_Things_season_1.jpg",
    episodes: [
      {
        id: "s1e1",
        title: "Глава 1: Исчезновение Уилла",
        duration: "48м",
        src: "/video/s1e1.mp4",               // положишь позже; пока можно заглушку
        thumbnail: "/thumbnails/s1e1.webp",
        description: "Вокруг странного исчезновения мальчика начинают происходить необъяснимые события."
      },
      {
        id: "s1e2",
        title: "Глава 2: Странная девочка",
        duration: "55м",
        src: "/video/s1e2.mp4",
        thumbnail: "/thumbnails/s1e2.webp",
        description: "Друзья сталкиваются с таинственной девочкой, обладающей необычными способностями."
      },
      // ...
    ],
  },
  { id: 2, title: "2 сезон", poster: "https://upload.wikimedia.org/wikipedia/ru/thumb/f/f7/Stranger_Things_season_2.jpg/500px-Stranger_Things_season_2.jpg", episodes: [ { id: "s2e1", title: "MADMAX" } ] },
  { id: 3, title: "3 сезон", poster: "https://upload.wikimedia.org/wikipedia/ru/thumb/5/5e/Stranger_Things_season_3.jpg/500px-Stranger_Things_season_3.jpg", episodes: [ { id: "s3e1", title: "Сузи, приём!" } ] },
  { id: 4, title: "4 сезон", poster: "https://upload.wikimedia.org/wikipedia/ru/thumb/7/78/Stranger_Things_season_4.jpg/500px-Stranger_Things_season_4.jpg", episodes: [ { id: "s4e1", title: "Капитан Нина" } ] },
  { id: 5, title: "5 сезон", poster: "https://upload.wikimedia.org/wikipedia/ru/thumb/8/8f/Stranger_Things_season_5.jpg/500px-Stranger_Things_season_5.jpg", episodes: [ { id: "s5e1", title: "TBD" } ] },
];
