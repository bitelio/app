'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var userCtrlStub = {
  changePassword: 'userCtrl.changePassword',
  show: 'userCtrl.show'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return `authService.hasRole.${role}`;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var userIndex = proxyquire('./index', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './user.controller': userCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('User API Router:', function() {
  it('should return an express router instance', function() {
    expect(userIndex).to.equal(routerStub);
  });

  describe('PUT /api/users/:id/password', function() {
    it('should be authenticated and route to user.controller.changePassword', function() {
      expect(routerStub.put
        .withArgs('/:id/password', 'authService.isAuthenticated', 'userCtrl.changePassword')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/users/:id', function() {
    it('should be authenticated and route to user.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'authService.isAuthenticated', 'userCtrl.show')
        ).to.have.been.calledOnce;
    });
  });
});
