import React, { useContext ,useEffect,useState,} from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import Comment from '../components/Comment'
import axios from 'axios'
import moment from 'moment'
import { UserContext } from '../context/userContext'
import blackLike from '../assets/blackLike.png'
import whiteLike from '../assets/whiteLike.png'
import blackDis from '../assets/blackDis.png'
import whiteDis from '../assets/whiteDis.png'



const EditIcon = "https://www.seekpng.com/png/detail/202-2022672_edit-comments-edit-icon-png-circle.png"
const DeleteIcon = "https://www.seekpng.com/png/detail/202-2022743_edit-delete-icon-png-download-delete-icon-png.png"
const Single = () => {
    const [post, setPost] = useState({})
    const [comment, setComment] = useState([])

    const loc = useLocation()
    const navigate = useNavigate()
    const postId = parseInt(loc.pathname.split("/")[2])
    const {user} = useContext(UserContext) 
    const [status,setStatus] = useState('')
    const [menuToggle, setMenuToggle] = useState(true)
    useEffect(()=>{
        const getData = async ()=>{
            try {
                const res=  await axios.get(`/posts/${postId}`)
                const ress=  await axios.get(`/comments/${postId}`)
                const resss = await axios.get(`/like/${postId}&${user.id}`)
                if(resss.data.length){
                    setStatus(resss.data[0]["like_or_dislike"])
                }
                setPost(res.data)
                setComment(ress.data) 
            } catch (err) {
                console.log(err)
            }
        }
        getData()
    },[postId,user.id])
    const like = post.likes
    const dislike = post.dislike
    const handleClick =async()=>{
        try {
            if(status ==='dislike'){    
                await axios.delete(`/like/${postId}&${user.id}&dislike`)
            }
            (status === 'like'? 
            (
                await axios.delete(`/like/${postId}&${user.id}&like`)
            ) : 
                await axios.post(`/like/`,{
                    postId : postId,
                    userId : user.id,
                    enum : 'like'
            })
            )
            setStatus((prev)=>prev === 'like'? "": "like")
 
        } catch (error) {
            console.log(error)
        }
    }
    const handleClickDis =async()=>{
        try {
            if(status === 'like'){    
                await axios.delete(`/like/${postId}&${user.id}&like`)
            }
            (status === 'dislike'? 
                (
                    await axios.delete(`/like/${postId}&${user.id}&dislike`)
                ): 
                    
                    await axios.post(`/like/`,{
                        postId : postId,
                        userId : user.id,
                        enum : 'dislike'
                    })
            )
            setStatus((prev)=>prev === 'dislike'? "": "dislike")
        }catch (error) {
            console.log(error)
        }
    }
    const handleDelete = async()=>{
        try {
            await axios.delete(`/posts/${postId}`)
            navigate("/") 
        } catch (err) {
            console.log(err)
        }
    }
    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    } 

    return (
        <div className='singlePage'>
            <div className='content'>
                <img className='postImg' src={`../upload/${post.img || "no-image.png"}`} alt='' />
                <div className='user'>
                <div className='info'>
                    {post.userImg ? <img className='userImg' src={`../user/${post.userImg}`} alt='' /> : <img className='userImg' src='../user/unknown.png' alt='' />}
                    <span> {post.username}</span>
                    <p>posted {moment(post.date).fromNow()}</p>
                </div>
                {user.username === post.username && <div className='edit'>
                    <Link to ={`/write?edit=${post.id}`} state={post} >
                        <img src={EditIcon} alt=''/>
                    </Link>
                    <img onClick={handleDelete} src={DeleteIcon} alt=''/>
                </div>}
                    <span className='likes' >
                        {status==='like' ? 
                            <p className='lik'> {like} <img src={blackLike} alt='' className='like' onClick={handleClick} /></p> 
                        : 
                            <p className='lik'> {like} <img src={whiteLike} alt='' className='like' onClick={handleClick} /></p> }
                        {status === 'dislike'? 
                            <p className='lik'>{dislike} <img src={blackDis} alt='' className='like' onClick={handleClickDis} /></p> 
                        : 
                            <p className='lik'>{dislike} <img src={whiteDis} alt='' className='like' onClick={handleClickDis} /></p>}
                    </span>
                </div>
                <h1>
                    {post?.title}
                </h1>
                <p>{getText(post.descript)}</p>
            </div>
            <div className='buttons' >
                <button className='button' onClick={() => setMenuToggle(true)} >Comment</button>
                <button className='button' onClick={() => setMenuToggle(false)} >Recommanded Post</button>
            </div>
            {menuToggle?  <Comment comments = {comment} postId = {postId} user = {user} /> : <Menu cat = {post.cat} />}
        </div>
    )
}

export default Single