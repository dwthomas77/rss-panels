// Filename: models/RSS_Panel
define([ 'lib/underscore-min', 'lib/backbone-min' ], function(_, Backbone){

	var PanelView = Backbone.View.extend({
		tagName: 'div',
		className: 'article_panel clearfix',
		template: _.template($('#rss_panel_template').html()),
		events: {
			'click #remove_panel_btn' : 'removePanel',
			'click #refresh_panel_btn' : 'refreshPanel'
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		initialize: function(){
			_.bindAll(this, 'render');
			_.bindAll(this, "removePanel");			
			this.model.on("change", this.render);
			$('#article_section').append(this.render().el);
		},
		removePanel: function(){
			window.rss_panels.panelCollection.remove(this.model);
			window.rss_panels.panelCollectionView.activeViews = _.without(window.rss_panels.panelCollectionView.activeViews, this);
			this.remove();
			return false;
		},
		refreshPanel: function(){
			this.model.initialize();
			return false;
		}
	});

	// Return the models for the module
	return PanelView; 
});
