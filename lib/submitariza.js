// lib/submitariza.js
export default async function submitAriza(values) {
  const formData = new FormData();
  for (const key in values) {
    formData.append(key, values[key]);
  }

  const response = await fetch("/api/ariza", {
    method: "POST",
    body: formData,
  });

  return response;
}
