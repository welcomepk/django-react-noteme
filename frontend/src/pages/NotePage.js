import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg"
import { ReactComponent as UpdateIcon } from "../assets/update.svg"
import serverUrl from "../constants/ApiData"
import { usePrevious } from '../customeHooks/usePrevious'

const NotePage = ({ match, history }) => {

    const [note, setNote] = useState(null);
    // const [preNote, setPreNote] = useState(note);
    const [csrfToken, setCsrfToken] = useState("");
    const prevNoteBody = useRef();
    let noteId = match.params.id;

    useEffect(() => {

        if (noteId != 'new')
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
                ...pre,
                body: value,
            }
        })
    }

    const createNote = async () => {

        const response = await fetch(`${serverUrl.url}/api/notes/create`, {
            method: "POST",
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

    const updateNote = async () => {

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

    const deleteNote = async () => {
        const response = await fetch(`${serverUrl.url}/api/notes/${noteId}/delete`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": csrfToken,
            },
        });

        if (!response.ok) {
            // history.push("/");
            throw new Error("Request failed");
        }
    }

    const handleDelete = () => {
        if (noteId !== 'new') {
            deleteNote();
        }
        history.push("/");
    }

    const handleCreate = () => {
        if (noteId === 'new' && note?.body) {
            createNote();
        } else {
            alert("Plz add something to create a Note ...")
            return;
        }
        history.push("/");
    }
    const handleUpdate = () => {
        if (noteId !== 'new') {
            updateNote();
        }
        history.push("/");

    }


    useEffect(() => {
        prevNoteBody.current = note?.body;
    }, [note])

    const handleExit = () => {


        /*console.log(prevNoteBody.current === note?.body);
        if (prevNoteBody.current === note?.body) {
            console.log("existing without updating");
            history.push("/");
        } else {
            console.log("updating note");
            updateNote();
        }
        history.push("/");
        */

        if (noteId === "new" && note?.body) {
            createNote();
        } else {
            // updateNote();
        }
        history.push("/");

    }


    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <ArrowLeft onClick={handleExit} />
                </h3>
                {
                    (noteId !== 'new')
                        ? <button onClick={handleDelete}>DELETE</button>
                        : <button onClick={handleCreate}>CREATE</button>
                }
            </div>
            <textarea onChange={onNoteChange} value={note?.body} />

            {
                (noteId !== 'new')
                    ? <button className='floating-button update-floating-button' onClick={handleUpdate}> <UpdateIcon /> </button>
                    : ""
            }
            {/* <p>{(prevNoteBody.current === note?.body) ? "you can exit without update call" : "update first"}</p> */}
        </div>
    )
}

export default NotePage