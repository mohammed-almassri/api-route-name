const assert = require('chai').assert;
const ApiRouteName = require('../dist/index').default;
const routes = [
  {
    prefix: '/api/v1',
    routes: [
      {
        prefix: '',
        name: 'accounts',
        resources: {
          signup: '/signup',
          login: 'login/',
          logout: '/logout/',
        },
      },
      {
        prefix: 'posts',
        name: 'posts',
        resources: {
          index: '/',
          create: 'create',
          like: ':id/like',
          share: ':id/share',
          update: ':id',
          delete: ':id',
        },
      },
      {
        prefix: 'users',
        name: 'users',
        resources: { posts: ':id/posts' },
      },
      {
        prefix: 'search',
        name: 'search',
        resources: { search: '' },
      },
      {
        prefix: 'chat',
        name: 'chat',
        resources: {
          get: ':chat_id',
          sendMessage: ':chat_id/send',
        },
        routes: [
          {
            prefix: 'chat-requests/:request_id',
            name: 'chatRequests',
            resources: {
              get: '',
              process: '',
            },
          },
        ],
      },
    ],
  },
];

const router = new ApiRouteName(routes);

describe('Router', () => {
  it('should return a string for a defined name', () => {
    assert.typeOf(router.get('accounts.signup'), 'string');
  });
  it('should throw an error when the input name is not defined in routes', () => {
    assert.throws(() => router.get('accounts.notSignup'));
  });
  it('should add the arguments to their correct place in the url', () => {
    assert.equal(router.get('posts.update', { id: 1 }), '/api/v1/posts/1');
  });
  it('should correctly evaluate the names of different routes with the same endpoint', () => {
    assert.equal(router.get('posts.update', { id: 1 }), '/api/v1/posts/1');
    assert.equal(router.get('posts.delete', { id: 1 }), '/api/v1/posts/1');
  });
  it('should ignore slashes for namespaces with empty prefixes', () => {
    assert.equal(router.get('accounts.signup'), '/api/v1/signup');
  });
  it('should ignore slashes for empty endpoints', () => {
    assert.equal(router.get('posts.index'), '/api/v1/posts');
  });
  it('should ignore slashes added by user', () => {
    assert.equal(router.get('accounts.signup'), '/api/v1/signup');
    assert.equal(router.get('accounts.login'), '/api/v1/login');
    assert.equal(router.get('accounts.logout'), '/api/v1/logout');
  });
  it('should add query parameters', () => {
    assert.equal(
      router.get(
        'search.search',
        {},
        { query: 'john', type: ['name', 'email'] }
      ),
      '/api/v1/search?query=john&type%5B0%5D=name&type%5B1%5D=email'
    );
  });
  it('should allow multi-level resources', () => {
    assert.equal(
      router.get('chat.sendMessage', { chat_id: 1 }),
      '/api/v1/chat/1/send'
    );
    assert.equal(
      router.get('chat.chatRequests.get', { request_id: 2 }),
      '/api/v1/chat/chat-requests/2'
    );
  });
});
