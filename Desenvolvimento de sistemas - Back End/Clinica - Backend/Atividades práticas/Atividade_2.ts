class Funcionario {
    nome:string
    salarioBase:number


    constructor(nome:string, salarioBase:number){
        this.nome = nome
        this.salarioBase = salarioBase
    }

    calcularSalario():number {
        return this.salarioBase
    }
}

class Programador extends Funcionario {
    calcularSalario(): number {
        return this.salarioBase + (this.salarioBase * 0.3)
    }
}

class Designer extends Funcionario {
    calcularSalario(): number {
        return this.salarioBase + (this.salarioBase * 0.2)
    }
}

const servo = new Programador ('João', 5000)
const serva = new Programador ('Camila', 3000)

console.log(`Salário R$: ${servo.calcularSalario()}`)
console.log(`Salário R$: ${serva.calcularSalario()}`)
