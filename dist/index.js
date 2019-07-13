"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _urlPattern = _interopRequireDefault(require("url-pattern"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
      var newName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
      var retObj = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      //for every route in this object
      for (var _i = 0, _Object$entries = Object.entries(routes); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            prop = _Object$entries$_i[0],
            route = _Object$entries$_i[1];

        //continue building the name of this route
        var _newName = newName; //if this route has more nested routes

        if (route.routes) {
          //if this route has a name attribute then concatenate it to the upper level name
          if (route.name) {
            _newName = (newName === "" ? "" : newName + ".") + route.name;
          } //continue recursively searching for the matching route name in the nested routes


          this._initRoutePatterns(route.routes, args, prefix + (route.prefix === "" ? "" : "/" + route.prefix), _newName, retObj); //if this object has no nested routes we need to return the url with the provided arguments

        } else {
          //if our route has a name attribute then use it otherwise use the property name
          var namePostfix = void 0,
              pathPostfix = void 0;

          if (route.name) {
            namePostfix = route.name;
            pathPostfix = route.endpoint;
          } else {
            namePostfix = prop;
            pathPostfix = route;
          }

          _newName = (newName === "" ? "" : newName + ".") + namePostfix; //if the newName we constructed matches the name provided by the user

          retObj[_newName] = new _urlPattern["default"](prefix + (pathPostfix === "" ? "" : "/" + pathPostfix));
        }
      }

      return retObj;
    }
  }, {
    key: "get",
    value: function get(name) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (this.patterns[name]) return this.patterns[name].stringify(args);
      return undefined;
    }
  }]);

  return ApiRouteName;
}();

exports["default"] = ApiRouteName;