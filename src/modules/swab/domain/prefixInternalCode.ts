//O prefix retornado aqui segue a seguinte estrutura 
//"SW" que é incial de swab 
//"26" ano 2 ultimos numeros 
//"05" mês de referencia
//A desição desse lote foi tomado de forma que o operador consiga identificar informações de maneira facil
//estrutura final ex: "SW2605"
//Imprementações futura pode definir a sigla incial pegando via BD ao ivés de ter algo fixo como é o caso
export function prefixInternalCode() {
    const date = new Date()
    const year = String(date.getFullYear()).slice(-2)
    const month = String(date.getMonth() + 1).padStart(2, '0')

    return `SW${year}${month}`
}