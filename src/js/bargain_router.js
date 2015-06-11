/**
 * bargain
 * @authors Your Name (you@example.org)
 * @date    2015-06-08 20:21:40
 * @version $Id$
 */

var Router = ReactRouter; // or var Router = ReactRouter; in browsers

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var Apps = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to="app">Dashboard</Link></li>
            <li><Link to="inbox">Inbox</Link></li>
            <li><Link to="calendar">Calendar</Link></li>
          </ul>
          Logged in as Jane
        </header>

        {/* this is the important part */}
        <RouteHandler/>
      <div id="content"></div>
      </div>
    );
  }
});
var Inbox = React.createClass({
  render: function () {
    return (
      <div>Inbox</div>
    );
  }
});
var Toolbar = React.createClass({
	render: function(){
		return(
			<div>Toolbar</div>
		);
	}
});
var Messages = React.createClass({
	render: function(){
		return(
			<div>Messages</div>
		);
	}
});
var Dashboard = React.createClass({
  render: function () {
    return (
      <div>index</div>
    );
  }
});
var Calendar = React.createClass({
  render: function () {
    return (
      <div>
        <Messages/>
        <RouteHandler/>
      </div>
    );
  }
});
var routes = (
  <Route name="app" path="/" handler={Apps}>
    <Route name="inbox" handler={Inbox}/>
    <Route name="calendar" handler={Calendar}/>
    <DefaultRoute handler={Dashboard}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
