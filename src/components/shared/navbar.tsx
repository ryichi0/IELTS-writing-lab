import Link from 'next/link'
import NavLink from './NavLink'
import Image from 'next/image'

export default function Navbar() {
  const nav_links = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Learn", link: "/learn" },
    { title: "My writings", link: "/writings" },
  ]
  return (
    <nav className="hidden md:flex justify-between items-center bg-surface h-18 px-12 absolute w-full">
      <div className="text-h3 text-primary">IELTS WRITING LAB</div>
      <ul className="flex gap-4">
        {nav_links.map((item, i) => {
          return (
            <li key={i}>
              <NavLink link={item.link} title={item.title} />
            </li>
          )
        })}
      </ul>
      <div>
        <Link href={"/profile"} className="flex gap-3 ">
          <div className="flex flex-col items-end">
            <p className="font-bold" >Alex Mercer</p>
            <span className="text-caption text-foreground-muted font-light">Academic Candidate</span>
          </div>
          <Image src={'/avatar-large.jpg'} alt={"avatar"}
            width={38} height={38} />
        </Link>
      </div>
    </nav>
  )
}
