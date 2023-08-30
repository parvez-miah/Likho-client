import React, { useContext } from 'react'
import SocialLogin from '../SocialLogin/SocialLogin'
import { Badge } from 'react-bootstrap'
import { AuthContext } from '../../Provider/AuthProvider'
import { useNavigate } from 'react-router-dom'

const Login = () => {

const {user} = useContext(AuthContext);
const navigate = useNavigate();

const changeRoute = ()=>{
  navigate('/');
  return changeRoute
}

  return (
    <div>
      {
        user ? <> ${changeRoute()}</> : <><h2>Please Log in to Continue writing your <Badge>Notes!</Badge> </h2>
          <SocialLogin></SocialLogin></>
      }
    </div>
  )
}

export default Login