const ParamsCheck = require("../index")
const funcContainer = ParamsCheck.funcContainer;
// test adapter to check number of params send to function
const adapter = (params, schema) => {
  if (params.length === schema.numberOfParams) {
    let index = 0;
    return {
      error: !(params.filter((p, i) => {
        if (p) 
          return true;
        index = i + 1;
        return false;
      }).length === schema.numberOfParams)
        ? `param${index} is missing!`
        : false
    }
  }
  return {error: 'missing params!'}
};
// create instance with adapter for validation
const paramsCheck = new ParamsCheck(adapter);

// ----------------------------------------------
//from:
const some_function1 = (param1, param2) => {
  try {
    if (!param1) 
      throw new Error('param1 is missing');
    if (!param2) 
      throw new Error('param2 is missing');
    
    return 'Cool all params arrive!' + param1 + param2
  } catch (error) {
    return error.message;
  }
}
//to:
// ----------------------------------------------
const testedFunc = paramsCheck.withValidation("my test func", {
  numberOfParams: 2
}, (param1, param2) => 'Cool all params arrive!' + param1 + param2);
const some_function2 = (param1, param2) => funcContainer(() => testedFunc(param1, param2), (error) => error.message)
// ----------------------------------------------

console.log(some_function1("!", "!"))
console.log(some_function2("!", "!"))

console.log(some_function1("!"))
console.log(some_function2("!"))
