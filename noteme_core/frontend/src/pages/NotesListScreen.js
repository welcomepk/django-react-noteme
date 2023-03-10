import React, { useEffect, useState } from 'react';
import NoteItem from '../components/NoteItem';
import AddButton from '../components/AddButton';

const NotesListScreen = () => {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        console.log("list is mounted")
        getNotes();
    }, []);

    const getNotes = async () => {
        let response = await fetch("api/notes/");
        let data = await response.json();
        // console.log(data);
        setNotes(data);
    }

    return (
        <div className='notes'>
            <div className='notes-header'>
                <h2 className='notes-title'>&#9782; Noteme</h2>
                <p className='notes-count'>{notes.length}</p>
            </div>
            <div className='notes-list'>
                {notes.map(note =>
                    <div key={note.id} className='notes-list-item'>
                        <NoteItem note={note} />
                    </div>

                )}
            </div>
            <AddButton />
        </div>
    )
}

export default NotesListScreen