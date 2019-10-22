import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (event) => {
        props.changeFilter(event.target.value)
    }

    const style = {
        marginBottom: 10
    }
    return(
        <div style={style}>
            <form onChange={handleChange}>Filter<input name="Filter" /></form>
        </div>
    )
}
  
export default connect(null, { changeFilter }
)(Filter)