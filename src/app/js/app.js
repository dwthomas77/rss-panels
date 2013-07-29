define([
	'lib/underscore-min', 
	'lib/backbone-min',
	'views/FeedListView',
	'views/SearchListView',	
	'views/RSSPanelCollectionView',	
	'models/FeedListItem',
	'models/RSS_Panel',
	'collections/FeedListItemCollection'

], function(_, Backbone, FeedListView, SearchListView, RSSPanelCollectionView, FeedListItem, RSS_Panel, FeedListItemCollection) {
	var App = function() {
		this.panelCounter = 0;

		rss = [
		{	title: "NPR Headlines",
		url: "http://www.npr.org/rss/rss.php?id=1001"
		},
		{	title: "Reuters Most Recent",
		url: "http://feeds.reuters.com/reuters/MostRead?format=xml"
		},
		{	title: "Fox News - Latest",
		url: "http://feeds.foxnews.com/foxnews/latest?format=xml"
		},
		{	title: "CNN - Top Stories",
		url: "http://rss.cnn.com/rss/cnn_topstories.rss"
		},
		{	title: "CBS Breaking News",
		url: "http://feeds.cbsnews.com/CBSNewsMain"
		},
		{	title: "Yahoo Most Viewed Headlines",
		url: "http://news.yahoo.com/rss/"
		},
		];

		rssEntertainment = [
		{	title:"E! Online (US) - Top Stories",
		url: "http://syndication.eonline.com/syndication/feeds/rssfeeds/topstories.xml"
		},
		{	title: "EW.com: Today's Latest Headlines",
		url: "http://feeds.ew.com/entertainmentweekly/latest"
		},
		{	title: "Hollywood Reporter Top Stories",
		url: "http://feeds.feedburner.com/thr/news"
		},
		{	title: "What's New on Yahoo! - Entertainment",
		url: "http://dir.yahoo.com/rss/dir/getrss.php?ent"
		},
		{	title: "ET's Breaking News",
		url: "http://feeds.feedburner.com/EtsBreakingNews"
		},
		{	title: "USA Today Life Top Stories",
		url: "http://rssfeeds.usatoday.com/usatoday-LifeTopStories"
		}		
		];

		rssSports = [
		{	title:"ESPN Top News",
		url: "http://sports.espn.go.com/espn/rss/news"
		},
		{	title: "Yahoo! Sports Top News",
		url: "http://sports.yahoo.com/top/rss.xml"
		},
		{	title: "CBS Sports Latest News",
		url: "http://www.cbssports.com/partners/feeds/rss/home_news"
		},
		{	title: "BBC Sport Headlines",
		url: "http://feeds.bbci.co.uk/sport/0/rss.xml?edition=uk"
		},
		{	title: "Sky Sports - World Cup News",
		url: "http://www.skysports.com/rss/0,20514,12098,00.xml"
		},
		{	title: "USA Today Sports Top Stories",
		url: "http://rssfeeds.usatoday.com/UsatodaycomSports-TopStories"
		}		
		];		

		this.populateDefaultList = function(){
			// Initiate new list of RSS Feed List Items
			rssList = new FeedListItemCollection();
			// Populate List Collection with available RSS Feeds
			_.each(rss, function(item, num){
				rssList.add(new FeedListItem({
					name: item.title,
					link: item.url
				}));
			});

			feedList = new FeedListView({
				collection: rssList,
				el: '#rss_dropdown_list'
			});

			// Initiate new list of Entertainment RSS Feed List Items
			rssEntertainmentList = new FeedListItemCollection();
			// Populate List Collection with available RSS Feeds
			_.each(rssEntertainment, function(item, num){
				rssEntertainmentList.add(new FeedListItem({
						name: item.title,
						link: item.url
				}));
			});

			feedListEntertainment = new FeedListView({
				collection: rssEntertainmentList,
				el: '#rss_ent_dropdown_list'
			});

			// Initiate new list of Sports RSS Feed List Items
			rssSportsList = new FeedListItemCollection();
			// Populate List Collection with available RSS Feeds
			_.each(rssSports, function(item, num){
				rssSportsList.add(new FeedListItem({
					name: item.title,
					link: item.url
				}));
			});

			feedListSports = new FeedListView({
				collection: rssSportsList,
				el: '#rss_sports_dropdown_list'
			});
		};

		this.activateSearchList = function(){
			// Initiate new collection of RSS Feed List Items
			rssSearchList = new FeedListItemCollection();

			// attach to view
			rssSearchListView = new SearchListView({
				collection: rssSearchList,
				el: '#searchList'
			});
		};

		this.initPanels = function(){
			// Start a Collection for active RSS Panels
			this.PanelCollection = Backbone.Collection.extend({
				model: RSS_Panel
			});

			this.panelCollection = new this.PanelCollection();    

			this.panelCollectionView = new RSSPanelCollectionView({
				collection: this.panelCollection,
				el: '#article_section'
			});			
		};
	};

	App.prototype = {
	};

	return App;
});
