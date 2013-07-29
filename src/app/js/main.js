requirejs.config({
	baseUrl: 'js',
	paths: {},
	shim: {
		'lib/backbone-min': {
            deps: ['lib/underscore-min', 'lib/jquery'],
            exports: 'Backbone'
        },		
		'lib/underscore-min': {
			exports: '_'
		},
		'app': {
			deps: [
				'lib/underscore-min', 
				'lib/backbone-min',
				'lib/goog'
			]
		},
		'lib/bootstrap-min': {
			deps: ['lib/jquery']
		}
	}
});

require([
	'app',
	'lib/bootstrap-min'
],

function(App){
	// override Backbone.sync
	Backbone.sync = function(method, model, options, error){
		switch (method) {
			case "read":
				// build callback constructor function that binds a model to an anon callback
				var sync_feed_closure = function(this_model){
					// bind the model passed to this function
					var model = this_model;
					// define anon callback which is bound to the model in scope
					return function(result){
						if(!result.error){
							options.success(result);
						}else{
							options.error("failed when loading rss feed");
						}
					};
				};
				// bind this model to the anon callback
				bound_callback = sync_feed_closure(model);

				var feed = new google.feeds.Feed(model.get('url'));
				// pass anon callback which is bound to this model
				feed.load(bound_callback);
				model.trigger('change');
				break;
			case "create":
				//console.log("method: create not supported");
				break;
			case "update":
				//console.log("method: update not supported");
				break;
			case "delete":
				// remove panel from app
				options.success("remove panel");
				break;
		} 
	};  

	// load google feeds dynamically with callback
	google.load("feeds", "1", {"callback" : function(){
		window.rss_panels = new App();
		window.rss_panels.populateDefaultList();
		window.rss_panels.activateSearchList();
		window.rss_panels.initPanels();
	}});
});
