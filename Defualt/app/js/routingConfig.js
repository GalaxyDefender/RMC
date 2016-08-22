angular.module('module', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/app.html"
    })
    .state('app.landing', {
      url: '/landing',
      views: {
        'main': {
          templateUrl: 'templates/landing.html'
        }
      }
    })
    .state('app.contact', {
      url: '/contact',
      views: {
        'main': {
          templateUrl: 'templates/contact.html'
        }
      }
    })
  $urlRouterProvider.otherwise('/app/landing');
})
