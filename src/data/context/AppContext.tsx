import { createContext } from "react";
import { useState } from 'react'

interface AppProviderProps {
    children: any
}

type Tema = "dark" | ''

interface AppContextProps {
    tema?: Tema
    alternarTema?: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props: AppProviderProps) {
    const [tema, setTema] = useState<Tema>('')

    function alternarTema() {
        setTema(tema === '' ? "dark" : "")
        console.log("Alternar")
    }

    return (
        <AppContext.Provider value={{
            tema: tema,
            alternarTema
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContext;