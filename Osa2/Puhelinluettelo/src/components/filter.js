import React from 'react'

const Filter = ({newFilter, setNewFilter, setShowAll}) => {

    const handleFilterChange = (event) => {
      setNewFilter(event.target.value)
      setShowAll(false)
    }
    
        return(
            <div>
              Filter shown with: <input value={newFilter} onChange={handleFilterChange} />
            </div>
        )
    }

export default Filter