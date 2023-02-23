import axios from 'axios'
import moment from 'moment'
import React from 'react'
import { useState } from 'react'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Write = () => {
    const category = ["art","science","technology","film","design","food","Sports"]
    const state = useLocation().state
    const [value,setValue] = useState(state?.value ||'')
    const [title,setTitle] = useState(state?.title ||'')
    const [image,setImage] = useState(null)
    const [cat,setCat] = useState(state?.cat || '')

    const navigate = useNavigate()

    const upload = async () => {
        try {
          const formData = new FormData();
          formData.append("file", image);
          const res = await axios.post("/upload", formData);
          return res.data;
        } catch (err) {
          console.log(err);
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();
    
        try {
          state
            ? await axios.put(`/posts/${state.id}`, {
                title,
                desc: value,
                cat,
                img: image ? imgUrl : "",
              })
            : await axios.post(`/posts/`, {
                title,
                desc: value,
                img: image ? imgUrl : "",
                cat,
                date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
              })
            navigate("/")
        } catch (err) {
          console.log(err)
        }
      };
    return (
        <div className='add'>
            <div className='content'>
                <input type='text' placeholder='Title' onChange={(e) =>{setTitle(e.target.value)}} />
                <div className='editorContainer'>
                    <ReactQuill
                        className='editor'
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </div>
            <div className='menu'>
                <div className='item'>
                    <h1>Publish</h1>
                    <span>
                        <b>Status:</b> Draft
                    </span>
                    <span>
                        <b>Visibility:</b> Public
                    </span>
                    <input  type="file"  onChange={(e) =>{setImage(e.target.files[0])}} />
                    <label className ="file" htmlFor='file'>Upload Image</label>
                    <div className='button'>
                        <button>Save as draft</button>
                        <button>Update</button>
                        <button onClick={handleSubmit} >Publish</button>
                    </div>
                </div>
                <div className='item'>
                    <h1>Category</h1>
                    {category.map((cate)=>{
                        return <div key ={category.indexOf(cate)} className='cat'>
                            <input type="radio" checked={cat=== cate} name='cat' value={cate} id={cate} onChange={(e) =>{setCat(e.target.value)}} />
                            <label htmlFor={cate} key ={category.indexOf(cate)}>{cate.toUpperCase()}</label>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Write