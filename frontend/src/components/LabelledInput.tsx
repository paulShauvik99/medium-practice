import { ChangeEvent } from "react";

interface LabelledInput {
    label : string,
    placeholder : string,
    type: string,
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
}

export default function LabelledInput({ label, type ,placeholder, onChange} : LabelledInput){

    return(
        <div className="w-full">
            <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type={type} id="name"  className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 " onChange={onChange} placeholder={placeholder} required />
        </div>
    )
}