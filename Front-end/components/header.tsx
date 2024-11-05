// components/header.tsx

import Logo from './logo'
import SearchBar from './searchbar'
import NavBar from './navbar'

const Header = () => {
  return (
    <header className="bg-header text-textWhite shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <Logo />
        <SearchBar />
      </div>
      <div className="bg-header">
        <div className="max-w-7xl mx-auto py-2 px-6">
          <NavBar />
        </div>
      </div>
    </header>
  )
}

export default Header
