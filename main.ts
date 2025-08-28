import { ANILIST_BASE_URL, QUERY } from "./consts.ts";

/*
export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}
*/

/** Returns all anime which have a specified start date
 * @param mediaList - list of media objects returned from the AniList API
 * @returns list of media objects which have a specified start date
 */

function getFilteredAnime(mediaList) {
  const filteredAnime = [];
  for (const anime of mediaList) {
    if (anime.startDate.day != null) {
      filteredAnime.push(anime);
    }
  }
  return filteredAnime;
}

const response = await fetch(ANILIST_BASE_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  body: JSON.stringify({
    query: QUERY,
  }),
});
let mediaList = await response.json();
mediaList = mediaList.data.Page.media;

const filteredAnime = getFilteredAnime(mediaList);

console.log(filteredAnime);
