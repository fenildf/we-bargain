/** @jsx React.DOM */
var Router = ReactRouter;
var Routes = Router.Routes;
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;

var App = React.createClass({
  render: function(){
    return (
      <div className="main">
        <div>
          <Link to="bookList">图书</Link>
          <Link to="movieList">电影</Link>
        </div>
        <div className="content">
          <this.props.activeRouteHandler/>
        </div>
      </div>
    );
  }
});

var Books = React.createClass({
  render: function(){
    return (
    <div>
      <ul>
        <li><Link to="book" params={{bookId: 1}}>老人与海</Link></li>
        <li><Link to="book" params={{bookId: 2}}>黄金时代</Link></li>
        <li><Link to="book" params={{bookId: 3}}>平凡的世界</Link></li>
      </ul>
      <this.props.activeRouteHandler/>
    </div>
    );
  }
});

var Book = React.createClass({
  render: function(){
    return (
      <p>这里显示图书编号为{this.props.params.bookId}对应的信息</p>
    );
  }
});

var BookRoute = React.createClass({
  render: function(){
    return (
      <this.props.activeRouteHandler/>
    );
  }
});

var Movies = React.createClass({
  render: function(){
    return (
    <div>
      <ul>
        <li><Link to="movie" params={{movieId: 1}}>独自等待</Link></li>
        <li><Link to="movie" params={{movieId: 2}}>大话西游</Link></li>
        <li><Link to="movie" params={{movieId: 3}}>楚门的世界</Link></li>
      </ul>
      <this.props.activeRouteHandler/>
    </div>
    );
  }
});

var Movie = React.createClass({
  render: function(){
    return (
      <p>这里显示电影编号为{this.props.params.movieId}对应的信息</p>
    );
  }
});


var MovieRoute = React.createClass({
  render: function(){
    return (
      <this.props.activeRouteHandler/>
    );
  }
});

var Welcome = React.createClass({
  render: function(){
    return (
      <p>欢迎！随便看点儿什么吧！</p>
    );
  }
});

var routes = (
  <Routes location="hash">
    <Route path="/" handler={App}>
      <Route path="books" name="bookList" handler={BookRoute}>
        <Route path=":bookId" name="book" handler={Book}/>
        <DefaultRoute handler={Books}/>
      </Route>
      <Route path="movies" name="movieList" handler={MovieRoute}>
        <Route path=":movieId" name="movie" handler={Movie}/>
        <DefaultRoute handler={Movies}/>
      </Route>
      <DefaultRoute handler={Welcome}/>
    </Route>
  </Routes>
);


Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
