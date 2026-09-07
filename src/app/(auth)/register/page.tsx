import PrimaryButton from '@/components/ui/PrimaryButton'
import PrimaryLink from '@/components/ui/PrimaryLink'
import Image from 'next/image'
import React from 'react'

export default function Register() {
  return (
    <>
      <div className="flex flex-col gap-3 items-center">
        <Image src={"/auth-logo.svg"} alt={"logo"} width={48} height={48} />
        <div>
          <h1 className="text-black font-black text-xl text-center">Welcome to IELTS Writing Lab</h1>
          <p className="text-foreground-secondary text-body">Clean, focused practice for Task 1 candidates.</p>
        </div>
      </div>
      <form action="">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-black font-bold" htmlFor="">Username</label>
            <input className="border border-border p-3 rounded-md" type="text" name="" id="" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black font-bold" htmlFor="">Email Address</label>
            <input className="border border-border p-3 rounded-md" placeholder='alex.mercer@candidate.com' type="email" name="" id="" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black font-bold" htmlFor="">Password</label>
            <input className="border border-border p-3 rounded-md" type="password" name="" id="" />
          </div>
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <PrimaryButton title={'Register'} link={'/dashboard'} className={''} />
          <p className="text-foreground-secondary self-center ">Already have an account? <PrimaryLink className={''} title={'Sign In'} link={"/login"} /></p>
        </div>
      </form>
    </>
  )
}
