import { Link } from "react-router-dom"
import CustomAvatar from "./subcomponents/CustomAvatar"

export type BlogProps = {
    id : string,
    authorName : string,
    title : string,
    content : string,
    publishedDate : string,
}

export default function BlogCard( { id, authorName, title, content, publishedDate } : BlogProps){

    return(
        <Link to={`/blog/${id}`} className="w-full flex justify-center" >   
            <div className="lg:w-1/2 w-3/4  cursor-pointer">
                <div className="p-8">
                    <div className="flex justify-start items-center gap-2 h-12">
                        <CustomAvatar initials={authorName} /> <span className="font-normal text-sm" > {authorName} </span> <span className="text-[6px] text-slate-400"> &#9679; </span> <span className="text-sm text-slate-400"> {publishedDate} </span>
                    </div>
                    <div className="font-extrabold text-3xl mt-2">
                        {title}
                    </div>
                    <div className="font-light font-serif mt-3" >
                        {`${content.slice(0,190)}...` }
                    </div>
                    <div className="text-xs text-slate-400 mt-8 pl-5">
                        {`${Math.ceil(content.length / 100)} minuntes read`}
                    </div>
                </div>
                <hr className="bg-gray-300 h-px " />
            </div>
        </Link>
    )
}