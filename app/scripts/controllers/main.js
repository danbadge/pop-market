'use strict';

angular.module('popMarketApp')
	.factory('Stock', function() {
		function Stock(chartPosition) {
			this.chartPosition = chartPosition;
			this.price = randomisePriceWeightedTowards(chartPosition);
			this.totalShares = 1000;
			this.availability = 1000;
			this.formattedPrice = '£' + this.price.toFixed(2);
		}

		Stock.prototype.from = function (existingStock) {
			this.price = existingStock.price;
			this.totalShares = 1000;
			this.availability = existingStock.availability;
			this.formattedPrice = '£' + this.price.toFixed(2);
			return this;
		};

		Stock.prototype.buy = function () {
			this.availability -= 10;

			this.increasePrice();
		};

		Stock.prototype.sell = function () {
			this.availability += 10;

			this.decreasePrice();
		};

		Stock.prototype.increasePrice = function () {
			this.updatePriceBasedOn(1);
		};

		Stock.prototype.decreasePrice = function () {
			this.updatePriceBasedOn(-1);
		};

		function randomisePriceWeightedTowards(chartPosition) {
			var min = 1;
			var max = 40;
			return (Math.random() * (max - chartPosition)) + min;
		}

		Stock.prototype.updatePriceBasedOn = function(direction) {
			if ((this.availability % 40) !== 0) { return; }

			var ratio = 0.0001 * this.availability + 0.0005 * (this.totalShares - this.availability);
			this.price += 0.001 * this.price + direction * ratio * this.price;
			this.formattedPrice = '£' + this.price.toFixed(2);
		};

		return(Stock);
	})
	.factory('UserService', function($rootScope) {
		$rootScope.balance = 1000.00;
		$rootScope.formattedBalance = '£' + $rootScope.balance.toFixed(2);

		return {
			spent: function(amount) {
				$rootScope.balance -= amount;
				$rootScope.formattedBalance = '£' + $rootScope.balance.toFixed(2);
			},
			sold: function(amount) {
				$rootScope.balance += amount;
				$rootScope.formattedBalance = '£' + $rootScope.balance.toFixed(2);
			}
		};
	})
	.controller('RetreiveArtistStocks', function($scope, Stock, UserService) {
		$scope.artists = [
			{ 'chartPosition': 1, 'name' : 'John Newman', 'stock' : new Stock(1) },
			{ 'chartPosition': 2, 'name' : 'Reconnected', 'stock' : new Stock(2) },
			{ 'chartPosition': 3, 'name' : 'Miley Cyrus', 'stock' : new Stock(3) },
			{ 'chartPosition': 4, 'name' : 'Lissie', 'stock' : new Stock(4) },
			{ 'chartPosition': 5, 'name' : 'The Saturdays', 'stock' : new Stock(5) },
			{ 'chartPosition': 6, 'name' : 'Anthrax', 'stock' : new Stock(6) },
			{ 'chartPosition': 7, 'name' : 'Paul McCartney', 'stock' : new Stock(7) },
			{ 'chartPosition': 8, 'name' : 'James Blunt', 'stock' : new Stock(8) },
			{ 'chartPosition': 9, 'name' : 'Katy Perry', 'stock' : new Stock(9) },
			{ 'chartPosition': 10, 'name' : 'Eminem', 'stock' : new Stock(10) }
		];

		$scope.buy = function (artist) {
			if (artist.stock.availability === 1) { return; }

			artist.stock = new Stock(artist.stock.chartPosition).from(artist.stock);
			artist.stock.buy();
			UserService.spent(artist.stock.price);
		};

		$scope.sell = function (artist) {
			if (artist.stock.availability > 999) { return; }

			artist.stock = new Stock(artist.stock.chartPosition).from(artist.stock);
			artist.stock.sell();
			UserService.sold(artist.stock.price);
		};
	});