import React, { useState } from 'react'

const EditAuthor = (props) => {

  const [setBornTo, setYear] = useState(0)
  const [name, setName] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    await props.editAuthor({
      variables: { name, setBornTo }
    })

    setName('')
    setYear(0)
  }
  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        Name:{" "}
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {props.authors.map(author => <option key={author.name} value={author.name}>{author.name}</option>)}
        </select>
        <br></br>
        Birthyear:{" "}
        <input type='Number' value={setBornTo} onChange={({ target }) => setYear(parseInt(target.value))} />
        <br></br>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default EditAuthor