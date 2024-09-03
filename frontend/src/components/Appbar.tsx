import { Link } from "react-router-dom";
import CustomAvatar from "./subcomponents/CustomAvatar";

export default function Appbar(){

    return(
        <div className="w-100 items-center flex justify-between px-12 p-4 bg-slate-100 border-b-2 border-b-slate-200" >
            <Link to="/blogs">
                <div className="logo font-medium">
                    Medium
                </div>
            </Link>

            <div className="flex items-center justify-center gap-5">
                <Link to="/publish">
                    <button type="button" className="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-2xl text-sm px-5 py-2.5 me-2 mb-2 ">Create Blog</button>
                </Link>

                <CustomAvatar
                    size="big"
                    initials="Shauvik Paul"
                />
            </div>
        </div>
    )
}