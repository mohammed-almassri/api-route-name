# Api Route Name

give names to your api endpoints and easily get their url.

## Usage

import the function:

`var routeNames = require('api-route-name');`

declare an object or array of routes as so:

```javascript
const routes = [
	prefix:"/api/v1",
    routes:[
    	signup:"signup",
        login:"login",
        user:'user/:id'
    ]
]
```

the `routeNames` function takes three arguments:

-   `routes` the routes array we declared
-   `name` the name of the route we want to get the url of
-   `args (optional)` any arguments to pass to the url such as the id of the users

```javascript
const signup = routeNames(routes, "signup");
//returns /api/v1/signup
const user = routeNames(routes, "user", { id: 10 });
//returns /api/v1/user/10
```

## Urls and Names

the `prefix` attribute specifies a prefix for all the routes in the `routes` array.
any object with a `prefix` should have a `name` attribute.

every `routes` can have a nested `routes`, in that case it should have a `prefix` and a `name`.
if it does not the route names will be taken from the attribute names and the endpoints from the attribute values.

a route in a route object like

```javascript
{
prefix:"prefix1",
name"name1"
routes:[
	{
    prefix:"prefix2",
    name"name2"
    routes:[
        {
          prefix:"prefix3",
          name"name3"
          routes:{
          	routeName:"routeURL"
          }
        }
    ]
    }
]
}
```

will have the name `name1.name2.name3.routeName` and an endpoint of `prefix1/prefix2/prefix3/routeURL`

the name is taken from the attribute name. you can specify a name explicitly but then you also have to specify and endpoint.
`routeName:{name:"routeName2",endpoint:"routeURL2"}`

In case you have multiple routes with the same endpoint (such as the same url but with diffrent http methods) you **have** to specify a name. for example a CRUD application

```javascript
routes: {
    create: "create",
    retrieve: { endpoint: ":id", name: "retrieve" },
    update: { endpoint: ":id", name: "update" },
    delete: { endpoint: ":id", name: "delete" },
}
```

## Arguments

api-route-name uses the [url-pattren](https://www.npmjs.com/package/url-pattern) library for it's pattern matching so consider reading it's docs.

you can add arguments to your urls by adding a colon before the argument name. for example you want to get the posts for a specific user you would do the following:

```javascript
{
...
userPosts:"users/:id/posts"
}
```

then to retrieve the posts for user with id 21

```javascript
const posts = routeNames(routes, "userPost", { id: 21 });
//returns {prefix you specified}/user/21/posts
```

you can add multiple arguments `blogsByDate : "users/:name/blogposts/:date"`

and get the url with `routeNames(routes,'blogsByDate',{{name:"John Doe",date"2019-1-2"}})`
