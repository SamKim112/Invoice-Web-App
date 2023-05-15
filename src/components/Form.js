import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = (props) => {
    const navigate = useNavigate();
    const [order, setOrder] = useState({
        firstName: '',
        lastName: '',
        address: '',
        phone: ''
    })

    const [errors, setErrors] = useState({})

    const changeHandler = (e) => {
        setOrder({...order, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/newOrder', order)
        .then((res) => {
            navigate('/dashboard');
        })
        .catch((err) => {
            setErrors(err.response.data.errors)
        })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <label>First Name: </label>
                    <input type="text" name="firstName" onChange={changeHandler}></input>
                    {
                        errors.firstName?
                        <p>{errors.firstName.message}</p>:
                        null
                    }
                </div>

                <div>
                    <label>Last Name: </label>
                    <input type="text" name="lastName" onChange={changeHandler}></input>
                    {
                        errors.lastName?
                        <p>{errors.lastName.message}</p>:
                        null
                    }
                </div>

                <div>
                    <label>Address: </label>
                    <input type="text" name="address" onChange={changeHandler}></input>
                    {
                        errors.address?
                        <p>{errors.address.message}</p>:
                        null
                    }
                </div>

                <div>
                    <label>Phone Number: </label>
                    <input type="text" name="phone" onChange={changeHandler}></input>
                </div>
                <button>Add Order</button>
            </form>
        </div>
    )
}

export default Form;