import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../src/style.css'


function Create() {
  const [values, setValues] = useState({
    username : ' ',
    email : ' ',
    phone : ' ',
  })
  const [ errName , setErrName] = useState()
  const [ errEmail , setErrEmail] = useState()
  const [ errPhone , setErrPhone] = useState()

  function handleNameChange (e) {
    if(e.target.name === "username"){
      if(e.target.value.length < 1)
        setErrName("Name is required")
      else{
      setErrName("")
      }
    }
    else if(e.target.name === "email"){
      if(e.target.value.length < 1)      
      setErrEmail("Email is required")
      else{
        setErrEmail("")
      }
    }
    else if(e.target.name === "phone"){
      if(e.target.value.length < 1)
      setErrPhone("Phone is required")
    else{
      setErrPhone("")
    }
    }
    setValues({...values, [e.target.name]: e.target.value})
  }  
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/users',values)
    .then(res => {
      console.log(res);
      navigate('/')
    })
    .catch(err =>console.log(err));
  }
  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
    <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
      <h1>Add a User</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-2'>
          <label htmlFor="name">Name:</label>
            <input type="text" name='username' className='form-control' placeholder='Enter Name' onChange={e => handleNameChange(e)}/>
            <p className='error-message'>{errName}</p>
        </div>

        <div className='mb-2'>
          <label htmlFor="email">Email:</label>
            <input type="email" name='email' className='form-control' placeholder='Enter Email' onChange={e => handleNameChange(e)}/>
            <p className='error-message'>{errEmail}</p>

        </div>
        <div className='mb-2'>
          <label htmlFor="email">Phone:</label>
            <input type="text" name='phone' className='form-control' placeholder='Enter Phone Number' onChange={e => handleNameChange(e)}/>
            <p className='error-message'>{errPhone}</p>
            
        </div>
        {/* <div className='mb-2'>
          <label htmlFor="email">image:</label>
        <img src="../assets/logo192.png" className='form-control' alt="img"/>
            
        </div> */}
        
        <button className='btn btn-success'>Submit</button>
        <Link to="/" className='btn btn-primary ms-3'>Back</Link>
      </form>
    </div>
    </div>
  )
}

export default Create