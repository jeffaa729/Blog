import React, { useContext } from 'react'
import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context/userContext'

const Login = () => {
    const [err , setErr] = useState(null)
    const navigate = useNavigate()

    const {login } = useContext(UserContext)

    const [input , setInput]  = useState({
        username : "",
        password:""
    })

    const handleChange = (e) =>{    
        setInput((prev)=>(
            {...prev, [e.target.name] : e.target.value}
        ))
    }


    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            await login(input)
            navigate('/')
        }catch(err){
            setErr(err.response.data)
        }
    }

    return (
        <div className='auth' >
            <h1>Login</h1>
            <form>
                <input type="text"placeholder='username' name='username' onChange={handleChange} />
                <input type="password" placeholder='password' name="password" onChange={handleChange} />
                <button onClick={handleSubmit} >LOGIN</button>
                {err && <p>{err}</p>}
                <span>Dont have an account? <Link to= "/register">Register</Link></span>
            </form>
        </div>
    )
}

export default Login