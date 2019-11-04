import UrlPattern from "url-pattern";
import qs from "qs";

const slashRegex = /(^\/|\/$)/gi;

export default class ApiRouteName {
  constructor(routes) {
    this.patterns = this._initRoutePatterns(routes);
  }

  _initRoutePatterns(
    routes,
    args = {},
    subRoutePrefix = "",
    subRouteName = "",
    snowBall = {}
  ) {
    routes.forEach(({ prefix, name, routes }) => {
      let newRouteName = subRouteName ? `${subRouteName}.` : ""
      if (name) newRouteName += name
      if (routes) {
        const slashlessPrefix = prefix.replace(slashRegex, "")
        const newRoutePrefix = `${subRoutePrefix}${slashlessPrefix ? `/${slashlessPrefix}` : '' }`
        this._initRoutePatterns(routes, args, newRoutePrefix, newRouteName, snowBall);
      } else {
        const slashlessFullRoute = prefix.replace(slashRegex, "")
        const newRoute = `${subRoutePrefix}${slashlessFullRoute ? `/${slashlessFullRoute}` : ""}`
        snowBall[newRouteName] = new UrlPattern(newRoute)
      }
    })
    return snowBall;
  }

  get(name, args = {}, params) {
    let url = this.patterns[name].stringify(args);
    if (params) {
      url += "?" + qs.stringify(params);
    }
    if (this.patterns[name]) return url;
    throw new Error('name: "' + name + '" was not defined in routes');
  }
}
