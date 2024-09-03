import { BlogProps } from "./BlogCard";
import CustomAvatar from "./subcomponents/CustomAvatar";


export default function FullBlog({id, title, content, authorName, publishedDate} : BlogProps){

    


    return(
        <div className="grid grid-cols-12 p-12 w-full">
            <div className="col-span-8 p-8">
                <div className="text-5xl font-extrabold ">
                    {title}
                </div>
                <div className="text-slate-400 text-sm my-3">
                    Posted on {publishedDate}
                </div>
                <div className="text-base font-light">
                    {content}
                </div>
            </div>
            <div className="col-span-4 ml-16 p-8">
                <div className="text-slate-900">
                    Author
                </div>
                <div className="flex h-16 mt-5 ml-5 gap-5 ">
                    <div className="place-self-center">
                        <CustomAvatar size="small" initials={authorName} />
                    </div>
                    <div className="flex flex-col justify-between ">
                        <div className="text-2xl font-semibold">
                            {authorName}
                        </div>
                        <div className="text-base text-slate-400">
                            A Small someting about the Author
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}