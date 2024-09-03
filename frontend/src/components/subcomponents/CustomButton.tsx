type BtnProps = {
    btnText : string,
    onClick : () => void;
}

export default function CustomButton({ btnText , onClick } : BtnProps ){

    return(
        <div>
            <button 
                type="button" 
                onClick={onClick} 
                className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
                {btnText}
            </button>
        </div>
    )
}