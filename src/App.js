import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Home from './components/Home'
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import Edit from './components/Edit';

function App() {

  const [orderList, setOrderList] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/newOrder' element={<Form orderList={orderList} setOrderList={setOrderList}/>}/>
          <Route path='/editOrder/:id' element={<Edit/>}/>
          <Route path='/dashboard' element={<Dashboard orderList={orderList} setOrderList={setOrderList} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
