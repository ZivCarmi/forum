export default async function getCategory(categoryId: string) {
  const res = await fetch(`http://localhost:3000/api/category/${categoryId}`);

  if (!res.ok) return undefined;

  return res.json();
}
