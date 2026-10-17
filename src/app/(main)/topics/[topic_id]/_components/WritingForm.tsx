'use client'
import PrimaryButton from '@/components/ui/PrimaryButton'
import SecondaryButton from '@/components/ui/SecondaryButton'
import React, { useState } from 'react';


export default function WritingForm() {
  const [content, setContent] = useState("");
  const [savingStatus, setSavingStatus] = useState<
  "DRAFT" | "SUBMITTED" | null
>(null);

console.log();

  async function handleSave(status: "DRAFT" | "SUBMITTED") {
    setSavingStatus(status);


    try {
      const res = await fetch('/api/writings', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          userId: "cmubhrao700000rg97yj8qq83",
          topicId: "cmu2y4bqd00006jg9ro10tukf",
          status,
        })
      })

      const data = await res.json()
      console.log('this is the data' + data);

    } catch (error) {
      console.error("Save writing error:", error);
    } finally {
      setSavingStatus(null)
      setContent("")
    }
  }
  return (
    <form className="flex flex-col md:gap-6 gap-4 ">
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder='The bar chart compares the percentage of water consumption across three main sectors—domestic, industrial, and agricultural—in four selected countries: the United States, Australia, the United Kingdom, and Japan'
        className="w-full md:h-140 h-80 border border-primary rounded-lg p-3 md:p-6" name="" id="">
      </textarea>
      <div className="flex flex-col md:flex-row gap-2 items-stretch md:justify-between md:items-center">
        {/* <p className="font-light text-foreground-muted "><span className="text-primary font-bold">72</span> / <span className="text-primary font-bold">150</span> words</p> */}
        <div className="flex md:flex-row flex-col gap-2">
          <button className=" bg-primary text-surface py-3 px-6 rounded-lg font-bold hover:shadow-card text-center cursor-pointer" type="button" onClick={() => handleSave("DRAFT")}>
            {savingStatus === "DRAFT" ? "Saving..." : "Save draft"}
          </button>
          <button className=" bg-primary text-surface py-3 px-6 rounded-lg font-bold hover:shadow-card text-center cursor-pointer" type="button" onClick={() => handleSave("SUBMITTED")}>
            {savingStatus === "SUBMITTED" ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </form>
  )
}
