import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineDelete, AiFillEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import UseNotes from '../../Hooks/UseNotes';
import { Spinner } from 'react-bootstrap';


const NoteView = () => {
    const { id } = useParams();
    const [newData, setNewData] = useState([]);
    const [notes, refetch, isLoading] = UseNotes();
    const navigate = useNavigate()

    useEffect(() => {
        const found = notes.filter((note) => note._id == id)
        setNewData(found)
    }, []);

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

    if (isLoading){
        return <Spinner animation="border" variant="success" />
    }



    return (
        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/edit/${id}`}>
            <div className='tiro-bangla' style={{ padding: '20px' }}>
                {
                    newData.map((data, index) => <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '20px', marginBottom: '20px' }} key={index}>

                        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', textAlign: 'left' }}>
                            {data.title}
                        </h2>
                        <p style={{ textAlign: 'left' }}>{data.details}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', textAlign: 'left' }}>
                            <button onClick={() => handleDelete(notes)} style={{
                                marginRight: '20px',
                                backgroundColor: '#ff4757',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px 15px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}>
                                <AiOutlineDelete></AiOutlineDelete>
                            </button>
                            <button style={{
                                backgroundColor: '#32cc52', // Stunning green color
                                color: 'inherit',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '10px 15px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}>
                                <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/edit/${id}`}>   <AiFillEdit></AiFillEdit></Link>
                            </button>
                        </div>

                    </div>


                    )

                }
            </div>
        </Link>
    );
};

export default NoteView;
