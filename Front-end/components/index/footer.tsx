import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="max-w-7xl mx-auto flex justify-center space-x-6">
        <Link href="/about" className="hover:text-white">About Us</Link>
        <Link href="/contact" className="hover:text-white">Contact</Link>
        <Link href="/terms" className="hover:text-white">Terms of Service</Link>
        <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
      </div>
    </footer>
  )
}

export default Footer
