import { generateTopicForDate } from "../src/lib/topic-generator/generate";

const date = process.argv[2] ?? new Date().toISOString().slice(0, 10);

generateTopicForDate(date)
  .then((t) => console.log(JSON.stringify(t, null, 2)))
  .catch((e) => console.error("FAILED:", e.message));