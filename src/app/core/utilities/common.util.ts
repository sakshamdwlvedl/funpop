export function sortByPopularity(items: any[]) {
  return items.sort((a, b) => b.popularity - a.popularity) ?? [];
}
