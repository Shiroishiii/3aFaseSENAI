import { createUser } from "../src/userService"

test ('Teste de sucesso - Criar user', () => {
    const result = createUser ({
        name: "Pedrinho",
        age: 20
    })

    expect(result.name).toBe("Pedrinho")
    expect(result.age).toBe(20)
    expect(result.isActive).toBe(true)
    expect(result.roles).toEqual(['user'])
    expect(result.id).toBeDefined()
})

test ('Teste de erro - user sem nome', () =>{
    expect(() => createUser({age: 20})).toThrow('O nome do usuário é obrigatório')
})

test ('Teste de erro - user sem idade', () =>{
    expect(() => createUser({name:'Anna', age: 16})).toThrow('O usuário deve ser maior de idade')
})