// Filename: collections/FeedListItemCollection
define([ 
	'lib/underscore-min', 
	'lib/backbone-min', 
	'models/FeedListItem',

], function(_, Backbone, FeedListItem){

	// Collection of RSS Feed List Items
	FeedListItemCollection = Backbone.Collection.extend({
		model: FeedListItem
	});


	return FeedListItemCollection;
});