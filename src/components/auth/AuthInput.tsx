interface AuthInputProps {
    label: string
    valor: string
    obrigatorio?: boolean
    naoRenderizar?: boolean
    tipo?: 'text' | 'email' | 'password'
    valorMudou: (novoValor: any) => void
}

export default function AuthInput(props: AuthInputProps) {
    return props.naoRenderizar ? null : (
        <div className={`flex flex-col`}>
            <label>{props.label}</label>
            <input className={`
            px-4 py-3 rounded-lg bg-gray-200
            `} type={props.tipo ?? 'text'} value={props.valor} required={props.obrigatorio}
             onChange={e => props.valorMudou?.(e.target.value)} />
        </div>
    )
}