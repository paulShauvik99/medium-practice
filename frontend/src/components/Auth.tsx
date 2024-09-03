import { Link, useNavigate } from "react-router-dom";
import LabelledInput from "./subcomponents/LabelledInput";
import { useState } from "react";
import { SignupInput, SigninInput } from "../../../common/src/index";
import CustomButton from "./subcomponents/CustomButton";
import { BACKEND_URL } from "../config";
import axios from "axios";


export default function Auth({ type } : { type : "signin" | "signup"} ) {

    const [ postInputs, setPostInputs ] = type === "signup" ? useState<SignupInput>({
        email : "",
        name : "",
        password : ""
    }) : useState<SigninInput>({
        email : "",
        password : ""
    })

    const navigate = useNavigate()

    const submitDetails = async () => {
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signin" ? "signin" : "signup"}`, postInputs)    
            localStorage.setItem("token", res.data.token)
            navigate("/blogs")
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <div className="flex justify-center items-center flex-col h-full">
            <div className="text-3xl font-bold">
                Create an account
            </div>
            <div className="text-lg text-slate-400 ">
                {type ==="signin" ? "Create an Account?" : "Already have an account?"} <Link to={type === "signin" ? "/signup" :"/signin"} className="underline">{type === "signin" ? "Sign Up" : "Login"}</Link>
            </div>
            {
                type === "signin" ? (
                    null
                ) : (

                    <div className="w-80 mt-4">
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
                )
            }
            <div className="w-80 mt-4">
                <LabelledInput 
                    label="Email"
                    type="email"
                    placeholder="ex@example.com"
                    onChange={(e) => setPostInputs({
                        ...postInputs,
                        email : e.target.value
                    })}
                />
            </div>
            <div className="w-80 mt-4">
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
            <div className="w-80 mt-8">
                <CustomButton
                    onClick={submitDetails}
                    btnText={type === "signin" ? "Sign In" : "Sign Up"} 
                />
            </div>

        </div>
    )
}