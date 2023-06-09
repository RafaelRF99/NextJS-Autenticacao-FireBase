import useAuth from "@/data/hook/useAuth";
import { IconeAjustes, IconeCasa, IconeLogout, IconeSino } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function MenuLateral() {
    const { logout } = useAuth()

    return (
        <aside className={`flex flex-col 
        bg-gray-200 text-gray-700 
        dark:bg-gray-900 `}>
            <div className={`
            flex flex-col items-center justify-center
            bg-gradient-to-bl from-indigo-500 to-purple-600
            dark:from-slate-700 dark:to-gray-950
            h-20 w-24
            `}>
                <Logo />
            </div>
            <ul className={`flex-grow flex flex-col items-center`}>
                <MenuItem url="/" texto="Início" icone={IconeCasa} />
                <MenuItem url="/ajustes" texto="Ajustes" icone={IconeAjustes} />
                <MenuItem url="/notificacoes" texto="Notificações" icone={IconeSino} />
            </ul>
            <ul>
                <MenuItem className={`text-red-600 hover:bg-red-400 hover:text-white 
                dark:text-red-400 dark:hover:text-white`}
                    texto="Sair" icone={IconeLogout}
                    onClick={logout} />
            </ul>
        </aside>
    )
}