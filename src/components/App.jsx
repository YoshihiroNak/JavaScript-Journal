import React, { useEffect, useState } from 'react'
import Home from './Home'
import CategorySelection from './CategorySelection'
import NewEntry from './NewEntry'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import NavBar from './NavBar'
import ShowEntry from './ShowEntry'

const App = () => {
  // This categories is sent to CategorySelection and NewEnry as a prop
  const [categories, setCategories] = useState([])
  //useState(Represent Data structure (2 keys))
  //user input will be into array as object
  const [entries, setEntries] = useState([])

  useEffect(() =>{
    fetch('http://127.0.0.1:4001/categories')
      .then(res => res.json())
      .then(data => setCategories(data))

    fetch('http://127.0.0.1:4001/entries')
      .then(res => res.json())
      .then(data => setEntries(data))
  }, [])


// addEntry func is used to add a new entry and this func is called from createEntry in NewEntry
  async function addEntry(cat_id, content) {//Originally cat_id = params.cat_id, content = entry in NewEntry
            const newId = entries.length
            // 1. Create a entry object from user input
            const newEntry = {
              category: categories[cat_id]._id,
              content: content
          }
          // POST new entry to API
          const res = await fetch('http://127.0.0.1:4001/entries', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEntry)
          })
          const data = await res.json()
          setEntries([...entries, data])

          // 2. Add new entry to the entries list
          // Triple dots is a spread operator
            // setEntries functes to update entries
          // Back to addEntry(in createEntry) as an Id
          return newId
  }
  // Higher Order Component
  function ShowEntryWrapper() {
    const { id } = useParams()
    return <ShowEntry entry={entries[id]} />
  }

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home entries={entries} />} />
          {/* Send categories to CategorySelector */}
          <Route path='/category' element={<CategorySelection categories={categories} entries={entries} />} />
          <Route path='/entry'>
            <Route path=':id' element={<ShowEntryWrapper />} /> {/*Pass in the func as addEntry. So it's func call*/}
            <Route path='new/:cat_id' element={<NewEntry categories={categories} addEntry={addEntry} />} />
          </Route>
          <Route path='*' element={<h3>Page not found</h3>} />
        </Routes>
      </BrowserRouter>
      {/* <Home />
      <CategorySelection />
      <NewEntry /> */}
    </>
    )
}

export default App