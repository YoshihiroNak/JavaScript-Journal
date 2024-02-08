import React from 'react'

const ShowEntry = ({ entry }) => {
    return entry ? (
        <>
            <h3>{entry.content}</h3>
            {/* Make category conditional */}
            <p>Posted in {entry.category?.name}</p>
        </>
    ) : (
        <h3>Entry not found</h3>
    )
}

export default ShowEntry