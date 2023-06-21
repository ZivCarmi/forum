export default async function getForum(forumId: string) {
  const res = await fetch(`http://localhost:3000/api/forum/${forumId}`);

  if (!res.ok) return undefined;

  return res.json();
}
