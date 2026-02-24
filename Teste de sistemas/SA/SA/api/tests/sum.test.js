
test('soma de dois mais dois', () => {
    expect(2 + 2).toBe(4);
});

const can = {
  name: 'pamplemousse',
  ounces: 12,
};

describe('the can', () => {
  test('has 12 ounces', () => {
    expect(can.ounces).toBe(12);
  });

  test('has a sophisticated name', () => {
    expect(can.name).toBe('pamplemousse');
  });
});

const aluno = {
    name: 'Isaac',
    age: 18
}

test('nome correto', () => {
    expect(aluno.name).toBe('Isaac')
})
test('idade correta', () => {
    expect(aluno.age).toBe(18)
})

const fruit01 = {
  flavor: 'grapefruit',
  ounces: 12,
};
const fruit02 = {
  flavor: 'grapefruit',
  ounces: 12,
};

describe('the La Croix cans on my desk', () => {
  test('have all the same properties', () => {
    expect(fruit01).toEqual(fruit02);
  });
  test('are not the exact same can', () => {
    expect(fruit01).not.toEqual(fruit02);
  });
});

const car01 = {
  model: 'Honda',
  plate: 2345,
};
const car02 = {
  model: 'Honda',
  plate: 2345,
};

describe('Carros', () => {
  test('carros iguais', () => {
    expect(car01).toEqual(car02);
  });
  test('carro não iguais', () => {
    expect(car01).not.toEqual(car02);
  });
});