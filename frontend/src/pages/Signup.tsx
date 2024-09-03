import Auth from "../components/Auth"
import Quote from "../components/Quote"


export default function Signup(){
    return (
        <div className="h-screen grid grid-cols-1 lg:grid-cols-2" >
                <Auth 
                    type="signup"
                />
            <div className="hidden lg:block">
                <Quote />
            </div>
        </div>
    )
}
