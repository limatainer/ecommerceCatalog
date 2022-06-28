import { formatPrice } from "util/formatters";

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

describe('formatPrice for non positive numbers', ()=>{
  test('formatPrice should format number to pt-br WHEN given 0', ()=>{
    const result = formatPrice(0)
    expect(result).toEqual('0,00')
  })
  test('formatPrice should format number to pt-br WHEN given -5.1', ()=>{
    const result = formatPrice(-5.1)
    expect(result).toEqual('-5,10')
  })
})