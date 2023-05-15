import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = (props) => {
    const { id } = useParams();
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

    useEffect(() => {
        axios.get(`http://localhost:8000/api/order/${ id }`)
        .then((res) => {
            setOrder(res.data.order);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/editOrder/${ id }`, order)
        .then((res) => {
            navigate('/dashboard');
        })
        .catch((err) => {
            setErrors(err.response.data.errors)
        })
    }

    const deleteHandler = (id) => {
        axios.delete(`http://localhost:8000/api/deleteOrder/${ id }`)
        .then((res) => {
            navigate('/dashboard');
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    return (
        <div>
            <a href='/dashboard'>back to home</a>
            <form onSubmit={submitHandler}>
                <div>
                    <label>First Name: </label>
                    <input type="text" name="firstName" onChange={changeHandler} value={order.firstName}></input>
                    {
                        errors.firstName?
                        <p>{errors.firstName.message}</p>:
                        null
                    }
                </div>

                <div>
                    <label>Last Name: </label>
                    <input type="text" name="lastName" onChange={changeHandler} value={order.lastName}></input>
                    {
                        errors.lastName?
                        <p>{errors.lastName.message}</p>:
                        null
                    }
                </div>

                <div>
                    <label>Address: </label>
                    <input type="text" name="address" onChange={changeHandler} value={order.address}></input>
                    {
                        errors.address?
                        <p>{errors.address.message}</p>:
                        null
                    }
                </div>

                <div>
                    <label>Phone Number: </label>
                    <input type="text" name="phone" onChange={changeHandler} value={order.phone}></input>
                    {
                        errors.phone?
                        <p>{errors.phone.message}</p>:
                        null
                    }
                </div>
                <button>Update Order</button>
            </form>
            <button onClick={() => deleteHandler(order._id)}>Delete</button>
        </div>
    )
}

export default Edit;