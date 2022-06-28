//ESSE ARQUIVO TEM DE CORRER DENTRO DA PASTA __TESTS__ com o comando yarn test ou o watch
import { formatPrice } from "util/formatters";

//O FORMATO PARA TESTAR VEM COM O TEST ou IT('FRASE DO QUE QUERO TESTAR ACONTECER', FUNCAO LAMBDA COM OS AAA)
test('formatPrice should format number to pt-br WHEN given 10.1', ()=>{
  //ARRANGE
  //PREPARAR O VALOR
    const value = 10.1;

  //ACT
  //CHAMO A FUNCAO que eu criei para o projeto e estou testando
  const result = formatPrice(value)

  //ASSERT
  //TESTA SE REALMENTE O RESULTADO VAI SER O QUE EU ESPERO USANDO O EXPECT
  expect(result).toEqual("10,10")

})

//FORMA MAIS USUAL DE SE ESCREVER TESTE
describe('formatPrice for positive numbers', ()=>{
  test('formatPrice should format number to pt-br WHEN given 10.1', ()=>{
    const result = formatPrice(10.1)
    expect(result).toEqual('10,10')
  })
  test('formatPrice should format number to pt-br WHEN given 0.1', ()=>{
    const result = formatPrice(0.1)
    expect(result).toEqual('0,10')
  })
})

//TAMBEM SE TRABALHA COM O BEFOREEACH E AFTEREACH NO DESCRIBE