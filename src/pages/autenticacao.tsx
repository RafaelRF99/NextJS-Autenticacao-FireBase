import Link from "next/link";
import AuthInput from "../components/auth/AuthInput";
import { useState } from "react";
import { IconeAtencao } from "@/components/icons";

export default function Autenticacao() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [erro, setErro] = useState(null)

    function submeter() {
        if (modo === 'login') {
            console.log('login')
            exibirErro("Ocorreu um erro")
        } else (
            console.log('cadastrar')
        )
    }

    function exibirErro(msg: any, tempo = 2000) {
        setErro(msg)
        setTimeout(() => setErro(null), tempo)
    }

    return (
        <div className="h-screen w-screen pt-20 bg-gray-300">
            <div className={`sm:mx-auto sm:max-w-lg sm:px-10`}>
                <h1 className={`
            text-xl font-semibold mb-5
            `}>{modo === 'login' ? "Entre com a sua conta" : "Cadastre-se na Plataforma"}</h1>
                {erro ? (
                    <div className={`
                    flex items-center
                bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg
                `}>{IconeAtencao()}
                        <span className="mx-2">{erro}</span>
                    </div>
                ) : false}
                <AuthInput label="Email" tipo="email" valor={email} valorMudou={setEmail} obrigatorio={true} />
                <AuthInput label="Senha" tipo="password" valor={senha} valorMudou={setSenha} obrigatorio={true} />
                <button className={`
            w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6
            `} onClick={submeter}>{modo === 'login' ? "Entrar" : "Cadastrar"}</button>

                {modo === 'login' ? (
                    <>
                        <hr className="my-6 border-gray-700 w-full" />
                        <button className={`
                w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3
                `} onClick={submeter}>Entrar com Google</button>
                    </>
                ) : ''}

                {modo === 'login' ? (
                    <p className="mt-8">
                        Não tem conta ainda?
                        <Link className={`
                    text-blue-500 hover:text-blue-700 font-semibold cursor-pointer mx-3
                    `} href="" onClick={() => setModo('cadastro')}>
                            Crie sua conta aqui
                        </Link>
                    </p>
                ) : (
                    <p className="mt-8">
                        Já tem conta criada?
                        <Link className={`
                    text-blue-500 hover:text-blue-700 font-semibold cursor-pointer mx-3
                    `} href="" onClick={() => setModo('login')}>
                            Entre com a sua conta aqui
                        </Link>
                    </p>
                )}
            </div>
        </div>
    )
}