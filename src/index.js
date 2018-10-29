class ParamCheck {
  constructor(adapter) {
    this.adapter = adapter;
  }
  static funcContainer(fn, cb) {
    try {
      fn()
    } catch (error) {
      cb(error)
    }
  }
  withValidation(name, schema, callback){
    return (...params) => {
      const {error} = this.adapter(params, schema);
      if (!error) return callback(...params);
      
      throw new Error(`ParamCheck:${name}:${error}`);
    }
  } 
}

module.exports = ParamCheck;