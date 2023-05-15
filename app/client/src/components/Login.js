import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

const Login = (props) => {

    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        email:'',
        password:''
    })

    const [errors, setErrors] = useState({})

    const changeHandler = (e) => {
        setUserLogin({...userLogin, [e.target.name]:e.target.value})
    }

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', userLogin, {withCredentials:true})
        .then((res) => {
            console.log(res);
            navigate('/dashboard')
        })
        .catch((err) => {
            setErrors(err.response.data.errors)
        })
    }

    return(
        <div>
            <form onSubmit={loginHandler} className='col-4 mx-auto user-form'>
                <div>
                    <label className='form-label'>Email: </label>
                    <input className='form-control' type="text" name='email' value={userLogin.email} onChange={changeHandler}/>
                </div>

                <div>
                    <label className='form-label'>Password: </label>
                    <input className='form-control' type="password" name='password' value={userLogin.password} onChange={changeHandler}/>
                </div>
                {
                        !errors?
                        <p>Email or Password Invalid.</p>:
                        null
                }
                <button className='btn btn-dark mt-3'>Login</button>           
            </form>
            <br/>
            <Link to={'/register'}>Click here to sign up</Link>
        </div>
    )
}

export default Login;