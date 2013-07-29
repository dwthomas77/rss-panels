define([ 
	'lib/underscore-min', 
	'lib/backbone-min',
	'views/PanelView',
	'views/FeedListItemView',
	'models/FeedListItem'

], function(_, Backbone, PanelView, FeedListItemView, FeedListItem){

	var SearchListView = Backbone.View.extend({
		events: {
			"keyup input": "delaySearch",
			"click button": "delaySearch"
		},
		render: function(){
			this.collection.each(function(listItem){
				var listItemView = new FeedListItemView({ model: listItem });
				this.$("ul").append(listItemView.el);
			}, this);
		},
		initialize: function(){
			// construct function bound to passed view
			this.sync_feed_closure = function(this_view){
				// bind the model passed to this function
				var view = this_view;
				// returns google feed api search results
				return function(result){
					view.$el.find("ul").empty();
					view.collection.reset();
					// add results to search list item collection          
					_.each(result.entries, function(item, num){
						view.collection.add(new FeedListItem({
							name: item.title,
							link: item.url
						}));
					});
					view.render();
					view.$("ul").dropdown('toggle');
				};
			};
      
			// bind this view to the constructor function
			this.bound_callback = this.sync_feed_closure(this);

			// UI text input keyup handling
			this.delaySearch = _.debounce(this.searchFeeds, 500);

		},
		searchFeeds: function(){
			if(this.$('#rssSearchInput').val().length>3){
				google.feeds.findFeeds(this.$('#rssSearchInput').val(), this.bound_callback);
			}
		},
		searchFeedsCallback: function(result){
			_.each(result.entries, function(item, num){
				this.collection.add(new FeedListItem({
					name: item.title,
					link: item.url
				}));
			}, this);
		}
	});
	// Return the models for the module
	return SearchListView;
});
