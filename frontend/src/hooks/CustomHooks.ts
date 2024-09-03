import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";


interface Blogs {
    content: string;
    title : string;
    id : string;
    author : {
        name : string; 
    }
    
}

export const useBlogs = () =>{
    const [blogs, setBlogs] = useState<Blogs[]>([]);
    const [loading, setLoading] = useState(true);


    // API Calls 
    const apiCall = async() => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers : {
                    token : localStorage.getItem('token'),
            }})
            setBlogs(res.data.blogs)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    
    useEffect( ()  => {
        apiCall()    
    },[])

    return {loading, blogs}

}


export const useBlog = ({id} : {id : string}) =>{
    const [blog, setBlog] = useState<Blogs>();
    const [loading, setLoading] = useState(true);


    // API Calls 
    const apiCall = async() => {
        try {
            const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers : {
                    token : localStorage.getItem('token'),
            }})
            setBlog(res.data.blog)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
    
    useEffect( ()  => {
        apiCall()    
    },[])

    return {loading, blog}

}