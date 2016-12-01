* Router component in `ReactDOM.render`
	* top level component in our front-end routing
	* props: `history` (easiest to start with hashHistory)
	* hash (#) in the URL
		* see for example: anchor scroll TOC links in https://en.wikipedia.org/wiki/New_York_City
* Route component
	* props: `path`, `component`
	* junk after # in the URL: each route gets its own key
* Route component w/ params
	* `this.props.params` or `this.props.routeParams`
* Link component
	* props: `to`
* `browserHistory` versus `hashHistory`
	* can't go to child routes first without some server set-up
	* serve index.html for any other requests besides what's already there
* Can nest routes (ex: show toy example).
	* `this.props.children`, `React.cloneElement(this.props.children, someStateToPassAlong)