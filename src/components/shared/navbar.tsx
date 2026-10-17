import Link from 'next/link'
import NavLink from './NavLink'
import Image from 'next/image'
import { NavUser } from '@/types/auth'
import PrimaryButton from '../ui/PrimaryButton'

export default function Navbar({ user }: { user: NavUser }) {


  return (
    <nav className="hidden md:flex md:w-full justify-between items-center bg-surface h-18 px-12">
      <div className="text-h3 text-primary">IELTS WRITING LAB</div>


      <ul className="flex gap-4">
        <li><NavLink link="/dashboard" title="Dashboard" /></li>
        <li><NavLink link="/Learn" title="Learn" /></li>
        {user && <li><NavLink link="/writings" title="writings" /></li>}
      </ul>


      <div>
        {user ?
        <Link href={"/profile"} className="flex gap-3 ">
          <div className="flex flex-col items-end">
            <p className="font-bold" >{user?.name}</p>
            <span className="text-caption text-foreground-muted font-light">{user?.email}</span>
          </div>
          <div className="bg-primary/30 size-10 rounded-full flex justify-center items-center">{user?.name[0]}</div>
        </Link>
        : 
        <PrimaryButton className="" title={"login / signup"} link={"/login"}/>
        }
      </div>
    </nav>
  )
}
