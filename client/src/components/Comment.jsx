import axios from 'axios'
import moment from 'moment'
import React, { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'

const Comment = ({comments, postId , user}) => {

    const [comment,setComment] = useState("")
    const handleSubmit = async(e)=>{
        e.preventDefault()
        await axios.post(`/comments/${postId}`,{
            content: comment,
            date :moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            postId,
            writer: user.username,
          })
        setComment('')
    }


    return (
        <div>
            <div className='comments' >
                {comments.map((comment)=>{
                    return <div key={comment.id} className ="comment" >
                        <div className='info'>
                            <p style={{color: 'skyblue', fontWeight:"bold"}} > {comment.writer}</p>
                            <p>{moment(comment.date).fromNow()}</p>
                        </div>
                        <p>{comment.content}</p>
                    </div>
                })}
            </div>
                <div className='session'>
                <form
                    method='POST'
                    onSubmit={(event)=>{
                        comment.length >=1 ? handleSubmit(event) : event.preventDefault()
                    }}
                >
                 <input 
                    aria-label='Add a comment'
                    autoComplete= 'off'
                    type= 'text'
                    name= 'add-comment'
                    placeholder='Add a comment....'
                    value = {comment}
                    onChange = {({target})=> {setComment(target.value)}}
                 />
                 <button
                    className=''
                    type = 'button'
                    disabled = {comment.length < 1}
                    onClick = {handleSubmit}
                 >
                    POST
                 </button>
                </form>
            </div>
        </div>
    )
}

export default Comment