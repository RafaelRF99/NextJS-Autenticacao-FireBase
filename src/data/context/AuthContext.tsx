import { createContext, useEffect } from "react";
import firebase from "../../firebase/config";
import IUsuario from "@/model/IUsuario";
import { useState } from "react";
import Router from "next/router";
import Cookies from 'js-cookie';

interface AuthContextProps {
    usuario?: IUsuario | null
    loginGoogle?: () => Promise<void>
    logout?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<IUsuario> {
    const token = await usuarioFirebase.getIdToken();
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName ? usuarioFirebase.displayName : "",
        email: usuarioFirebase.email ? usuarioFirebase.email : "",
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId ? usuarioFirebase.providerData[0]?.providerId : "",
        imagemUrl: usuarioFirebase.photoURL ? usuarioFirebase.photoURL : ""
    }
}

function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set('admin-template-auth', `${logado}`, {
            expires: 10
        })
    } else {
        Cookies.remove('admin-template-auth')
    }
}


export function AuthProvider(props: any) {
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<IUsuario | null>(null)

    async function configurarSessao(usuarioFirebase: firebase.User | null) {
        if (usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            setUsuario(null)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function loginGoogle() {
        try {
            setCarregando(true)
            const res = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
            configurarSessao(res.user!)
            Router.push('/')
        } finally {
            setCarregando(false)
        }
    }

    async function logout() {
        try {
            setCarregando(true)
            await firebase.auth().signOut()
            await configurarSessao(null)
        } finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if (Cookies.get('admin-template-auth')) {
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
            return () => cancelar()
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            usuario,
            loginGoogle,
            logout
        }} >
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthContext;