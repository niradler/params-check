### Params Check

```javascript
//npm i -S params-check --production
const ParamsCheck = require('params-check')
//optional container to catch the error throw;
const funcContainer = ParamsCheck.funcContainer;
// test adapter to check number of params send to function
const adapter = (params, schema) => {
  if(params.length == schema.numberOfParams) {
    return {error:null}
  } 
  return {error:'missing params!'}
}; 
// create instance with adapter for validation
const paramsCheck = new ParamsCheck(adapter); 
// test function
const testFunc = (a, b, c) => a + b + c; 
const validationRules = {
  numberOfParams:3
}
// composition 
const testedFunc = paramsCheck.withValidation(testFunc.name, validationRules, testFunc); 

test('to throw', () => { 
  let isThrow = false;
  //will throw error missing param, got 2 instead of 3;
  funcContainer(()=>testedFunc(1, 2),(error)=> {console.log(error); isThrow = true;}); 
  expect(isThrow).toBe(true);
});

test('to pass', () => {
  expect(testedFunc(1, 2, 3)).toBe(6);
});
```

## Demo

[runkit](https://runkit.com/niradler/5bd797402b601900123e01c4)
