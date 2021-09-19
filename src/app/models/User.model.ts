export interface User {
    id: number,
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
           nome: string,
           cep: string,
           logradouro: string,
           bairro: string,
           estado: string,
           cidade: string  
    }
    contato: string
    email: string
}