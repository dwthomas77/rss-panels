// Filename: views/FeedListView
define([ 
  'lib/underscore-min', 
  'lib/backbone-min',
  'views/FeedListItemView'

], function(_, Backbone, FeedListItemView){

  var FeedListView = Backbone.View.extend({
    render: function(){
      this.collection.each(function(listItem){
        var listItemView = new FeedListItemView({ model: listItem });
        this.$el.append(listItemView.el);
      }, this);
    },
    initialize: function(){
      this.render();
    }
  });
	// Return the models for the module
	return FeedListView;
});