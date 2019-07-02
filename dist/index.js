"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = routeName;

var _urlPattern = _interopRequireDefault(require("url-pattern"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function routeName(routes, name) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var newName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";

  //for every route in this object
  for (var _i = 0, _Object$values = Object.values(routes); _i < _Object$values.length; _i++) {
    var route = _Object$values[_i];
    //continue building the name of this route
    var _newName = newName; //if this route has more nested routes

    if (route.routes) {
      //if this route has a name attribute then concatenate it to the upper level name
      if (route.name) {
        _newName = (newName === "" ? "" : newName + ".") + route.name;
      } //continue recursively searching for the matching route name in the nested routes


      var url = routeName(route.routes, name, args, prefix + "/" + route.prefix, _newName); //if it did find the matching name return the url else continue

      if (url) return url; //if this object has no nested routes we need to return the url with the provided arguments
    } else {
      //if our route has a name attribute then use it otherwise use the property name
      var namePostfix = void 0,
          pathPostfix = void 0;

      if (route.name) {
        namePostfix = route.name;
        pathPostfix = route.endpoint;
      } else {
        for (var _i2 = 0, _Object$keys = Object.keys(routes); _i2 < _Object$keys.length; _i2++) {
          var property = _Object$keys[_i2];
          if (routes[property] === route) namePostfix = property;
        }

        pathPostfix = route;
      }

      _newName = (newName === "" ? "" : newName + ".") + namePostfix; //if the newName we constructed matches the name provided by the user

      if (_newName === name) {
        return new _urlPattern["default"](prefix + "/" + pathPostfix).stringify(args);
      }
    }
  }
}