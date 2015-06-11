/**
 * Bargain Welcome
 * @authors Your Name (you@example.org)
 * @date    2015-06-08 20:21:40
 * @version $Id$
 */

var mountNode = document.getElementById('content');
var UI = AMUIReact;



/**
 * 为了使触摸事件生效，在渲染所有组件之前调用
 */
React.initializeTouchEvents(true);




/**
 * 路由相关
 * @type {[type]}
 */
var Router = ReactRouter; // or var Router = ReactRouter; in browsers

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;








/* ============== Welcome Pages ============= */

/**
 * 单个图片组件
 * @param  {[type]} ){                 return(        <UI.Image    );  }} [description]
 * @return {[type]}     [description]
 */
var WelcomeImg = React.createClass({
  render : function(){
    return(
      <p className="am-padding-top-30">
        <UI.Image src={this.props.src} className={this.props.style} responsive />
      </p>
    );
  }
});
/**
 * 图片列表
 * @type {[type]}
 */
var WelcomeImgList = React.createClass({
  render : function(){
    var imgNode = this.props.data.map(function(item){
      return (
        <WelcomeImg src={item.src} style={item.style + " am-center "} />
      );
    });
    return (
      <div className="welcome_imglist">
        {imgNode}
      </div>
    );
  }
});
/**
 * welcome页提交按钮
 * @type {[type]}
 */
var WelcomeSubmit = React.createClass({
  render : function(){
    return (
      <p className="am-block am-padding-bottom-30">
      <Link to="list" params={{userId: "user.id"}} query={{foo: "bar"}}>
        <UI.Image src="src/img/welcome_submit.png" className="welcome_submit am-center" responsive />
      </Link>
      </p>
    );
  }
});
/**
 * welcome页面整体布局
 * @type {[type]}
 */
var WelcomeBox = React.createClass({
  getInitialState : function(){
    return {data : []};
  },
  componentDidMount : function(){
    this.loadImgData();
  },
  loadImgData : function(){
    $.ajax({
      url : this.props.url,
      dataType : 'json',
      cache : false,
      success : function(data){
        this.setState({ data: data });
      }.bind(this),
      error : function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleSubmit : function(){},
  render : function(){
    return (
      <UI.Container>
      <RouteHandler/>
        <WelcomeImgList data={this.state.data} />
        <WelcomeSubmit onClick={this.handleSubmit} />

      </UI.Container>
    );
  }
});

var Welcome = React.createClass({
  render : function(){
    return (
      <WelcomeBox url="src/json/welcome_imglist.json" />
    );
  }
});
// var welcomePage = (
//   <Welcome />
// );
// var Welcome = (
//     <WelcomeBox url="src/json/welcome_imglist.json" />
// );

// React.render(welcomePage, mountNode);

/* ============== Course List Pages ============= */
var CourseType = React.createClass({
  render : function(){
    return (
      <ul></ul>
    );
  }
});

var CourseList = React.createClass({
  render : function(){
    return (
      <ul className="course_list"></ul>
    );
  }
});
var TabsInstance = React.createClass({
  render : function(){
    return (
      <UI.Nav tabs justify>
        <UI.NavItem active href="http://www.amazeui.org">首页</UI.NavItem>
        <UI.NavItem href="http://www.amazeui.org">开始使用</UI.NavItem>
        <UI.NavItem href="http://www.amazeui.org">按需定制</UI.NavItem>
        <UI.NavItem href="http://www.amazeui.org">加入我们</UI.NavItem>
      </UI.Nav>
    );
  }
});
var CourseListBox = React.createClass({
  render : function(){
    return (
      <UI.Panel>
        <TabsInstance />
      </UI.Panel>
    );
  }
});

/* ============== Course View Pages ============= */

var CourseView = React.createClass({
  render : function(){
    return (
      <article></article>
    );
  }
});

/* ============== Router ============= */

var routes = (
  <Route name="welcome" path="/" handler={Welcome}>
    <Route name="list" handler={CourseListBox}/>
    <Route name="view" handler={CourseView}/>
    <DefaultRoute handler={Welcome}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
// /**
//  * 路由相关
//  * @type {[type]}
//  */
// var Router = ReactRouter; // or var Router = ReactRouter; in browsers

// var DefaultRoute = Router.DefaultRoute;
// var Link = Router.Link;
// var Route = Router.Route;
// var RouteHandler = Router.RouteHandler;

// var CourseList = React.createClass({
//   render : function(){
//     return (
//       <ul className="course_list"></ul>
//     );
//   }
// });
// var CourseView = React.createClass({
//   render : function(){
//     return (
//       <article></article>
//     );
//   }
// });

// var routes = (
//   <Route name="app" path="/" handler={Welcome}>
//     <Route name="list" handler={CourseList}/>
//     <Route name="view" handler={CourseView}/>
//     <DefaultRoute handler={Welcome}/>
//   </Route>
// );

// Router.run(routes, function (Handler) {
//   React.render(<Handler/>, document.body);
// });