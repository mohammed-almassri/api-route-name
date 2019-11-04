"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _urlPattern = _interopRequireDefault(require("url-pattern"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var slashRegex = /(^\/|\/$)/gi;

var ApiRouteName =
/*#__PURE__*/
function () {
  function ApiRouteName(routes) {
    _classCallCheck(this, ApiRouteName);

    this.patterns = this._initRoutePatterns(routes);
  }

  _createClass(ApiRouteName, [{
    key: "_initRoutePatterns",
    value: function _initRoutePatterns(routes) {
      var _this = this;

      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var subRoutePrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var subRouteName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
      var snowBall = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      routes.forEach(function (_ref) {
        var prefix = _ref.prefix,
            name = _ref.name,
            routes = _ref.routes;
        var newRouteName = subRouteName ? "".concat(subRouteName, ".") : "";
        if (name) newRouteName += name;

        if (routes) {
          var slashlessPrefix = prefix.replace(slashRegex, "");
          var newRoutePrefix = "".concat(subRoutePrefix).concat(slashlessPrefix ? "/".concat(slashlessPrefix) : '');

          _this._initRoutePatterns(routes, args, newRoutePrefix, newRouteName, snowBall);
        } else {
          var slashlessFullRoute = prefix.replace(slashRegex, "");
          var newRoute = "".concat(subRoutePrefix).concat(slashlessFullRoute ? "/".concat(slashlessFullRoute) : "");
          snowBall[newRouteName] = new _urlPattern["default"](newRoute);
        }
      });
      return snowBall;
    }
  }, {
    key: "get",
    value: function get(name) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var params = arguments.length > 2 ? arguments[2] : undefined;
      var url = this.patterns[name].stringify(args);

      if (params) {
        url += "?" + _qs["default"].stringify(params);
      }

      if (this.patterns[name]) return url;
      throw new Error('name: "' + name + '" was not defined in routes');
    }
  }]);

  return ApiRouteName;
}();

exports["default"] = ApiRouteName;