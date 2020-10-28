import React, { useState } from "react"

// This is the search bar. The computation for the search is in the useMemo() function in src/components/Search.js
const SearchTable = ({onSearch}) => {
  const [search , setSearch] = useState('')

  console.log(onSearch)

  const onInputChange = (value) => {
    setSearch(value)
    onSearch(value)
  }
     return(
        <input 
        className="container"
        size="50"
        placeholder="Search By Name..."
        type="text" 
        value={search} 
        onChange = {(e) => onInputChange(e.target.value)}
        
      />
    )
}

export default SearchTable
