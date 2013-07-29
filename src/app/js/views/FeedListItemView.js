// Filename: models/RSS_Panel
define([
	'lib/underscore-min',
	'lib/backbone-min',
	'models/RSS_Panel'
], function(_, Backbone, RSS_Panel){

	var FeedListItemView = Backbone.View.extend({
		// there are many different ways to do this, here's one
		tagName: 'li',
		events: {
			'click a' : 'load_panel'
		},
		// make an Underscore template for the inner HTML
		template: _.template(
			'<a role="menuitem" onclick="return false;" href="<%= link %>"><%= name %></a>'
		),
		render: function(){
			$(this.el).html(
				this.template(this.model.toJSON())
			);
			return this;
		},
		initialize: function(){
			this.render();
		},
		load_panel: function(){
			var next_size = window.rss_panels.panelCounter + 1;
			window.rss_panels.panelCollection.add(new RSS_Panel({
				panel_name: this.model.get('name'),
				panel_count: next_size,
				id: "panel_"+next_size,
				url: this.model.get('link'),
			}));
			window.rss_panels.panelCollectionView.render();
			// close the drop down select list
			$('body').trigger('click');
			window.rss_panels.panelCounter+=1;
			return false;
		}
	});
	return FeedListItemView;
});