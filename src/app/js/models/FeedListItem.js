define([
	'lib/underscore-min', 
	'lib/backbone-min'
	], function(_, Backbone) {
		// rss_panel item list
		var FeedListItem = Backbone.Model.extend({
			defaults: {
				name: "",
				link: "",
			}
		});
		return FeedListItem; 
});
