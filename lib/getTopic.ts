export default async function getTopic(topicId: string) {
  const res = await fetch(`http://localhost:3000/api/topic/${topicId}`);

  if (!res.ok) return undefined;

  return res.json();
}
