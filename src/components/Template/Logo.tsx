export default function Logo() {
    return (
        <div className={`
        bg-white h-10 w-10 rounded-full
        flex flex-col items-center justify-center
        `}>
            <div className={`h-3 w-3 rounded-full bg-red-600`} />
            <div className="flex gap-1">
                <div className={`h-3 w-3 rounded-full bg-yellow-600`} />
                <div className={`h-3 w-3 rounded-full bg-green-600`} />
            </div>
        </div>
    )
}