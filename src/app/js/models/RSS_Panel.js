// Filename: models/RSS_Panel
define([ 
	'lib/underscore-min', 
	'lib/backbone-min' 
], function(_, Backbone){

	var RSS_Panel = Backbone.Model.extend({
		defaults: {
			timestamp: "",
			panel_count: null,
			title: "",
			link: "",
			description: "",
			author: "",
			entries: []
		},
		parse: function(response){
			this.set({
				title: response.feed.title,
				link: response.feed.link,
				description: response.feed.description,
				author: response.feed.author,
				entries: response.feed.entries
			});
		},
		initialize: function(){
			var feed_closure = function(this_model){
				// bind the model passed to this function
				var model = this_model;
				// define anon callback which is bound to the model in scope
				return function(result){
					if(!result.error){
						var date = new Date();
						model.set({
							timestamp: date.toTimeString(),
							title: result.feed.title,
							link: result.feed.link,
							description: result.feed.description,
							author: result.feed.author,
							entries: result.feed.entries
						});
					//console.log(model.get('timestamp'));
					}else{
						console.log("There was an errror rendering the RSS_Panel View");
					}
				};
			};
			// bind this model to the anon callback
			bound_callback = feed_closure(this);

			var feed = new google.feeds.Feed(this.get('url'));
			// pass anon callback which is bound to this model
			feed.load(bound_callback);
		}
	});

	// Return the models for the module
	return RSS_Panel; 
});