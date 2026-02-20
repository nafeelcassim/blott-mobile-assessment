export function formatNewsDate(datetime: number) {
  return new Date(datetime * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
