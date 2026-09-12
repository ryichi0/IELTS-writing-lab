import Image from 'next/image'
import React from 'react'
import ProfileStatics from './_components/ProfileStatics'

export default function Profile() {
  return (
    <section className="flex flex-col md:flex-row gap-5 md:gap-8 md:items-start">
      <div className="p-5 md:p-8 flex flex-col gap-4 md:gap-6 items-center bg-surface rounded-lg border border-border md:flex-3 md:min-w-100 ">
        <Image src={'/avatar-large.jpg'} alt={"avatar"}
          width={120} height={120} />

        <div>
          <p className="text-h2 text-center">Alex Mercer</p>
          <small className="text-body text-foreground-secondary">alex.mercer@candidate.com</small>
        </div>
        <div className="border-t border-border w-full "></div>
        <div className="w-full">
          <div className="flex justify-between mb-2">
            <span className="text-foreground-muted text-body">MEMBER SINCE</span>
            <span className="font-bold">September 12, 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground-muted text-body">TARGET SCORE</span>
            <span className="font-bold text-primary">Band 7.5</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 md:flex-3/5 ">
        <div className="md:bg-surface rounded-lg md:border border-border md:p-8 flex flex-col md:gap-5">
          <h4 className="hidden md:block text-h4 font-bold">Practice Performance Summary</h4>
          <div className="grid grid-cols-3 gap-2">
            <ProfileStatics statics={"14"} title={"Attempts"} />
            <ProfileStatics statics={"2.4K"} title={"Total words"} />
            <ProfileStatics statics={"4 Days"} title={"Streak"} />
          </div>
        </div>
        <div className="p-4 md:p-8 flex flex-col gap-4 md:gap-6 bg-surface rounded-lg border border-border">
          <h4 className="text-foreground-muted text-h4 font-bold md:text-black">Account Preferences</h4>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <div>
                <p className="font-bold md:text-sm">Change Password</p>
                <span className="text-body-sm text-foreground-secondary">Keep your account highly secure</span>
              </div>
              <Image className="rotate-90 self-center" src={"/chevron-up.png"} width={16} height={16} alt={'chevron'} />
            </div>
            <div className="border-t border-border w-full "></div>
            <div className="flex justify-between">
              <div>
                <p className="font-bold md:text-sm">Daily Notifications</p>
                <span className="text-body-sm text-foreground-secondary">Get prompt alerts of the day</span>
              </div>
              <Image className="rotate-90 self-center" src={"/chevron-up.png"} width={16} height={16} alt={'chevron'} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
