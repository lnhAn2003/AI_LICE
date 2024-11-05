// components/searchbar.tsx

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-button bg-backgroundMain text-header"
      />
      <span className="absolute top-0 right-0 mt-2 mr-4 text-button">
        🔍
      </span>
    </div>
  )
}

export default SearchBar
