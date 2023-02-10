import React, { useEffect, useState } from 'react'
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg"
import serverUrl from "../constants/ApiData"

const NotePage = ({ match, history }) => {

    const [note, setNote] = useState(null);
    const [csrfToken, setCsrfToken] = useState("");
    let noteId = match.params.id;

    useEffect(() => {
        getNote();
        const fetchCsrfToken = async () => {
            const response = await fetch("http://localhost:8000/api/csrf/");

            if (!response.ok) {
                throw new Error("Request failed");
            }

            const data = await response.json();
            setCsrfToken(data.csrf_token);
        };

        fetchCsrfToken();
    }, []);




    const getNote = async () => {
        const res = await fetch(`/api/notes/${noteId}`)
        const data = await res.json();
        // console.log(data)
        setNote(data)
    }

    const onNoteChange = (e) => {
        const value = e.target.value;
        setNote((pre) => {
            return {
                ...note,
                body: value,
            }
        })
    }
    const updateNote = async (e) => {

        const response = await fetch(`${serverUrl.url}/api/notes/${noteId}/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken,
            },
            body: JSON.stringify(note),
        });

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();
        console.log(data);

    }

    const handleExit = () => {
        updateNote();
        history.push("/");
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <ArrowLeft onClick={handleExit} />
                </h3>
            </div>
            <textarea onChange={onNoteChange} defaultValue={note?.body}>
                {/* {note?.body} */}
            </textarea>
            <button onClick={updateNote}> submit </button>
            <p>{note?.body}</p>
        </div>
    )
}

export default NotePage