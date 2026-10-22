export const MIN_WORDS = 150;
export const MAX_CHARS = 5000;

export const countWords = (text: string) =>
  text.trim().split(/\s+/).filter(Boolean).length;