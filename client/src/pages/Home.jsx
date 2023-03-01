import React, { useEffect,useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from "axios"
import moment from 'moment'

import Hottest from '../components/Hottest'
import Normal from '../components/Normal'
import Latest from '../components/Latest'

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
    <div className=''>
        {!cat?<div>
            <Hottest/>
            <Latest/>
        </div>
        :
            <></>}
        <Normal
            posts = {posts}
            getText = {getText}
        />

    </div>
  )
}

export default Home