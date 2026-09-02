// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define a `loader` and `schema` for each collection
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    heroImage: image().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const streamerList = defineCollection({
  loader: file('./src/content/streamers/streamers.yaml'),
  schema: ({ image }) => z.object({
    id: z.string(),
    name: z.string(),
    logo: image(),
    media: z.array(z.object({
      name: z.string(),
      url: z.string().url()
    }))
  })
})

// 5. Export a single `collections` object to register your collection(s)
export const collections = { blog, streamerList };