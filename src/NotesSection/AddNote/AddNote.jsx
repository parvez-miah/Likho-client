import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Badge, Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from "react-hook-form"
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';


const AddNote = () => {
    const {user} = useContext(AuthContext)

    const navigate = useNavigate();    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
        const {title, details} = data;
        const noteItem = {title, details, email: user.email };


        axios.post('https://likho-server.onrender.com/notes', noteItem)
        .then(data=>{
            if(data.data.insertedId){
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-danger',
                        cancelButton: 'btn btn-success',
                        padding: '20px',
                    },
                    buttonsStyling: false
                })
                swalWithBootstrapButtons.fire({
                    title: 'Your Note Has been Saved',
                    text: "What you want to do now?",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Go to My Notes',
                    cancelButtonText: 'Add a new Note',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                       navigate('/MyNotes')
                        
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                       
                       navigate('/AddaNote')
                    }
                    reset();
                })
            }
        })
       
    }



    return (
        <div className="container-fluid">
            <h2 className="mb-3">
                Write a Note <Badge bg="primary">New</Badge>
            </h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Control type="text" {...register("title", { required: true })}  placeholder="Note Title" />
                <FloatingLabel controlId="floatingTextarea2" label="What's on your mind?">
                    <Form.Control 
                        {...register("details", { required: true })}
                        as="textarea"
                        placeholder="What's on your mind?"
                        className="mt-3"
                        style={{ height: '200px' }}
                    />
                </FloatingLabel>
                <Button type='submit' className='mt-3' variant="success"> <SaveIcon></SaveIcon> Save</Button>{' '}

            </Form>

            <div className='mb-3 mt-3'>
                {[

                    'danger',
                ].map((variant) => (
                    <Alert key={variant} variant={variant}>
                        Don't forget to press the save button!
                    </Alert>
                ))}
            </div>

        </div>
    );
};

export default AddNote;
