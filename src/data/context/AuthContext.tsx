import { createContext } from "react";
import firebase from "../../firebase/config";
import IUsuario from "@/model/IUsuario";
import { useState } from "react";
import Router from "next/router";

interface AuthContextProps {
    usuario?: IUsuario
    loginGoogle?: () => Promise<void>
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


export function AuthProvider(props: any) {
    const [usuario, setUsuario] = useState<IUsuario>()

    async function loginGoogle() {
        const res = await firebase.auth().signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        )
        if (res.user?.email) {
            const usuario = await usuarioNormalizado(res.user)
            setUsuario(usuario);
            Router.push('/')
        }
    }

    return (
        <AuthContext.Provider value={{
            usuario,
            loginGoogle
        }} >
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContext;