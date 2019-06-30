"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = route;

var _urlPattern = _interopRequireDefault(require("url-pattern"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function route(routes, name) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var newName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";

  //for every rotute in this object
  for (var i in routes) {
    //continue building the name of this route
    var _newName = newName; //if this route has more neted routes

    if (routes[i].hasOwnProperty("routes")) {
      //if this route has a name attribute then concatenate it to the upper level name
      if (routes[i].hasOwnProperty("name")) {
        _newName = (newName == "" ? "" : newName + ".") + routes[i].name;
      } //continue recursively searching for the matching route name in the nested routes


      var url = route(routes[i].routes, name, args, prefix + "/" + routes[i].prefix, _newName); //if it did find the mtching name return the url else continue

      if (url) return url; //if this object has no nested routes we need to return the url with the provided arguments
    } else {
      //if our route has a name attribute then use it elsewise use the property name
      var _url = prefix;

      if (routes[i].hasOwnProperty("name")) {
        _newName = (newName == "" ? "" : newName + ".") + routes[i].name;
        _url = _url.concat("/" + routes[i].endpoint);
      } else {
        for (var _i = 0, _Object$keys = Object.keys(routes); _i < _Object$keys.length; _i++) {
          var property = _Object$keys[_i];
          if (routes[property] == routes[i]) _newName = (newName == "" ? "" : newName + ".") + property;
          _url = prefix + "/" + routes[i];
        }
      } //console.log(prefix + "/" + routes[i], _newName);
      //if the newName we constructed matches the name provided by the user


      if (_newName === name) {
        return new _urlPattern["default"](_url).stringify(args);
      }
    }
  }
}