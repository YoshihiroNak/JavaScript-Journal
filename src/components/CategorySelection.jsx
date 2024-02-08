import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CategorySelection = ( { categories } ) => {

    return (
        <>
            <h3>Please select a category:</h3>
            <ul>
                {  
                    categories.map((cat, index) =>(
                        // cat is a whole object
                        <li key={index}>
                            {/* ${index} will be cat_id in App */}
                            <Link to={`/entry/new/${index}`}>{cat.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default CategorySelection