import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/reducer/authSlice';
import Swal from 'sweetalert2';

const Login = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {

      const data = await axios.post(process.env.REACT_APP_API_URL + 'auth/login', {
        account: account,
        password: password,
      });

      const result = data.data.values;
      console.log(result);
      console.log(data);
      if (data.data.status === 'error') {
        return Swal.fire('Oppssss', data.data.message);
      }
      dispatch(login({ username: result.username, token: result.token, id: result.id, admin: result.is_admin }));

      navigate('/event');
    } catch (error) {
      console.log(error);
      Swal.fire(error.message);
    }
  };

  return (

    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="card mt-5">
        <div className="card-header">Login</div>
        <div className="card-body">
          <div className="mb-3 row">
            <div className="col-sm-12">
              <input
                type="text"
                class="form-control"
                placeholder="email, username, phone number"
                onChange={(e) => setAccount(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 row">
            <div className="col-sm-12">
              <input
                type="password"
                class="form-control"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-dark" onClick={() => handleLogin()}>
              Login
            </button>
            <Link to="/register" className="btn btn-outline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>



  );
};

export default Login;
