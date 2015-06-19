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

var Apps = React.createClass({displayName: "Apps",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement("header", null, 
          React.createElement("ul", null, 
            React.createElement("li", null, React.createElement(Link, {to: "app"}, "Dashboard")), 
            React.createElement("li", null, React.createElement(Link, {to: "inbox"}, "Inbox")), 
            React.createElement("li", null, React.createElement(Link, {to: "calendar"}, "Calendar"))
          ), 
          "Logged in as Jane"
        ), 

        /* this is the important part */
        React.createElement(RouteHandler, null), 
      React.createElement("div", {id: "content"})
      )
    );
  }
});
var Inbox = React.createClass({displayName: "Inbox",
  render: function () {
    return (
      React.createElement("div", null, "Inbox")
    );
  }
});
var Toolbar = React.createClass({displayName: "Toolbar",
	render: function(){
		return(
			React.createElement("div", null, "Toolbar")
		);
	}
});
var Messages = React.createClass({displayName: "Messages",
	render: function(){
		return(
			React.createElement("div", null, "Messages")
		);
	}
});
var Dashboard = React.createClass({displayName: "Dashboard",
  render: function () {
    return (
      React.createElement("div", null, "index")
    );
  }
});
var Calendar = React.createClass({displayName: "Calendar",
  render: function () {
    return (
      React.createElement("div", null, 
        React.createElement(Messages, null), 
        React.createElement(RouteHandler, null)
      )
    );
  }
});
var routes = (
  React.createElement(Route, {name: "app", path: "/", handler: Apps}, 
    React.createElement(Route, {name: "inbox", handler: Inbox}), 
    React.createElement(Route, {name: "calendar", handler: Calendar}), 
    React.createElement(DefaultRoute, {handler: Dashboard})
  )
);

Router.run(routes, function (Handler) {
  React.render(React.createElement(Handler, null), document.body);
});
