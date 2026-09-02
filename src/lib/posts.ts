import { getCollection } from "astro:content";

export async function getSortedPosts() {
  return (await getCollection('blog'))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}