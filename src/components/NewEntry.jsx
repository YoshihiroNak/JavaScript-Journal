import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// categories and addEntry come from App
const NewEntry = ({ categories, addEntry }) => {
    // useParams will take id in path from App to here
    const params = useParams()
    // setEntry will get user input when onChange happens
    const [entry, setEntry] = useState("")
    // nav is the navigation function
    const nav = useNavigate()


    // createEntry occurs when onSubmit happens 
    async function createEntry(e) {
        e.preventDefault()
        // create a new entry
        // addEntry which is function comes from App 
        const id = await addEntry(params.cat_id, entry)
        // 3. Clear input textarea
        // Finally setEntry functes to make it empty
        setEntry('')
        // 4. Redirect the browser to the new entry
        nav(`/entry/${id}`)

    }


    return (
        <>  
            {/* ? -> if {categories[params.cat_id] is truthy, try to access .name */}
            <h3>New entry in category {categories[params.cat_id]?.name}</h3>
            {/* createEntry(sub func) takes onSubmit event */}
            {/* form can fire onSubmit event */}
            <form className="section" onSubmit={createEntry}>
                <div className="field">
                    <label className="label">Content</label>
                    <div className="control">
                        {/* user input{entry} will be value. onChange takes event and setEntry func takes value which is user input  */}
                        {/* Taxtarea takes value from entry   onChange event takes user changes  so 2 ways binding */}
                        <textarea className="textarea" value={entry} onChange={e => setEntry(e.target.value)} placeholder="Type your journal entry here"></textarea>
                    </div>
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-link">Create Entry</button>
                    </div>
                </div>
            </form>
        </>

    )
}

export default NewEntry
