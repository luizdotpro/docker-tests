import React, { useState } from 'react'
import axios from 'axios'

export default function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([])
  const [values, setValues] = useState({})
  const [index, setIndex] = useState('');

  const fetchValues = async () => {
    const values = await axios.get('/api/values/current')
    setValues(values.data)
  }

  const fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all')
    setSeenIndexes(seenIndexes.data)
  }

  const renderSeenIndexes = () => seenIndexes.map(({ number }) => number).join(', ')

  renderValues = () => {
    const entries = []
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      )
    }
    return entries
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', {
      index
    })
    setIndex('')
    return entries;
  }

  useEffect(() => {
    fetchValues()
    fetchIndexes()
    return
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Enter your index: </label>
        <input
          value={index}
          onChange={event => setIndex(event.target.value)} />
        <button> Submit </button>
      </form>
      <h3> Indexes I have seen: </h3>
      {renderSeenIndexes()}
      <h3> Calculated values: </h3>
      {renderValues()}
    </div>
  )
}
