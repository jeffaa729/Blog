import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import {Link } from 'react-router-dom'

const Menu = ({cat}) => {
    // const posts =[
    //     {
    //         id:1,
    //         title:"1",
    //         desc:"LL",
    //         img:"https://www.collinsdictionary.com/images/full/apple_158989157.jpg"
    //     },
    //     {
    //         id:2,
    //         title:"2",
    //         desc:"LL",
    //         img:"https://www.collinsdictionary.com/images/full/apple_158989157.jpg"
    //     },
    //     {
    //         id:3,
    //         title:"3",
    //         desc:"LL",
    //         img:"https://www.collinsdictionary.com/images/full/apple_158989157.jpg"
    //     }
    // ]
    const [posts, setPosts] = useState([])
 

    useEffect(()=>{
        const getData = async ()=>{
            try {
                const res=  await axios.get(`/posts/?cat=${cat}`)
                setPosts(res.data) 
            } catch (err) {
                console.log(err)
            }
        }
        getData()
    },[cat])

    return (
        <div className='menu'>
            <div className='container'>
            <h1>Recommended post</h1>
            {posts.map((post)=>{
                return <div className='post' key={post.id}>
                    <img src={`../upload/${post.img || "no-image.png"}`} alt=''/>
                    <h2>{post.title}</h2>
                    <Link to={`/post/${post.id}`} >
                        <button> Read More</button>       
                    </Link>
                </div>
            })}
            </div>
        </div>
    )
}

export default Menu