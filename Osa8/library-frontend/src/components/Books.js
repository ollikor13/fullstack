import React from 'react'

const Books = (props) => {
  if (!props.show) {
    return null
  }

  
  if(props.result.data !== undefined){
    const books = props.result.data.allBooks
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
  }else{
    return <div><p>Loading...</p></div>
  }
}

export default Books