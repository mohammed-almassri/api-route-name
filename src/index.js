import UrlPattern from "url-pattern";

export default function route(
    routes,
    name,
    args = {},
    prefix = "",
    newName = ""
) {
    //for every rotute in this object
    for (let i in routes) {
        //continue building the name of this route
        let _newName = newName;
        //if this route has more neted routes
        if (routes[i].hasOwnProperty("routes")) {
            //if this route has a name attribute then concatenate it to the upper level name
            if (routes[i].hasOwnProperty("name")) {
                _newName =
                    (newName == "" ? "" : newName + ".") + routes[i].name;
            }
            //continue recursively searching for the matching route name in the nested routes
            let url = route(
                routes[i].routes,
                name,
                args,
                prefix + "/" + routes[i].prefix,
                _newName
            );
            //if it did find the mtching name return the url else continue
            if (url) return url;
            //if this object has no nested routes we need to return the url with the provided arguments
        } else {
            //if our route has a name attribute then use it elsewise use the property name
            let url = prefix;
            if (routes[i].hasOwnProperty("name")) {
                _newName =
                    (newName == "" ? "" : newName + ".") + routes[i].name;
                url = url.concat("/" + routes[i].endpoint);
            } else {
                for (let property of Object.keys(routes)) {
                    if (routes[property] == routes[i])
                        _newName =
                            (newName == "" ? "" : newName + ".") + property;
                    url = prefix + "/" + routes[i];
                }
            }
            //console.log(prefix + "/" + routes[i], _newName);
            //if the newName we constructed matches the name provided by the user
            if (_newName === name) {
                return new UrlPattern(url).stringify(args);
            }
        }
    }
}
