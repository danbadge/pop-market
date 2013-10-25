'use strict';

angular.module('popMarketApp')
	.factory('Stock', function() {
		function Stock(existingStock) {
			this.price = existingStock === undefined ? 10 : existingStock.price;
			this.availability = existingStock === undefined ? 1000 : existingStock.availability;
			this.formattedPrice = '£' + this.price.toFixed(2);
		}

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
			if (this.availability < 980) {
				this.price += 1;
			}
		};

		return(Stock);
	})
	.controller('RetreiveArtistStocks', function($scope, Stock) {
		$scope.artists = [
			{ 'id': 1, 'name' : 'John Newman', 'stock' : new Stock() },
			{ 'id': 2, 'name' : 'Reconnected', 'stock' : new Stock() },
			{ 'id': 3, 'name' : 'Miley Cyrus', 'stock' : new Stock() },
			{ 'id': 4, 'name' : 'Lissie', 'stock' : new Stock() },
			{ 'id': 5, 'name' : 'The Saturdays', 'stock' : new Stock() },
			{ 'id': 6, 'name' : 'Anthrax', 'stock' : new Stock() },
			{ 'id': 7, 'name' : 'Paul McCartney', 'stock' : new Stock() },
			{ 'id': 8, 'name' : 'James Blunt', 'stock' : new Stock() },
			{ 'id': 9, 'name' : 'Katy Perry', 'stock' : new Stock() },
			{ 'id': 10, 'name' : 'Eminem', 'stock' : new Stock() }
		];

		$scope.buy = function (artist) {
			artist.stock = new Stock(artist.stock);
			artist.stock.buy();
		};

		$scope.sell = function (artist) {
			artist.stock = new Stock(artist.stock);
			artist.stock.sell();
		};
	})
	.controller('User', function ($scope) {
		$scope.formattedBalance = '£1000.00';
	});
