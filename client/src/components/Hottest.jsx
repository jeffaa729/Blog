import React, { useState ,useEffect} from 'react'
import moment from 'moment'
import blackLike from '../assets/blackLike.png'
import blackDis from '../assets/blackDis.png'
import { Link,useLocation } from 'react-router-dom'
import axios from 'axios'

const Hottest = () => {
    const [posts, setPosts] = useState([])
    const cat = useLocation().search
    useEffect(()=>{
        const getData = async ()=>{
            try {
                const res=  await axios.get(`/posts/like`)
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
    const [index, setIndex] = useState(0)
    
    const prev =()=>{
        const isFirst = (index === 0)
        const newIndex = isFirst ? posts.length - 1 : index - 1
        setIndex(newIndex)
    }
    const next =()=>{
        const isLast = (index === posts.length - 1)
        const newIndex = isLast ? 0 : index + 1 
        setIndex(newIndex)
    }
    const post = posts[index]
    return (
        <div className='hot'>
            <h1>Hottest Post</h1>
            <div className='posts'>          
            <div className='post'>
                <div className='img'>
                    <button onClick={prev} ></button>
                    <img src={`../upload/${post?.img || "no-image.png"}`} alt=""/>
                    <button onClick={next} ></button>
                </div>
                <div className='content'>
                    <Link to ={`/post/${post?.id}`} className="link" >
                        <h1>{post?.title}</h1>
                    </Link>
                        <div className='postinfo'>
                            {post?.userImg ? <img className='userImg' src={`../user/${post?.userImg}`} alt='' /> : <img className='userImg' src='../user/unknown.png' alt='' />}
                            <span className='writer'>{post?.username}</span>
                            <span className='date'>{moment(post?.date).fromNow()}</span>
                            <span className='likes' >
                                <p className='lik'>{post?.likes} <img src={blackLike} alt='' className='like' /></p>
                                <p className='lik'>{post?.dislike} <img src={blackDis} alt='' className='like' /></p>
                            </span>
                        </div>
                </div>
            </div>
            </div> 
        </div>
    )
}

export default Hottest