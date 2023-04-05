import { IconeLua, IconeSol } from "../icons"

interface BotaoAlternarTemaProps {
    tema: string | undefined
    alternarTema?: () => void
}

export default function BotaoAlternarTema(props: BotaoAlternarTemaProps) {
    return props.tema === 'dark' ? (
        <div className={`
        hidden sm:flex items-center cursor-pointer
        bg-gradient-to-r from-yellow-300 to-yellow-600
        w-14 h-8 p-1 rounded-full
        `}
            onClick={props.alternarTema}>
            <div className={`
            flex items-center justify-center
            bg-white text-yellow-600
            w-6 h-6 rounded-full
        `}>
                {IconeSol("w-5 h-5")}
            </div>
            <div className={`
            hidden lg:flex items-center ml-4
            text-white
        `}>
            </div>
        </div>
    ) : (
        <div className={`
        hidden sm:flex items-center justify-end cursor-pointer
        bg-gradient-to-r from-gray-500 to-gray-900
        w-14 h-8 p-1 rounded-full
        `}
            onClick={props.alternarTema}>
            <div className={`
            hidden lg:flex items-center mr-2
            text-gray-300
        `}>
            </div>
            <div className={`
            flex items-center justify-center
            bg-black text-yellow-300
            w-6 h-6 rounded-full
        `}>
                {IconeLua("w-5 h-5")}
            </div>

        </div>
    )
}