// src/data/catalog.ts
export type Source = { src: string; type?: string };
export type Track = { src: string; label: string; srclang?: string; default?: boolean };

export type Episode = {
  id: string;
  slug: string;          // для URL
  number: number;
  title: string;
  description?: string;
  durationSec?: number;
  poster?: string;
  sources: Source[];
  subtitles?: Track[];
};

export type Season = {
  id: string;
  slug: string;          // для URL
  number: number;
  title: string;
  episodes: Episode[];
};

const catalog: { seasons: Season[] } = {
  seasons: [
    {
      id: 's1',
      slug: 's1',
      number: 1,
      title: 'The Vanishing',
      episodes: [
        {
          id: 's1e1',
          slug: 'e1',
          number: 1,
          title: 'Pilot',
          description: 'Hawkins. Всё только начинается…',
          durationSec: 60 * 50,
          poster: '/static/posters/s1e1.jpg',
          sources: [
            { src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', type: 'application/x-mpegURL' },
            { src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', type: 'video/mp4' }
          ],
          subtitles: [{ src: '/static/subs/s1e1_en.vtt', label: 'English', srclang: 'en', default: true }]
        },
        {
          id: 's1e2',
          slug: 'e2',
          number: 2,
          title: 'The Weirdo on Maple Street',
          durationSec: 60 * 48,
          poster: '/static/posters/s1e2.jpg',
          sources: [{ src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', type: 'application/x-mpegURL' }]
        }
      ]
    },
    {
      id: 's2',
      slug: 's2',
      number: 2,
      title: 'New Threats',
      episodes: [
        {
          id: 's2e1',
          slug: 'e1',
          number: 1,
          title: 'MADMAX',
          durationSec: 60 * 51,
          poster: '/static/posters/s2e1.jpg',
          sources: [{ src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', type: 'application/x-mpegURL' }]
        }
      ]
    }
  ]
};

export default catalog;
