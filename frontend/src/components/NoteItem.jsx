import React from 'react'
import { Link } from 'react-router-dom';

const NoteItem = ({ note }) => {
    return (
        <div>
            <Link to={`notes/${note.id}`}>
                id : {note.id} <br /> note : {note.body}
            </Link>
        </div>
    )
}

export default NoteItem