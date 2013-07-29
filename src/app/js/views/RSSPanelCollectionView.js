define([ 
	'lib/underscore-min', 
	'lib/backbone-min', 
	'views/PanelView'], 
	function(_, Backbone, PanelView){

		RSSPanelCollectionView = Backbone.View.extend({
			events: {
				'click #remove_all_btn' : 'removeAllPanels',
				'click #refresh_all_btn' : 'refreshAllPanels'
			},
			render: function(){
				var panelView = new PanelView({ model: this.collection.last() });
				this.$el.append(panelView.el);
				this.updateSizeDisplay();
				this.activeViews.push(panelView);
			},
			initialize: function(){
				this.collection.on('remove', this.updateSizeDisplay, this);
			},
			updateSizeDisplay: function(){
				this.$('#active_panels').html(this.collection.size());
			},
			removeAllPanels: function(){
				_.each(this.activeViews, function(item, num){
					item.removePanel();
				});
				this.updateSizeDisplay();
				this.activeViews = [];
				return false;
			},
			refreshAllPanels: function(){
				_.each(this.activeViews, function(item, num){
					item.refreshPanel();
				});
				return false;
			},
			activeViews: []


		});

		return RSSPanelCollectionView;

});
