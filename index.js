"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParamCheck = function () {
  function ParamCheck(adapter) {
    _classCallCheck(this, ParamCheck);

    this.adapter = adapter;
  }

  _createClass(ParamCheck, [{
    key: "withValidation",
    value: function withValidation(name, schema, callback) {
      var _this = this;

      return function () {
        for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
          params[_key] = arguments[_key];
        }

        var _adapter = _this.adapter(params, schema),
            error = _adapter.error;

        if (!error) return callback.apply(undefined, params);

        throw new Error("ParamCheck:" + name + ":" + error);
      };
    }
  }], [{
    key: "funcContainer",
    value: function funcContainer(fn, cb) {
      try {
        return fn();
      } catch (error) {
        return cb(error);
      }
    }
  }]);

  return ParamCheck;
}();

module.exports = ParamCheck;