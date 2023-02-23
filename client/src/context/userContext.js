import axios from "axios";
import { createContext, useState,useEffect } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({children}) =>{
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)

    const login = async(inputs) =>{
        const res = await axios.post("/auth/login" , inputs)
        setUser(res.data)
    }

    const logout = async() =>{
        await axios.post("/auth/logout")
        setUser(null)
    }

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(user))
    },[user])

    return( 
        <UserContext.Provider value = {{user,login,logout}}>
            {children}
        </UserContext.Provider>
    )
}
