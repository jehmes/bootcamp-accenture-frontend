export interface User {
    nome: string
    cpf: string
    senha: string
    endereco : {
        cep: string
        logradouro: string
        bairro: string
        cidade: string
        estado: string
    }
    deposito: {
        id: number      
    }
    contato: string
}