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
			if (this.availability < 1) { return; }

			this.availability -= 1;

			this.updatePrice();
		};

		Stock.prototype.sell = function () {
			if (this.availability > 999) { return; }
			
			this.availability += 1;

			this.updatePrice();
		};

		Stock.prototype.updatePrice = function () {
			this.price = randomisePriceWeightedTowards(this.chartPosition);
		};

		function randomisePriceWeightedTowards(chartPosition) {
			var min = 1;
			var max = 40;
			return (Math.random() * (max - chartPosition)) + min;
		}

		return(Stock);
	})
	.controller('RetreiveArtistStocks', function($scope, Stock) {
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
			artist.stock = new Stock(artist.stock.chartPosition).from(artist.stock);
			artist.stock.buy();
		};

		$scope.sell = function (artist) {
			artist.stock = new Stock(artist.stock.chartPosition).from(artist.stock);
			artist.stock.sell();
		};
	})
	.controller('User', function ($scope) {
		$scope.formattedBalance = '£1000.00';
	});
