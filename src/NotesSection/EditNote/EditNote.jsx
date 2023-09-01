import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UseNotes from '../../Hooks/UseNotes';
import './EditNote.css'
import {  Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import {  SaveAs } from '@mui/icons-material';
const EditNote = () => {
    const { id } = useParams();
    const [newData, setNewData] = useState([]);
    const [notes, refetch, isLoading] = UseNotes();
    const navigate = useNavigate();
    
    useEffect(() => {
        const found = notes.filter((note) => note._id === id);
        setNewData(found);
    }, [id, notes]);

   

    const handleEditClick = (index) => {
        const updatedData = [...newData];
        updatedData[index].isEditing = true;
        updatedData[index].editedTitle = updatedData[index].title; // Initialize editedTitle
        updatedData[index].editedDetails = updatedData[index].details; // Initialize editedDetails
        setNewData(updatedData);
    };

    const handleInputChange = (index, field, value) => {
        const updatedData = [...newData];
        updatedData[index][field] = value;
        setNewData(updatedData);
    };

    const handleSaveClick = async (index) => {
        const editedNote = newData[index];
        const response = await fetch(`https://likho-server.onrender.com/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: editedNote.editedTitle,
                details: editedNote.editedDetails,
            }),
        });

        if (response.ok) {
            const updatedData = [...newData];
            updatedData[index].title = editedNote.editedTitle;
            updatedData[index].details = editedNote.editedDetails;
            updatedData[index].isEditing = false;
            setNewData(updatedData);
        }

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your Changes has been saved',
            showConfirmButton: false,
            timer: 1500
        })
    };

    if (isLoading) {
        return <Spinner animation="border" variant="success" />;
    }

    const handleDelete = (notes) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then(result => {
                if (result.isConfirmed) {
                    axios.delete(`https://likho-server.onrender.com/note/${id}`)
                        .then(res => {
                            if (res.data.deletedCount === 1) {
                                refetch();
                                Swal.fire(
                                    'Deleted!',
                                    'You successfully deleted your note.',
                                    'success'
                                )
                                refetch();

                                navigate('/');
                            }


                        })


                }

            })
    }

    const [note, setNote] = React.useState({
        editedDetails: '',
    });

    const HandleTextArea = (index, field, value) => {
        const updatedData = [...newData];
        updatedData[index][field] = value;
        setNewData(updatedData);

        // Automatically adjust textarea height
        const textarea = document.getElementById(`details-textarea-${index}`);
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = (textarea.scrollHeight) + 'px';
        }
    };

    

    return (
        <div className="notepad , tiro-bangla">
            {newData.map((note, index) => (
                <div key={index} className={`note ${note.isEditing ? 'editing' : ''}`}>
                    {note.isEditing ? (
                        <div className="editing-container">
                            {/* Existing title input */}
                            <input
                                type="text"
                                value={note.editedTitle}
                                onChange={(e) => handleInputChange(index, 'editedTitle', e.target.value)}
                                className="title-input"
                            />
                            {/* New editedDetails textarea */}
                            <textarea
                                id={`details-textarea-${index}`} // Add this line to set a unique id for each textarea
                                value={note.editedDetails}
                                onChange={(e) => HandleTextArea(index, 'editedDetails', e.target.value)}
                                className="details-input"
                                placeholder="Enter your note here"
                                ref={textarea => {
                                    if (textarea) {
                                        textarea.style.height = 'auto';
                                        textarea.style.height = (textarea.scrollHeight) + 'px';
                                    }
                                }}
                            />
                            {/* Existing buttons */}
                            <div className="buttons-container">
                                <button onClick={() => handleSaveClick(index)} className="save-button">
                                    <SaveAs />
                                </button>
                                <button onClick={() => handleDelete(notes)} className="delete-button">
                                    <AiOutlineDelete />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div onClick={() => handleEditClick(index)} className="view-mode">
                            <div className="title">{note.title}</div>
                            <div className="details">{note.details}</div>
                        </div>
                    )}
                </div>
            ))}
        </div>

    );
};

export default EditNote;
