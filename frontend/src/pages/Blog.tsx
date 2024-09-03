import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/CustomHooks";
import FullBlog from "../components/FullBlog";
import Appbar from "../components/Appbar";

export default function Blog(){

    const {id} = useParams()
    const {loading , blog} = useBlog({
        id : id || ""
    });

    if(loading){
        return <>Loading...</>
    }
    return(
        <div>
            <Appbar />
            <FullBlog 
                id={blog!.id}
                title={blog!.title}
                authorName={blog!.author.name}
                content={blog!.content}
                publishedDate="2nd January, 2016"
            />
        </div>
    )
}