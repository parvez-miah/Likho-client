import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Button, Container, Form } from 'react-bootstrap';
import { AuthContext } from '../../Provider/AuthProvider';


const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password).then((userCredential) => {
      const loggedUser = userCredential.user;
      updateUserProfile(data.name, data.photoURL).then(() => {
        reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'User created successfully.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/');
      });
    });
  };

  return (
    <Container
      style={{
        animation: 'fadeInUp 0.8s ease',
      }}
      className="mt-5"
    >
      <div style={{ textAlign: 'left' }} className="d-flex flex-column align-items-left">
        <h1 className="text-primary">Register</h1>
        <p className="text-muted">Please fill in this form to create an account.</p>

        <Form onSubmit={handleSubmit(onSubmit)} className="w-100 mt-4">
          <Form.Group controlId="name"  >
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              {...register('name', { required: true })}
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="w-100 mt-4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              {...register('email', { required: true })}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="w-100 mt-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              {...register('password', { required: true })}
              required
            />
          </Form.Group>

          <Form.Group controlId="photoURL " className="w-100 mt-4">
            <Form.Label>Profile Photo URL</Form.Label>
            <Form.Control
              type="url"
              placeholder="Photo URL"
              {...register('photoURL', { required: true })}
              required
            />
          </Form.Group>

          <p style={{ color: 'red' }}>{error}</p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '1.5rem',
          animation: 'fadeIn 1s ease',
        }}
      >
        <p>
          By creating an account you agree to our{' '}
          <Link to="/" className="text-primary">
            Terms & Privacy
          </Link>
          .
        </p>
        <Button
          variant="primary"
          type="submit"
          className="mt-3"
          style={{ width: '100%', animation: 'pulse 1s infinite' }}
        >
          Register
        </Button>
      </div>
        </Form>

        <div className="mt-3">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-primary">
              Login now
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

export default Register;