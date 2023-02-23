import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [err , setErr] = useState(null)
    const navigate = useNavigate()
    const [img , setImg] = useState(null)
    const [input , setInput]  = useState({
        username : "",
        email :"",
        password:"",
    })
    const upload = async() => {
        try {
          const formDat = new FormData();
          formDat.append("file",img)
          const res = await axios.post("/user", formDat);
          return res.data;
        } catch (err) {
          console.log(err);
        }
    }
    const handleChange = (e) =>{    
        setInput((prev)=>(
            {...prev, [e.target.name] : e.target.value}
        ))
    }


    const handleSubmit = async (e) =>{
        e.preventDefault()
        const imgUrl = await upload();
        const info = {...input, img: imgUrl}
        console.log(info)
        try{
            await axios.post("/auth/register",info)
            navigate('/login')
        }catch(err){
            setErr(err.response.data)
        }
    }

    return (
        <div className='auth' >
            <h1>Register</h1>
            <form>
                <input required type="email" placeholder='email' name="email" onChange={handleChange} /> 
                <input  required type="text"placeholder='username' name="username"  onChange={handleChange} />
                <input  required type="password" placeholder='password' name='password' onChange={handleChange} />
                <label className ="file" htmlFor='file'>Upload Icon</label>
                <input  type="file"  name='img' onChange={(e) =>{setImg(e.target.files[0])}} />
                <button onClick={handleSubmit} >Register</button>
                {err && <p> {err} </p>}
                <span>have an account? <Link to= "/login">Login</Link></span>
            </form>
        </div>
      )
    }

export default Register