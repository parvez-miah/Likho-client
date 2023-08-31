import React, { useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
  const { signIn, error, loading, logOut } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signIn(email, password);
      const user = result.user;
      console.log(user);

      Swal.fire({
        title: 'User Login Successful.',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });
      navigate(from, { replace: true });
    } catch (error) {
      // Handle login error
      console.error('Login error:', error);
    }

    navigate('/')
  };



  return (
    <Container
      style={{
        
        animation: 'fadeInUp 0.8s ease',
      }}
      className="mt-5"
    >
      <div style={{ textAlign: 'left' }} className="d-flex flex-column align-items-left">
        <h1 className="text-primary text-bold">Login</h1>
        <p className="text-muted">Please login to create a note or more.</p>

        <Form onSubmit={handleLogin} className="w-100 mt-4">
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter Email" required />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password" required />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Login
          </Button>
        </Form>

        <div className="mt-3">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-primary">
              Register now
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="mt-4">
        <SocialLogin />
      </div>
    </Container>
  );
};

export default Login;
