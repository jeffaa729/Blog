import React from 'react'
import moment from 'moment'
import blackLike from '../assets/blackLike.png'
import blackDis from '../assets/blackDis.png'
import { Link } from 'react-router-dom'

const Normal = ({posts, getText}) => {
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
    </div>)
}

export default Normal