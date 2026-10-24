"use client";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { updateProfile } from "../actions";
import {
  ACCEPTED_AVATAR_TYPES,
  MAX_AVATAR_MB,
  validateAvatar,
} from "@/lib/avatar-rules";

type Props = {
  profile: {
    name: string;
    email: string;
    avatarUrl: string | null;
    targetScore: number | null;
  };
  onDone?: () => void;
};

const BANDS = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9];

export default function ProfileForm({ profile, onDone }: Props) {
  const [state, action, pending] = useActionState(updateProfile, undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const shownAvatar = preview ?? profile.avatarUrl;

  useEffect(() => {
    if (state?.success) onDone?.();
  }, [state, onDone]);

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const file = input.files?.[0];

    if (preview) URL.revokeObjectURL(preview);

    if (!file) {
      setPreview(null);
      setFileError(null);
      return;
    }

    const error = validateAvatar(file);
    if (error) {
      input.value = ""; // فایل نامعتبر از فرم حذف می‌شود
      setPreview(null);
      setFileError(error);
      return;
    }

    setFileError(null);
    setPreview(URL.createObjectURL(file));
  }

  return (
    <form action={action} className="bg-surface flex flex-col gap-6 p-4 md:p-8 rounded-lg">
      <h2 className="text-h4 font-bold">Edit profile</h2>

      {state?.error && (
        <p role="alert" className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          {shownAvatar ? (
            <Image
              src={shownAvatar}
              alt="Your photo"
              width={80}
              height={80}
              unoptimized={Boolean(preview)}
              className="size-20 rounded-full object-cover border border-border"
            />
          ) : (
            <div className="size-20 rounded-full bg-border flex items-center justify-center text-2xl font-bold">
              {profile.name.charAt(0).toUpperCase()}
            </div>
          )}

          <label className="cursor-pointer rounded-md border border-border px-4 py-2 text-sm font-bold">
            Change photo
            <input
              type="file"
              name="avatar"
              accept={ACCEPTED_AVATAR_TYPES.join(",")}
              onChange={onPick}
              className="hidden"
            />
          </label>
        </div>

        {fileError ? (
          <p role="alert" className="text-sm text-red-600">{fileError}</p>
        ) : (
          <p className="text-sm text-foreground-muted">
            JPG, PNG or WebP, up to {MAX_AVATAR_MB} MB.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-bold">Name</label>
        <input
          id="name"
          name="name"
          defaultValue={profile.name}
          maxLength={50}
          className="w-full rounded-md border border-border px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-bold">Email</label>
        <input
          id="email"
          value={profile.email}
          disabled
          className="w-full rounded-md border border-border bg-border/40 px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="targetScore" className="font-bold">Target IELTS band</label>
        <select
          id="targetScore"
          name="targetScore"
          defaultValue={profile.targetScore === null ? "" : String(profile.targetScore)}
          className="w-full rounded-md border border-border px-3 py-2"
        >
          <option value="">Not set</option>
          {BANDS.map((b) => (
            <option key={b} value={String(b)}>{b.toFixed(1)}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-2 md:justify-end">
        <button
          type="button"
          onClick={onDone}
          disabled={pending}
          className="py-3 px-6 rounded-lg font-bold border border-border"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={pending}
          className="bg-primary text-surface py-3 px-6 rounded-lg font-bold hover:shadow-card disabled:opacity-50"
        >
          {pending ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}