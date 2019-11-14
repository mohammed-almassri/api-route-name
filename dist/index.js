"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _urlPattern = _interopRequireDefault(require("url-pattern"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var slashRegex = /(^\/|\/$)/gi;
var options = {
  segmentNameCharset: 'a-zA-Z0-9_-'
};

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
      var subRoutePrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var subRouteName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var snowBall = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      routes.forEach(function (_ref) {
        var prefix = _ref.prefix,
            name = _ref.name,
            routes = _ref.routes,
            resources = _ref.resources;
        var newRouteName = subRouteName ? "".concat(subRouteName, ".") : '';
        if (name) newRouteName += name;
        var slashlessPrefix = prefix.replace(slashRegex, '');
        var newRoutePrefix = "".concat(subRoutePrefix).concat(slashlessPrefix ? "/".concat(slashlessPrefix) : '');

        if (routes) {
          _this._initRoutePatterns(routes, args, newRoutePrefix, newRouteName, snowBall);
        }

        if (resources) {
          for (var _i = 0, _Object$entries = Object.entries(resources); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                resourceName = _Object$entries$_i[0],
                resourcePath = _Object$entries$_i[1];

            var resource = "".concat(newRouteName, ".").concat(resourceName.replace(slashRegex));
            var slashlessResourcePath = resourcePath.replace(slashRegex, '');
            var finalPath = "".concat(newRoutePrefix).concat(slashlessResourcePath ? "/".concat(slashlessResourcePath) : '');
            snowBall[resource] = new _urlPattern["default"](finalPath, options);
            console.log(resource, '\t\t\t\t', finalPath);
          }
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
        url += '?' + _qs["default"].stringify(params);
      }

      if (this.patterns[name]) return url;
      throw new Error('name: "' + name + '" was not defined in routes');
    }
  }]);

  return ApiRouteName;
}();

exports["default"] = ApiRouteName;