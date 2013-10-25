'use strict';

angular.module('popMarketApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'RetreiveArtistStocks'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
