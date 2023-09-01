import React, { useContext } from 'react'
import { AuthContext } from '../../Provider/AuthProvider';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignIn = () => {
        googleSignIn();
        navigate('/');
    }

    return (
        <div style={{ padding: '10px', borderRadius: '20px' }}> <Button onClick={handleSignIn} className='btn-danger'> <GoogleIcon></GoogleIcon> Log in using Google</Button> </div>
    )
}

export default SocialLogin