import { Link } from "react-router-dom";
import LabelledInput from "./LabelledInput";
import { useState } from "react";
import { SignupInput } from "../../../common/src/index";


export default function Auth(){

    const [ postInputs, setPostInputs ] = useState<SignupInput>({
        email : "",
        name : "",
        password : ""
    })



    return(
        <div className="flex justify-center items-center flex-col h-screen">
            <div className="text-3xl font-bold">
                Create an account
            </div>
            <div className="text-lg text-slate-400 ">
                Already have an account? <Link to="/signin" className="underline">Login</Link>
            </div>
            <div className="w-80">
                <LabelledInput 
                    label="Username"
                    type="text"
                    placeholder="Enter your username"
                    onChange={(e) => setPostInputs({
                        ...postInputs,
                        name : e.target.value
                    })}
                />
            </div>
            <div className="w-80">
                <LabelledInput 
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setPostInputs({
                        ...postInputs,
                        email : e.target.value
                    })}
                />
            </div>
            <div className="w-80">
                <LabelledInput 
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPostInputs({
                        ...postInputs,
                        password : e.target.value
                    })}
                />
            </div>
        </div>
    )
}