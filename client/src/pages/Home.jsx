import React, { useEffect,useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from "axios"
import moment from 'moment'
import blackLike from '../assets/blackLike.png'
import blackDis from '../assets/blackDis.png'
import whiteDis from '../assets/whiteDis.png'
const Home = () => {
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

    const cat = useLocation().search
    useEffect(()=>{
        const getData = async ()=>{
            try {
                const res=  await axios.get(`/posts${cat}`)
                setPosts(res.data) 
            } catch (err) {
                console.log(err)
            }
        }
        getData()
    },[cat])
    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }
    return (
    <div className='home'>
        <div className='posts'>
            {posts.map((post)=>{
                return <div className='post' key={post.id}>
                    <div className='img'>
                        <img src={`../upload/${post.img || "no-image.png"}`} alt=""/>
                    </div>
                    <div className='content'>
                        <Link to ={`/post/${post.id}`} className="link" >
                            <h1>{post.title}</h1>
                            <div className='postinfo'>
                                {post.userImg ? <img className='userImg' src={`../user/${post.userImg}`} alt='' /> : <img className='userImg' src='../user/unknown.png' alt='' />}
                                <span className='writer'>{post.username}</span>
                                <span className='date'>{moment(post.date).fromNow()}</span>
                                <span className='likes' >
                                    <p className='lik'>{post.likes} <img src={blackLike} alt='' className='like' /></p>
                                    <p className='lik'>{post.dislike} <img src={blackDis} alt='' className='like' /></p>
                                </span>
                            </div>
                            <p>{getText(post.descript).slice(0,200)}............................</p>
                            <button>Read More</button>
                        </Link>
                    </div>
                </div>
            })}
        </div>
    </div>
  )
}

export default Home