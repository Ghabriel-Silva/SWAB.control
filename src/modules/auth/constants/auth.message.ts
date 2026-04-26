export const authMessages = {
    login: {
        success: 'Login realizado com sucesso',
        invalidCredentials: 'Email ou senha inválidos',
        unauthorized: 'Não autorizado',
        error:'Erro ao acessar, tente novamente',
        inactiveAcount:'Conta inativa'
    },
    register: {
        success: 'Usuário criado com sucesso',
        error: 'Não foi possivel criar usuário',
        emailAlreadyExists: 'Email já está em uso, tente novamente',
        roleIsLab:'Laboratório é obrigatório quando o usuário é LAB'
    },
    token: {
        unauthorized: 'Não autorizado',
        tokenExpired: 'Sessão expirada, faça login novamente',
        tokenNotFound: 'Token não encontrado',
        tokenInvalid: 'Token inválido ou expirado'
    }
}