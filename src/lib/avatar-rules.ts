export const MAX_AVATAR_BYTES = 2 * 1024 * 1024; // 2 MB
export const MAX_AVATAR_MB = MAX_AVATAR_BYTES / (1024 * 1024);

export const AVATAR_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

export const ACCEPTED_AVATAR_TYPES = Object.keys(AVATAR_EXTENSIONS);

// پیام خطا برای فایل نامعتبر، یا null اگر مشکلی نیست
export function validateAvatar(file: { type: string; size: number }) {
  if (!AVATAR_EXTENSIONS[file.type]) {
    return "Photo must be a JPG, PNG or WebP image.";
  }
  if (file.size > MAX_AVATAR_BYTES) {
    return `Photo is too large. The maximum size is ${MAX_AVATAR_MB} MB.`;
  }
  return null;
}