import React from 'react'

const Search = ({search, searchInput, handleSearch}) => {
  return (
    <div className="Search">
      <input 
        placeholder='Buscar...' 
        ref={searchInput} type="text" 
        value={search} 
        onChange={handleSearch} />
    </div>
  )
}

export default Search;
