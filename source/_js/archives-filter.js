+function ($) {
	'use strict';

	/**
	 * ArchivesFilter
	 * @param archivesElem
	 * @constructor
	 */
	var ArchivesFilter = function (archivesElem) {
		this.$inputSearch = $(archivesElem + ' #filter-form input[name=date]');
		this.postsYear    = archivesElem + ' .archive-year';
		this.postsMonth   = archivesElem + ' .archive-month';
		this.postsDay     = archivesElem + ' .archive-day';
		this.$postsYear   = $(this.postsYear);
		this.$postsMonth  = $(this.postsMonth);
		this.$postsDay    = $(this.postsDay);
	};

	/**
	 * Init archives filter
	 */
	ArchivesFilter.prototype.init = function() {
		var self = this;

		self.$inputSearch.keyup(function () {
			self.filter(self.sliceDate(self.getSearch()));
		})
	}

	/**
	 * Get Filter entered by user
	 * @returns {string}
	 */
	ArchivesFilter.prototype.getSearch = function() {
		return this.$inputSearch.val().replace(/\//g, '').toLowerCase();
	};

	/**
	 * Slice the date by year, month and day
	 * @param date
	 */
	ArchivesFilter.prototype.sliceDate = function(date) {
		return [date.slice(0, 4), date.slice(4, 6), date.slice(6, 8) ];
	};

	/**
	 * Show related posts and hide others
	 * @param date
	 */
	ArchivesFilter.prototype.filter = function(date) {
		if (date[0] == '') {
			this.showAll();
		}
		else {
			this.hideAll();
			this.showPosts(date);
		}
	};

	/**
	 * Show all posts from a date
	 * @param date
	 */
	ArchivesFilter.prototype.showPosts = function(date) {
		$(this.postsYear + '[data-date*=' + date[0] + ']').show();
		$(this.postsMonth + '[data-date*=' + date[0] + date[1] + ']').show();
		$(this.postsDay + '[data-date*=' + date[0] + date[1] + date[2] + ']').show();
	};

	/**
	 * Show all posts
	 */
	ArchivesFilter.prototype.showAll = function() {
		this.$postsYear.show();
		this.$postsMonth.show();
		this.$postsDay.show();
	};

	/**
	 * Hide all posts
	 */
	ArchivesFilter.prototype.hideAll = function() {
		this.$postsYear.hide();
		this.$postsMonth.hide();
		this.$postsDay.hide();
	};

	$(document).ready(function() {
		var archivesFilter;

		if ($('#archives').length) {
			archivesFilter = new ArchivesFilter('#archives');
			archivesFilter.init();
		}
	})

}(jQuery);