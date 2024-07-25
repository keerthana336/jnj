import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

function Update() {
  const [data , setData] = useState([])
  const {id} = useParams();

  const [values, setValues] = useState({
    username : '',
    email : '',
    phone : '',
  })
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get('http://localhost:3000/users/' + id)
    .then(res => {setData(res.data)
    })
    .catch(err =>console.log(err));
   
    console.log(values)
  },[]) 

  const handleUpdate = (event) =>{
    event.preventDefault();
    if(values.username==""){
      values.username=data?.username // previous data 
    }
    if(values.phone==""){
      values.phone=data?.phone
    }
    if(values.email==""){
      values.email=data?.email
    }
    axios.put('http://localhost:3000/users/' +id,values)
    .then(res => {
      console.log(res);
      navigate('/')
    })
    .catch(err =>console.log(err));
  }
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
    <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
      <h1>Udate User</h1>
      <form onSubmit={handleUpdate}>
        <div className='mb-2'>
          <label htmlFor="name">Name:</label>
            <input type="text" name='username' className='form-control' placeholder='Enter Name1' defaultValue={data.username} onChange={e => setValues({...values, username: e.target.value})}/>
        </div>
        <div className='mb-2'>
          <label htmlFor="email">Email:</label>
            <input type="email" name='email' className='form-control' placeholder='Enter Email' defaultValue={data.email} onChange={e => setValues({...values, email: e.target.value})}/>
        </div>
        <div className='mb-2'>
          <label htmlFor="email">Phone:</label>
            <input type="text" name='phone' className='form-control' placeholder='Enter Phone Number' defaultValue={data.phone} onChange={e => setValues({...values, phone: e.target.value})}/>
        </div>
        <button className='btn btn-success'>Update</button>
        <Link to="/" className='btn btn-primary ms-3'>Back</Link>
      </form>
    </div>
    </div>
  )
}
 
export default Update