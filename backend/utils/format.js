export function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function scoreLabel(score) {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good Performance";
  if (score >= 50) return "Needs Improvement";
  return "Needs Work";
}

export function truncate(text, max) {
  return text.length > max ? `${text.slice(0, max).trimEnd()}...` : text;
}