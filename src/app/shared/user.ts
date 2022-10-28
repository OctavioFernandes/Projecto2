export type User={
    id?:number,
    nome: string,
    email: string,
    password: string,
    morada: string,
    codigoPostal: string,
    pais: string,
    wishlist?: number[],
    active:boolean
}