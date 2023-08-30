import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UseNotes from '../../Hooks/UseNotes';
import './EditNote.css'
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { AiOutlineDelete } from 'react-icons/ai';
import axios from 'axios';
import { SaveAltOutlined, SaveAs } from '@mui/icons-material';

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
        setNewData(updatedData);
    };

    const handleInputChange = (index, field, value) => {
        const updatedData = [...newData];
        updatedData[index][field] = value;
        setNewData(updatedData);
    };

    const handleSaveClick = async (index) => {
        const editedNote = newData[index];
        const response = await fetch(`http://localhost:5000/edit/${id}`, {
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
                    axios.delete(`http://localhost:5000/note/${id}`)
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

    return (
        <div className="notepad,  tiro-bangla">
            {newData.map((note, index) => (
                <div key={index} className={`note ${note.isEditing ? 'editing' : ''}`}>
                    {note.isEditing ? (
                        <div style={{padding:'10px'}}>
                            <input
                                type="text"
                                value={note.editedTitle || note.title}
                                onChange={(e) => handleInputChange(index, 'editedTitle', e.target.value)}
                                className="title-input"
                            />
                            <textarea
                                value={note.editedDetails || note.details}
                                onChange={(e) => handleInputChange(index, 'editedDetails', e.target.value)}
                                className="details-input"
                            />
                            <button onClick={() => handleSaveClick(index)} className="save-button">
                            <SaveAs/>
                            </button>
                            <button onClick={() => handleDelete(notes)} style={{
                                marginRight: '20px',
                                backgroundColor: '#ff4757',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px 15px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                marginLeft:'20px',
                                transition: 'background-color 0.3s ease',
                            }}>
                                <AiOutlineDelete></AiOutlineDelete>
                            </button>
                        </div>
                    ) : (
                        <div onClick={() => handleEditClick(index)}>
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
