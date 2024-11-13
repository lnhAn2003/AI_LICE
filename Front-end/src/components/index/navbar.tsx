import Link from 'next/link'

const NavBar = () => {
  return (
    <nav className="flex space-x-4">
      <Link href="/" className="text-textWhite hover:text-link">
        Home
      </Link>
      <Link href="/threads" className="text-textWhite hover:text-link">
        Threads
      </Link>
      <Link href="/shared-games" className="text-textWhite hover:text-link">
        Shared Games
      </Link>
      <Link href="/ai-assistance" className="text-textWhite hover:text-link">
        AI Assistance
      </Link>
      <Link href="/courses" className="text-textWhite hover:text-link">
        Courses
      </Link>
      <Link href="/profile" className="text-textWhite hover:text-link">
        Profile
      </Link>
    </nav>
  )
}

export default NavBar
