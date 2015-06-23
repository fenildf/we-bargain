/** @jsx React.DOM */
var Router = ReactRouter;
var Routes = Router.Routes;
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;

var App = React.createClass({displayName: "App",
  render: function(){
    return (
      React.createElement("div", {className: "main"}, 
        React.createElement("div", null, 
          React.createElement(Link, {to: "bookList"}, "图书"), 
          React.createElement(Link, {to: "movieList"}, "电影")
        ), 
        React.createElement("div", {className: "content"}, 
          React.createElement(this.props.activeRouteHandler, null)
        )
      )
    );
  }
});

var Books = React.createClass({displayName: "Books",
  render: function(){
    return (
    React.createElement("div", null, 
      React.createElement("ul", null, 
        React.createElement("li", null, React.createElement(Link, {to: "book", params: {bookId: 1}}, "老人与海")), 
        React.createElement("li", null, React.createElement(Link, {to: "book", params: {bookId: 2}}, "黄金时代")), 
        React.createElement("li", null, React.createElement(Link, {to: "book", params: {bookId: 3}}, "平凡的世界"))
      ), 
      React.createElement(this.props.activeRouteHandler, null)
    )
    );
  }
});

var Book = React.createClass({displayName: "Book",
  render: function(){
    return (
      React.createElement("p", null, "这里显示图书编号为", this.props.params.bookId, "对应的信息")
    );
  }
});

var BookRoute = React.createClass({displayName: "BookRoute",
  render: function(){
    return (
      React.createElement(this.props.activeRouteHandler, null)
    );
  }
});

var Movies = React.createClass({displayName: "Movies",
  render: function(){
    return (
    React.createElement("div", null, 
      React.createElement("ul", null, 
        React.createElement("li", null, React.createElement(Link, {to: "movie", params: {movieId: 1}}, "独自等待")), 
        React.createElement("li", null, React.createElement(Link, {to: "movie", params: {movieId: 2}}, "大话西游")), 
        React.createElement("li", null, React.createElement(Link, {to: "movie", params: {movieId: 3}}, "楚门的世界"))
      ), 
      React.createElement(this.props.activeRouteHandler, null)
    )
    );
  }
});

var Movie = React.createClass({displayName: "Movie",
  render: function(){
    return (
      React.createElement("p", null, "这里显示电影编号为", this.props.params.movieId, "对应的信息")
    );
  }
});


var MovieRoute = React.createClass({displayName: "MovieRoute",
  render: function(){
    return (
      React.createElement(this.props.activeRouteHandler, null)
    );
  }
});

var Welcome = React.createClass({displayName: "Welcome",
  render: function(){
    return (
      React.createElement("p", null, "欢迎！随便看点儿什么吧！")
    );
  }
});

var routes = (
  React.createElement(Routes, {location: "hash"}, 
    React.createElement(Route, {path: "/", handler: App}, 
      React.createElement(Route, {path: "books", name: "bookList", handler: BookRoute}, 
        React.createElement(Route, {path: ":bookId", name: "book", handler: Book}), 
        React.createElement(DefaultRoute, {handler: Books})
      ), 
      React.createElement(Route, {path: "movies", name: "movieList", handler: MovieRoute}, 
        React.createElement(Route, {path: ":movieId", name: "movie", handler: Movie}), 
        React.createElement(DefaultRoute, {handler: Movies})
      ), 
      React.createElement(DefaultRoute, {handler: Welcome})
    )
  )
);


Router.run(routes, function (Handler) {
  React.render(React.createElement(Handler, null), document.body);
});
