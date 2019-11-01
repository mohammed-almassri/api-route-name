import UrlPattern from "url-pattern";
import qs from "qs";
export default class ApiRouteName {
  constructor(routes) {
    this.patterns = this._initRoutePatterns(routes);
  }
  _initRoutePatterns(
    routes,
    args = {},
    prefix = "",
    newName = "",
    retObj = {}
  ) {
    const slashRegex = /(^\/|\/$)/gi;

    //for every route in this object
    for (let [prop, route] of Object.entries(routes)) {
      //continue building the name of this route
      let _newName = newName;
      //if this route has more nested routes
      if (route.routes) {
        //if this route has a name attribute then concatenate it to the upper level name
        if (route.name) {
          _newName = (newName === "" ? "" : newName + ".") + route.name;
        }
        const newPrefix = route.prefix.replace(slashRegex, "");
        //continue recursively searching for the matching route name in the nested routes
        this._initRoutePatterns(
          route.routes,
          args,
          prefix + (newPrefix === "" ? "" : "/" + newPrefix),
          _newName,
          retObj
        );

        //if this object has no nested routes we need to return the url with the provided arguments
      } else {
        //if our route has a name attribute then use it otherwise use the property name

        let namePostfix, pathPostfix;
        if (route.name) {
          namePostfix = route.name;
          pathPostfix = route.endpoint;
        } else {
          console.log(prop, route);

          namePostfix = prop;
          pathPostfix = route;
        }
        pathPostfix = pathPostfix.replace(slashRegex, "");
        _newName = (newName === "" ? "" : newName + ".") + namePostfix;
        //if the newName we constructed matches the name provided by the user
        try {
          retObj[_newName] = new UrlPattern(
            prefix + (pathPostfix === "" ? "" : "/" + pathPostfix)
          );
        } catch (ex) {
          throw new Error('could not parse url: "' + pathPostfix + '"');
        }
      }
    }
    return retObj;
  }
  get(name, args = {}, params = null) {
    let url = this.patterns[name].stringify(args);
    if (params) {
      url += "?" + qs.stringify(params);
    }
    if (this.patterns[name]) return url;
    throw new Error('name: "' + name + '" was not defined in routes');
  }
}
