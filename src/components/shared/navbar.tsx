import Link from 'next/link'
import NavLink from './NavLink'
import { NavUser } from '@/types/auth'
import PrimaryButton from '../ui/PrimaryButton'
import LogoutButton from './LogoutButton'
import Image from 'next/image'

export default function Navbar({ user }: { user: NavUser }) {


  return (
    <nav className="hidden md:flex md:w-full justify-between items-center bg-surface h-18 px-12">
      <div className="text-h3 text-primary flex gap-2">
        <Image src="/auth-logo.svg" width="25" height="25" alt="ielts writing lab logo" />
        <span>IELTS WRITING LAB</span>
      </div>


      <ul className="flex gap-4">
        <li><NavLink link="/dashboard" title="Dashboard" /></li>
        <li><NavLink link="/learn" title="Learn" /></li>
        {user && <li><NavLink link="/writings" title="writings" /></li>}
      </ul>


      <div>
        {user ?
          <div className="flex gap-3">
            <Link href={"/profile"}>
              <div className="flex flex-col items-end">
                <p className="font-bold" >{user?.name}</p>
                <span className="text-caption text-foreground-muted font-light">{user?.email}</span>
              </div>
            </Link>
            <LogoutButton />
          </div>
          :
          <PrimaryButton className="" title={"login / signup"} link={"/login"} />
        }
      </div>
    </nav>
  )
}
