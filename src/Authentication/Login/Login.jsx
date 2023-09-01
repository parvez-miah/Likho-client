import React, { useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from '../SocialLogin/SocialLogin';
import NotesHome from '../../NotesSection/NotesHome/NotesHome';

const Login = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();


  return (
      <div className="mt-4">
        {
        user ? <> <NotesHome></NotesHome> </> : <><SocialLogin /></>
        }
      </div>
  );
};

export default Login;
