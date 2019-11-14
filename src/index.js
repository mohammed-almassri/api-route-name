import UrlPattern from 'url-pattern';
import qs from 'qs';

const slashRegex = /(^\/|\/$)/gi;
const options = {
  segmentNameCharset: 'a-zA-Z0-9_-',
};
export default class ApiRouteName {
  constructor(routes) {
    this.patterns = this._initRoutePatterns(routes);
  }

  _initRoutePatterns(
    routes,
    args = {},
    subRoutePrefix = '',
    subRouteName = '',
    snowBall = {}
  ) {
    routes.forEach(({ prefix, name, routes, resources }) => {
      let newRouteName = subRouteName ? `${subRouteName}.` : '';
      if (name) newRouteName += name;
      const slashlessPrefix = prefix.replace(slashRegex, '');
      const newRoutePrefix = `${subRoutePrefix}${
        slashlessPrefix ? `/${slashlessPrefix}` : ''
      }`;
      if (routes) {
        this._initRoutePatterns(
          routes,
          args,
          newRoutePrefix,
          newRouteName,
          snowBall
        );
      }
      if (resources) {
        for (let [resourceName, resourcePath] of Object.entries(resources)) {
          const resource = `${newRouteName}.${resourceName.replace(
            slashRegex
          )}`;
          const slashlessResourcePath = resourcePath.replace(slashRegex, '');
          const finalPath = `${newRoutePrefix}${
            slashlessResourcePath ? `/${slashlessResourcePath}` : ''
          }`;
          snowBall[resource] = new UrlPattern(finalPath, options);
          console.log(resource, '\t\t\t\t', finalPath);
        }
      }
    });
    return snowBall;
  }

  get(name, args = {}, params) {
    let url = this.patterns[name].stringify(args);
    if (params) {
      url += '?' + qs.stringify(params);
    }
    if (this.patterns[name]) return url;
    throw new Error('name: "' + name + '" was not defined in routes');
  }
}
