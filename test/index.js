const assert = require('chai').assert;
const ApiRouteName = require('../dist/index');
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
                update:":id",
                delete:":id"
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

const router = new ApiRouteName(routes);
describe('Routes', () => {
    it('should be an array',()=>{
        assert.typeOf(routes,'array')
    })
})

describe('Router',()=>{
    it('should return a string for a defined name',()=>{
        assert.typeOf(router.get('accounts.signup'),'string');
    })
    it('should return undefined for an undefined name',()=>{
        assert.typeOf(router.get('accounts.notSignup'),'undefined');
    })
    it('should add the arguments to their correct place in the url',()=>{
        assert.equal(router.get('posts.update',{id:1}),'/api/v1/posts/1');
    })
    it('should return the specified name when a name attribute is specified',()=>{
        assert.equal(router.get('posts.get',{id:1}),'/api/v1/posts/1');
    })
    it('should not return the attribute name when a name attribute is specified',()=>{
        assert.notEqual(router.get('posts.retrieve',{id:1}),'/api/v1/posts/1');
    })
    it('should correctly evaluate the names of different routes with the same endpoint',()=>{
        assert.equal(router.get('posts.update',{id:1}),'/api/v1/posts/1');
        assert.equal(router.get('posts.delete',{id:1}),'/api/v1/posts/1');
    })
})