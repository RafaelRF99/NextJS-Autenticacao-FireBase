import { createContext, useEffect } from "react";
import { useState } from 'react'

interface AppProviderProps {
    children: any
}

interface AppContextProps {
    tema?: string
    alternarTema?: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props: AppProviderProps) {
    const [tema, setTema] = useState('')

    function alternarTema() {
        const novoTema = tema === '' ? "dark" : ""
        setTema(novoTema)
        localStorage.setItem('tema', novoTema)
    }

    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema')
        if (temaSalvo) {
            return setTema(temaSalvo)
        }
    }, [])

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