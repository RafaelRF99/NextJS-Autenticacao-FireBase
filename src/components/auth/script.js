dangerouslySetInnerHTML={{
    __html: `
if(!document.cookie?.includes("admin-template-auth")) {
    window.location.href = "/autenticacao"
}
`
}}