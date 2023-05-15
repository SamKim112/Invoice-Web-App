import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

const Register = (props) => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:''
    })

    const [errors, setErrors] = useState({})

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', user, {withCredentials:true})
        .then((res) => {
            console.log(res);
            navigate('/dashboard')
        })
        .catch((err) => {
            setErrors(err.response.data.errors)
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler} className='col-4 mx-auto user-form'>
                <div>
                    <label className='form-label'>First Name: </label>
                    <input className='form-control' type="text" onChange={changeHandler} value={user.firstName} name='firstName'/>
                    {
                        errors.firstName?
                        <p>{errors.firstName.message}</p>:
                        null
                    }
                </div>
                <div>
                    <label className='form-label'>Last Name: </label>
                    <input className='form-control' type="text" onChange={changeHandler} value={user.lastName} name='lastName'/>
                    {
                        errors.lastName?
                        <p>{errors.lastName.message}</p>:
                        null
                    }
                </div>
                <div>
                    <label className='form-label'>Email: </label>
                    <input className='form-control' type="text" onChange={changeHandler} value={user.email} name='email'/>
                    {
                        errors.email?
                        <p>{errors.email.message}</p>:
                        null
                    }
                </div>
                <div>
                    <label className='form-label'>Password: </label>
                    <input className='form-control' type="password" onChange={changeHandler} value={user.password} name='password'/>
                    {
                        errors.password?
                        <p>{errors.password.message}</p>:
                        null
                    }
                </div>
                <div>
                    <label className='form-label'>Confirm Password: </label>
                    <input className='form-control' type="password" onChange={changeHandler} value={user.confirmPassword} name='confirmPassword'/>
                    {
                        errors.confirmPassword?
                        <p>{errors.confirmPassword.message}</p>:
                        null
                    }
                </div>
                <button className='btn btn-dark mt-3'>Register</button>
            </form>
            <br/>
            <Link to={'/login'}>Already have an account?</Link>
        </div>
    )
}

export default Register;