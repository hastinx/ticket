import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      const data = await axios.post(process.env.REACT_APP_API_URL + 'auth/register', {
        username: username,
        email: email,
        phone_number: phone_number,
        password: password,
        confirm_password: confPassword
      })

      Swal.fire('Success', data.data.message)
      console.log(data)
      navigate('/')
    } catch (error) {

      let message = error.response.data.message

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        html: '<div class="alert alert-danger" role="alert">' + message.map(i => '<span>' + i.msg + '</span ><br/>') + '</div>'
      })

    }
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="card mt-5">
        <div className="card-header">Register</div>
        <div className="card-body">
          <div class="mb-3 row">
            <div class="col-sm-12">
              <input type="text" class="form-control" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            </div>
          </div>
          <div class="mb-3 row">
            <div class="col-sm-12">
              <input type="text" class="form-control" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div class="mb-3 row">
            <div class="col-sm-12">
              <input
                type="text"
                class="form-control"
                placeholder="phone number" onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div class="mb-3 row">
            <div class="col-sm-12">
              <input
                type="password"
                class="form-control"
                placeholder="password" onChange={(e) => setConfPassword(e.target.value)}
              />
            </div>
          </div>
          <div class="mb-3 row">
            <div class="col-sm-12">
              <input
                type="password"
                class="form-control"
                placeholder="confirm password" onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-dark" onClick={() => handleRegister()}>Register</button>
            <Link to="/" className="btn btn-outline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
