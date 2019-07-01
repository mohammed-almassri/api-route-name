const assert = require('chai').assert;
const route = require('../dist/index').default;
const routes = [{
    prefix : 'api/v1',
    routes:[
        {
            prefix:"accounts",
            name:"accounts",
            routes:{
                signup:"signup",
                login:"login",
                logout:"logout"
            }
        },
        {
           prefix:"posts",
           name:"posts",
           routes:{
               index:"",
               create:"create",
               like:":id/like",
               share:":id/share",
               retrieve:{
                    name:"get",
                    endpoint:":id"
               },
                update:{
                    name:"update",
                    endpoint:":id"
                },
                delete:{
                name:"delete",
                endpoint:":id"
                },
            
           }
       },
       {
           prefix:"users",
           name:"users",
           routes:{
              posts:":id/posts"
           }
       }
    ]
}]

describe('Routes', () => {
    it('should be an array',()=>{
        assert.typeOf(routes,'array')
    })
})

describe('Router',()=>{
    it('should return a string for a defined name',()=>{
        assert.typeOf(route(routes,'accounts.signup'),'string');
    })
    it('should return undefined for an undefined name',()=>{
        assert.typeOf(route(routes,'accounts.notSignup'),'undefined');
    })
    it('should add the arguments to their correct place in the url',()=>{
        assert.equal(route(routes,'posts.update',{id:1}),'/api/v1/posts/1');
    })
    it('should return the specified name when a name attribute is specified',()=>{
        assert.equal(route(routes,'posts.get',{id:1}),'/api/v1/posts/1');
    })
    it('should not return the attribute name when a name attribute is specified',()=>{
        assert.notEqual(route(routes,'posts.retrieve',{id:1}),'/api/v1/posts/1');
    })
})