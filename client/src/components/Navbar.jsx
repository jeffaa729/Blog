import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../assets/logo.jpg"
import { UserContext } from '../context/userContext'

const Navbar = () => {
    const {user,logout} = useContext(UserContext)
    const category = ["art","science","technology","film","design","food"]
    return (
        <div className='navbar'>
            <div className='container'>
                <div className='logo'>
                    <Link to="/">
                        <img className='logojpg' src= {Logo} alt = "" />
                    </Link>
                </div>
                <div className='links' >
                    {category.map((cat)=>{
                    return  <Link className='link' to={`/?cat=${cat}`} key={category.indexOf(cat)}>  
                                <h5> {cat.toUpperCase()}</h5>
                            </Link>      
                    })}
                <span className='username'>{user?.username}</span>
                {user.img ? <img className='userImg' src={`../user/${user.img}`} alt='' /> : <img className='userImg' src='../user/unknown.png' alt='' />}
                {user? <span onClick={logout} >Logout</span> : <Link className='link' to='/login' > Login </Link>}
                <span className='write'>
                    <Link className='link' to="/write" >Write</Link>
                </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar