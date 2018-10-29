import ParamCheck from './index'
const funcContainer = ParamCheck.funcContainer //optional container to catch the error throw;
const adapter = (params, schema) => params.length == schema.numberOfParams ? ({error:null}) :  ({error:'missing params!'}); // test adapter to check number of params send to function
const paramCheck = new ParamCheck(adapter); // create instance with adapter for validation

const testFunc = (a, b, c) => a + b + c; // test function
const testedFunc = paramCheck.withValidation(testFunc.name, {numberOfParams:3}, testFunc); // composition 

test('to throw', () => { 
  let isThrow = false;
  funcContainer(()=>testedFunc(1, 2),(error)=> {console.log(error); isThrow = true;}); //will throw error missing param, got 2 instead of 3;
  expect(isThrow).toBe(true);
});

test('to pass', () => {
  expect(testedFunc(1, 2, 3)).toBe(6);
});