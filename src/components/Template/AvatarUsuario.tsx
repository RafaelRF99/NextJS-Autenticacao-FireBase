import useAuth from "@/data/hook/useAuth";
import Link from "next/link";
import Avatar from '../../../public/images/avatar.svg'

interface AvatarUsuarioProps {
    className: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const { usuario } = useAuth()

    function avatarIcone() {
        if (!usuario?.imagemUrl) {
            return "/images/avatar.svg"
        } else {
            return usuario.imagemUrl
        }
    }

    return (
        <div>
            <Link href="/perfil">
                <img className={`h-10 w-10 rounded-full cursor-pointer 
                ${props.className}`}
                    src={avatarIcone()} alt="Avatar" />
            </Link>
        </div>
    )
}