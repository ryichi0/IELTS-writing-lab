'use client'
import { countWords, MAX_CHARS, MIN_WORDS } from '@/lib/writing-rules'
import React, { useActionState, useEffect, useState } from 'react'
import { updateWriting } from '../actions'

export default function UpdateWritingMode({ writing }: any) {
  const [editMode, setEditMode] = useState(false)
  const [content, setContent] = useState(writing.content)
  const [state, action, pending] = useActionState(updateWriting, undefined)

  
  useEffect(() => {
    if (state?.success) setEditMode(false)
  }, [state])

  function cancel() {
    setContent(writing.content)
    setEditMode(false)
  }
  function handleEditMode() {
    setEditMode(prev => !prev)
  }
  return (
    <>
      <div className="bg-surface flex flex-col md:gap-6 gap-4 md:p-8 p-4 rounded-lg shadow-card border border-border">
        <div className="flex flex-col gap-6 justify-between">
          <div className={`flex ${editMode ? "flex-col items-start" : "flex-row"} justify-between items-center`}>
            <p className="font-bold">Your Response</p>
            <p className={`${editMode ? "block" : "hidden"} text-foreground-secondary text-body-sm `}>Continue your draft below. Save your changes before leaving.</p>
            <button className={`${editMode ? "hidden" : "inline"} bg-primary text-surface py-3 px-6 rounded-lg font-bold hover:shadow-card text-center cursor-pointer`} onClick={handleEditMode}>Edit writing</button>
          </div>
          {/* <PrimaryButton className="hidden md:inline" title="Edit writing" link={''} /> */}
          <div className="w-full border-t border-border "></div>
          {editMode

            ?
            <form action={action} className="flex flex-col md:gap-6 gap-4 ">
              <input type="hidden" name="id" value={writing.id} />

              {state?.error && (
                <p role="alert" className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {state.error}
                </p>
              )}

              <textarea
                defaultValue={content}
                onChange={e => setContent(e.target.value)}
                rows={14}
                maxLength={MAX_CHARS}
                placeholder="Write your answer here..."
                className="w-full md:h-140 h-fit border border-primary rounded-lg p-4 md:p-6"
                name="content"
                id="">
              </textarea>

              <div className="flex flex-col md:flex-row gap-2 items-stretch md:justify-between md:items-center">
                <p className="font-light text-foreground-muted ">
                  <span className="text-primary font-bold">{countWords(content)}</span> / <span className="text-primary font-bold">{MIN_WORDS}</span> words</p>
                <div className="flex md:flex-row flex-col gap-2">
                  <button className=" bg-primary text-surface py-3 px-6 rounded-lg font-bold hover:shadow-card text-center cursor-pointer" type="submit" disabled={pending}>
                    {pending ? "Saving..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>


            :
            <>
              <p className="text-foreground text-body">{writing.content}</p>
            </>

          }

        </div>
      </div>

    </>
  )
}
