'use client'
import PrimaryButton from '@/components/ui/PrimaryButton'
import SecondaryButton from '@/components/ui/SecondaryButton'
import React, { useActionState, useState } from 'react';
import { saveWriting } from '../actions';


export default function WritingForm({ topicId }: { topicId: string }) {
  const [state, action, pending] = useActionState(saveWriting, undefined);
  const [content, setContent] = useState("");
  const words = content.trim().split(/\s+/).filter(Boolean).length;


  return (
    <form action={action} className="flex flex-col md:gap-6 gap-4 ">
      <input type="hidden" name="topicId" value={topicId} />

      {state?.error && (
        <p role="alert" className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.error}
        </p>
      )}


      <textarea
        value={content}
        onChange={e => setContent(e.target.value)} 
        rows={14}
        maxLength={5000}
        placeholder="Write your answer here..."
        className="w-full md:h-140 h-80 border border-primary rounded-lg p-3 md:p-6"
        name="content"
        id="">
      </textarea>


      <div className="flex flex-col md:flex-row gap-2 items-stretch md:justify-between md:items-center">
        <p className="font-light text-foreground-muted ">
          <span className="text-primary font-bold">{words}</span> / <span className="text-primary font-bold">150</span> words</p>
        <div className="flex md:flex-row flex-col gap-2">
          <button className=" bg-primary text-surface py-3 px-6 rounded-lg font-bold hover:shadow-card text-center cursor-pointer" type="submit" disabled={pending}>
            {pending ? "Saving..." : "Submit"}
          </button>
        </div>
      </div>

    </form>
  )
}
