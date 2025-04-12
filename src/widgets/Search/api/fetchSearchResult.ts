export async function fetchSearchResult(
  q: string,
  setResults: React.Dispatch<React.SetStateAction<any[]>>
) {
  if (!q) {
    setResults([]);
    return;
  }
  try {
    const res = await fetch(`/api/search?query=${encodeURIComponent(q)}`);
    if (!res.ok) throw new Error("Network response was not ok");
    const { results } = await res.json();
    console.log("Search results:", results);
    setResults(results);
  } catch (err) {
    console.error(err);
  }
}
