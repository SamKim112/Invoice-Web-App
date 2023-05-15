import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = (props) => {
    const {orderList, setOrderList} = props;
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/api/orders')
        .then((response) => {
            setOrderList(response.data.order)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const logout = () => {
        axios.post('http://localhost:8000/api/logout')
        .then((res) => {
            navigate('/login')
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const addOrder = () => {
        navigate('/newOrder')
    }

    const editOrder = (id) => {
        navigate(`/editOrder/${id}`)
    }

    return(
        <div>
            <div>
                <h1>Welcome</h1>
                <button onClick={logout}>Logout</button>
                <button onClick={addOrder}>Add Order</button>
            </div>
            {
                orderList.map((order) => (
                    <div>
                        <h3>{order.firstName} {order.lastName}</h3>
                        <p>{order.address}</p>
                        <p>{order.phone}</p>
                        <button onClick={() => editOrder(order._id)}>Edit</button>
                    </div>
                ))
            }           
        </div>
    )
}

export default Dashboard;