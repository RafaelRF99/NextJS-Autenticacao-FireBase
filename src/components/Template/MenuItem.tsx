import Link from "next/link"

interface MenuItemProps {
    url?: string
    texto: string
    icone: any
    className?: string
    onClick?: (e: any) => void
}

export default function MenuItem(props: MenuItemProps) {

    function renderizar() {
        return (
            <div className={`w-20 h-20 flex flex-col justify-center items-center ${props.className}`}>
                {props.icone}
                <span className={`
            text-xs font-light text-gray-600
            `}>
                    {props.texto}
                </span>
            </div>
        )
    }

    return (
        <li onClick={props.onClick} className={` hover:bg-gray-100 cursor-pointer `}>
            {props.url ? (
                <Link href={props.url} >
                    {renderizar()}
                </Link>
            ) : (
                renderizar()
            )}
        </li>
    )
}