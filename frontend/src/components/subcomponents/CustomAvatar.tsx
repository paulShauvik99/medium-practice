export default function CustomAvatar({ initials , size = "small" } : {initials : string , size ?: "small" | "big"}) {

    const ini : string = initials.split(" ").length === 1  ? `${initials.split(" ")[0][0]}` : `${initials.split(" ")[0][0]}${initials.split(" ")[1][0]}`

    return(
        <div>
            <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-8 h-8" : "w-12 h-12"} overflow-hidden bg-gray-200 rounded-full`}>
                <span className={`font-medium text-gray-800 ${size === "big" ? "text-md" : "text-sm" }`}> {ini}</span>
            </div>
        </div>
    )
}