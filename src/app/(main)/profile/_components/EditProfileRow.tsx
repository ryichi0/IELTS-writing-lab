"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import ProfileForm from "./ProfileForm";

type Profile = {
  name: string;
  email: string;
  avatarUrl: string | null;
  targetScore: number | null;
};

export default function EditProfileRow({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full justify-between text-start cursor-pointer"
      >
        <div>
          <p className="font-bold md:text-sm">Edit Profile</p>
          <span className="text-body-sm text-foreground-secondary">
            Update your name, photo and target score
          </span>
        </div>
        <Image
          className="rotate-90 self-center"
          src="/chevron-up.png"
          width={16}
          height={16}
          alt=""
        />
      </button>

      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close(); // کلیک روی بک‌دراپ
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-xl max-h-[90vh] overflow-y-auto rounded-lg p-0 backdrop:bg-black/50"
      >
        {open && <ProfileForm profile={profile} onDone={close} />}
      </dialog>
    </>
  );
}