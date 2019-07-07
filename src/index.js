import UrlPattern from "url-pattern";

export default function routeName(
    routes,
    name,
    args = {},
    prefix = "",
    newName = ""
) {
    //for every route in this object
    for (let [prop,route] of Object.entries(routes)) {
        //continue building the name of this route
        let _newName = newName;
        //if this route has more nested routes
        if (route.routes) {
            //if this route has a name attribute then concatenate it to the upper level name
            if (route.name) {
                _newName =
                    (newName === "" ? "" : newName + ".") + route.name;
            }
            //continue recursively searching for the matching route name in the nested routes
            const url = routeName(
                route.routes,
                name,
                args,
                prefix + "/" + route.prefix,
                _newName
            );
            //if it did find the matching name return the url else continue
            if (url) return url;
            //if this object has no nested routes we need to return the url with the provided arguments
        } else {
            //if our route has a name attribute then use it otherwise use the property name
            
            let namePostfix,pathPostfix;
            if (route.name) {
                namePostfix= route.name;
                pathPostfix= route.endpoint;
            } else {
                namePostfix=prop
                pathPostfix=route
            }
            _newName =
                (newName === "" ? "" : newName + ".") + namePostfix;
            //if the newName we constructed matches the name provided by the user
            if (_newName === name) {
                return new UrlPattern(prefix+(pathPostfix===""?"":("/" + pathPostfix))).stringify(args);
            }
        }
    }
}
