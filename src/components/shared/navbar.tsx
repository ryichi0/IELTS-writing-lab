import Link from 'next/link'
import NavLink from './NavLink'

export default function Navbar() {
  const nav_links = [
    { title: "Dashboard", link: "/dashboard" },
    { title: "Learn", link: "/learn" },
    { title: "My writings", link: "/writings" },
  ]
  return (
    <nav className="hidden md:flex justify-between items-center bg-surface h-18 px-12">
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
        <Link href={"/profile"}>Profile</Link>
      </div>
    </nav>
  )
}
