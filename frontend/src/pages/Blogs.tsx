import Appbar from "../components/Appbar";
import BlogCard from "../components/BlogCard";
import { useBlogs } from "../hooks/CustomHooks";

export default function Blogs(){

    const {loading , blogs } = useBlogs()

    if(loading){
        return (
            <>
                Loaading...
            </>
        )
    }
    return(
        <>
            <Appbar />
            <div className="flex flex-col w-100 h-screen items-center mt-6">
                {
                    blogs.map(blog =>{
                        return (
                            <BlogCard
                                key={blog.id}
                                id={blog.id}
                                authorName={blog.author.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate="Dec 3, 2021"
                            />
                        )
                    })
                }
                
            </div>
        </>

    )
}

