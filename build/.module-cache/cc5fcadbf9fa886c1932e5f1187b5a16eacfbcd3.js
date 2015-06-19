/**
 * Bargain Welcome
 * @authors Your Name (you@example.org)
 * @date    2015-06-08 20:21:40
 * @version $Id$
 */

/**
 * mountNode 渲染React内容的DOM节点
 * @type {[type]}
 */
var mountNode = document.getElementById('content');

/**
 * AmazeUI for React
 * @type {[type]}
 */
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


/* ============== Public Component ============= */
/**
 * AppWrap 用来绑定路由内容的外部容器
 * @param  {String} ){                 return (      <div className [description]
 * @return {[type]}     [description]
 */
var AppWrap = React.createClass({displayName: "AppWrap",
  render : function(){
    return (
      React.createElement("div", {className: "app_wrap"}, 
        React.createElement(RouteHandler, null)
        /*this.props.children*/
      )
    );
  }
});
/**
 * 找不到时显示的内容
 * @param  {String} ){                 return (      <div className [description]
 * @return {[type]}     [description]
 */
var NotFound = React.createClass({displayName: "NotFound",
  render : function(){
    return (
      React.createElement("div", {className: "app_notfound"}, 
        "不好意思，您是不是迷路了！"
      )
    );
  }
});




/* ============== Welcome Pages ============= */
/**
 * Welcome 组件
 * @param  {String} ){                 return (      <div className [description]
 * @return {[type]}     [description]
 */
var Welcome = React.createClass({displayName: "Welcome",
  render : function(){
    return (
      React.createElement("div", {className: "welcome"}, 
        React.createElement(WelcomeBox, {url: "src/json/welcome_imglist.json"})
      )
    );
  }
});
/**
 * Welcome 页中的 ：单个图片组件
 * @param  {[type]} ){                 return(        <UI.Image    );  }} [description]
 * @return {[type]}     [description]
 */
var WelcomeImg = React.createClass({displayName: "WelcomeImg",
  render : function(){
    return(
      React.createElement("p", {className: "am-padding-top-30"}, 
        React.createElement(UI.Image, {src: this.props.src, className: this.props.style, responsive: true})
      )
    );
  }
});
/**
 * Welcome 页中的 ：图片列表
 * @type {[type]}
 */
var WelcomeImgList = React.createClass({displayName: "WelcomeImgList",
  render : function(){
    var imgNode = this.props.data.map(function(item){
      return (
        React.createElement(WelcomeImg, {src: item.src, style: item.style + " am-center "})
      );
    });
    return (
      React.createElement("div", {className: "welcome_imglist"}, 
        imgNode
      )
    );
  }
});
/**
 * Welcome 页中的 ：提交按钮
 * @type {[type]}
 */
var WelcomeSubmit = React.createClass({displayName: "WelcomeSubmit",
  render : function(){
    return (
      React.createElement("p", {className: "am-block am-padding-bottom-30"}, 
        /*<Link to="list" params={{userId: "user.id"}} query={{foo: "bar"}}>*/
        React.createElement(Link, {to: "list"}, 
          React.createElement(UI.Image, {src: "src/img/welcome_submit.png", className: "welcome_submit am-center", responsive: true})
        )
      )
    );
  }
});
/**
 * Welcome 页的整体布局
 * @type {[type]}
 */
/**
 * Welcome 页的整体布局
 * @param  {[type]} getInitialState   : return {data :[]}         [description]
 * @param  {[type]} componentDidMount : this.loadImgData()        [description]
 * @param  {[type]} loadImgData       : [description]            
 * @param  {[type]} handleSubmit      :             [description]
 * @param  {[type]} render            :             [description]
 * @return {[type]}                   :[description]
 */
var WelcomeBox = React.createClass({displayName: "WelcomeBox",
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
      React.createElement(UI.Container, null, 
        React.createElement(WelcomeImgList, {data: this.state.data}), 
        React.createElement(WelcomeSubmit, {onClick: this.handleSubmit})

      )
    );
  }
});




/* ============== Course List Pages ============= */
/**
 * 课程列表分类导航
 * @param  {[type]} ) {               var itemId [description]
 * @return {[type]}   [description]
 */
var NavItem = React.createClass({displayName: "NavItem",
  render: function() {
    var itemId = this.props.id;
    var par = this.props.par;
    var actCls = itemId == par ? 'am-active' : '';
    return (
      React.createElement("li", {className: actCls, id: itemId, "aria-par": par}, 
        React.createElement(Link, {to: "listitem", activeClassName: "am-active", params: {subjectId: itemId}}, this.props.name)
      )
    );
  }
});
/**
 * 课程列表页的导航条
 * @param  {[type]} ){                 var _par [description]
 * @return {[type]}     [description]
 */
var NavBar = React.createClass({displayName: "NavBar",
  render : function(){
    var _par = this.props.par;
    var navNode = this.props.data.map(function(item){
      return (
        React.createElement(NavItem, {act: "", id: item.id, name: item.name, par: _par})
      );
    });
    return (
          React.createElement("ul", {className: "am-nav am-nav-pills am-nav-justify"}, 
            navNode
          )
    );
  }
});
/**
 * 课程列表页的导航条容器
 * @param  {[type]} getInitialState   :          [description]
 * @param  {[type]} componentDidMount :             function(){                         this.loadNavData();           } [description]
 * @param  {Array}  loadNavData       :             function(){                         $.ajax({                                                     url                         :       this.props.url,       dataType      : 'json',                         success : function(data){        var _navData [description]
 * @param  {[type]} error             :             function(xhr, status, err){                                                                       console.log(this.props.url, status, err.toString());      }.bind(this)            });  } [description]
 * @param  {[type]} render:           function(     [description]
 * @return {[type]}                   [description]
 */
var NavBox = React.createClass({displayName: "NavBox",
  getInitialState : function(){
    return {data: [], par:''};
  },
  componentDidMount : function(){
    this.loadNavData();
  },
  loadNavData : function(){
    $.ajax({
      url : this.props.url,
      dataType : 'json',
      success : function(result){
        this.setState({data : result.data});
      }.bind(this),
      error : function(xhr, status, err){
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      React.createElement("div", {className: "course_nav"}, 
        React.createElement(NavBar, {data: this.state.data, par: this.state.par})
      )
    );
  }
});

/**
 * 列表中的单个项目
 * @type {[type]}
 */
var ListItem = React.createClass({displayName: "ListItem",
  render: function() {
    var par = this.props;
    var _teacher = par.teacher, teacher = [];
    $.each(_teacher, function(k, v){
      teacher.push(v);
    });
    teacher = teacher[0];
    return (
      React.createElement("li", {id: "view_" + par.id, className: "am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left courselist_item"}, 
        React.createElement("div", {className: "am-list-thumb am-u-sm-4 am-text-center am-padding-0"}, 
          /*<Link to="view" params={{courseId: 1}}>*/
            React.createElement(UI.Image, {src: teacher.img, responsive: true}), 
            React.createElement("p", {className: "am-center am-margin-xs"}, teacher.name)
          /*</Link>*/
        ), 
        React.createElement("div", {className: "am-list-main am-u-sm-8"}, 
          React.createElement("h4", {class: "am-list-item am-margin-bottom-0"}, par.name), 
          React.createElement("div", {class: "am-list-item-text"}, 
            React.createElement("p", {className: "courselist_price am-margin-bottom-xs"}, "课程价：", React.createElement("span", {className: "am-text-danger"}, par.price), " 元")
          ), 
          React.createElement("div", {className: "courselist_btn_go"}, 
            React.createElement("p", {className: "am-text-xs am-text-center am-text-danger am-margin-bottom-0"}, "已有123456人参加"), 
            React.createElement(UI.Button, {amStyle: "danger", block: true}, 
              React.createElement(Link, {to: "view", params: {courseId: par.id}}, "马上砍")
            )
          )
        )
      )
    );
  }
});

/**
 * 列表项
 * @type {[type]}
 */
var ListItems = React.createClass({displayName: "ListItems",
  render: function() {
    // console.log(this.props.data);
    var listNode = this.props.data.map(function(item){
      return (
        React.createElement(ListItem, {id: item.courseId, name: item.courseName, price: item.price, teacher: item.teacher})
      );
    });
    return (
      React.createElement("ul", {className: "am-list course_list"}, 
        listNode
      )
    );
  }
});

/**
 * 列表外围容器
 * @type {[type]}
 */
var ListBox = React.createClass({displayName: "ListBox",
  getInitialState : function(){
    return {data : []};
  },
  componentDidMount : function(){
    this.loadListData();
  },
  loadListData : function(){
    $.ajax({
      url : this.props.url,
      dataType : 'json',
      success : function(result){
        // console.log(result);
        this.setState({data: result.data});
      }.bind(this),
      error : function(xhr, status, err){
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
     return (
       React.createElement("div", {className: "course_list_wrap"}, 
        React.createElement(ListItems, {data: this.state.data})
       )
     );
   }
});

var ListLoad = React.createClass({displayName: "ListLoad",
  componentWillUpdate : function(){

  },
  componentDidUpdate : function(){},
  componentDidMount: function () {
    // from the path `/inbox/messages/:id`
    var id = this.props.params.subjectId;
    // console.log(id);
    // this.setListId(id);
  },
  setListId : function(id){
    // this.setState({id : id});
  },
  render: function() {
    // console.log(this.state.id);
    // var _id = this.state.id;
    var _par = this.props.params;
    var _id = _par.subjectId ? _par.subjectId : 1;
    return (
      React.createElement(ListBox, {url: 'data/' + _id + '/index.json'})
    );
  }
});



/**
 * 课程列表组件
 * @param  {String} ){                 return (      <ul className [description]
 * @return {[type]}     [description]
 */
var CourseList = React.createClass({displayName: "CourseList",
  render : function(){
    return (
      React.createElement("ul", {className: "course_list"})
    );
  }
});
/**
 * 课程列表容器
 * @param  {[type]} ) {                       return (      <div />    );  }} [description]
 * @return {[type]}   [description]
 */
var CourseListBody = React.createClass({displayName: "CourseListBody",
  render: function() {
    var sid = this.props.params.subjectId;
    // console.log(sid);
    // this.props.location.query.sort;
    return (
      React.createElement("div", null)
    );
  }
});

/**
 * 课程列表页组件
 * @param  {[type]} ){                 var itemid [description]
 * @return {[type]}     [description]
 */
var CourseListBox = React.createClass({displayName: "CourseListBox",
  render : function(){
    var itemid = this.props.params.subjectId;
    return (
      React.createElement(UI.Container, null, 
        React.createElement(UI.Panel, null, 
          React.createElement(NavBox, {url: "src/json/subject.json", par: itemid}), 
          React.createElement(RouteHandler, null)
          /*this.props.children*/
        )
      )
    );
  }
});













// var ListNav = React.createClass({
//   render: function() {
//     return (
//       <ul>
//         <li>1</li>
//         <li>2</li>
//         <li>3</li>
//       </ul>
//     );
//   }
// });

// var ListNavItem = React.createClass({});

// var ListItems = React.createClass({
//   render: function() {
//     return (
//       <li>aaaaaaaaaaaa</li>
//     );
//   }
// });

// var List.Item = React.createClass({});

// var ListPanel = React.createClass({});

// var ListLoadData = React.createClass({
//   getInitialState : function(){
//     return {data:[]};
//   },
//   componentDidMount : function(){
//     this.loadList();
//   },
//   loadList : function(){
//     $.ajax({
//       url : this.props.url,
//       dataType : 'json',
//       success : function(result){
//         this.setState({data: result.data});
//       }.bind(this),
//       error : function(){}.bind(this)
//     });
//   },
//   render: function() {
//     return (
//       <ListPanel data={this.state.data} />
//     );
//   }
// });

// var ListPage = React.createClass({
//   render: function() {
//     return (
//       {/*<ListLoadData url="data/list/index.json" />*/}
//       <div>
//         <h1>
//           {this.props.nav}
//         </h1>
//         <ul>
//           {this.props.items}
//         </ul>
//       </div>
//     );
//   }
// });


/* ============== Course View Pages ============= */
/**
 * 课程详情页
 * @param  {[type]} ){                 return (      <article></article>    );  }} [description]
 * @return {[type]}     [description]
 */
var CourseView = React.createClass({displayName: "CourseView",
  render : function(){
    var vid = this.props.params.courseId;
    // console.log(vid);
    return (
      React.createElement(CourseLoadData, {url: "data/view/"+vid+".json"})
    );
  }
});


// var BargainLoadData = React.createClass({});
var CourseContent = React.createClass({displayName: "CourseContent",
  render: function() {
    var _data = this.props.data;
    var _video = (
        React.createElement("video", {id: "CourseVideo", controls: true, height: "250", width: "100%;", title: "暂停", autoplay: "autoplay"}, 
          React.createElement("source", {src: _data.videoPath}), 
          "此页面上的内容需要较新版本的浏览器"
        )
    );
    return (
      React.createElement("div", null, 
        React.createElement(UI.Article, {title: _data.courseName, meta: _video}, 
           React.createElement("h2", {className: "am-padding-left courseview_teacher"}, _data.teacherName, " 老师 等你来砍价"), 
           React.createElement(UI.Article.Child, {role: "divider", className: "course_divider"}), 

           React.createElement("div", {className: "am-cf am-text-lg"}, 
            React.createElement("div", {className: "am-fl am-padding-left"}, "已砍到 ", React.createElement("strong", {className: "am-text-danger am-text-lg"}, _data.bargainPrice), " 元"), 
            React.createElement("div", {className: "am-fr am-padding-right"}, "课程原价", _data.price, "元")
           ), 

           React.createElement(UI.ButtonToolbar, {className: "am-center am-text-center"}, 
            React.createElement(UI.Button, {amSize: "lg", amStyle: "warning", round: true, className: "am-center course_btn"}, "先砍一下"), 
            React.createElement(UI.Button, {amSize: "lg", amStyle: "warning", round: true, className: "am-center course_btn"}, "帮TA砍价"), 
            React.createElement(UI.Button, {amSize: "lg", amStyle: "danger", round: true, className: "am-center course_btn"}, "立即购买"), 
            React.createElement(UI.Button, {amSize: "lg", amStyle: "success", round: true, className: "am-center course_btn"}, "分享给朋友帮砍价")
          ), 
          React.createElement("div", {className: "countdown"}, 
           React.createElement("p", {className: "am-text-sm am-text-center countdown_text", round: true}, "砍价倒计时：", React.createElement("strong", {className: "am-text-danger"}, "23"), " 小时")
           )
        ), 
       React.createElement(BargainUsers, {users: this.props.users})
      )
    );
  }
});

var CourseLoadData = React.createClass({displayName: "CourseLoadData",
  getInitialState : function(){
    return {data:{}, users: []};
  },
  componentDidMount : function(){
    this.loadCourseData();
  },
  loadCourseData : function(){
    $.ajax({
      url : this.props.url,
      dataType : 'json',
      success : function(result){
        this.setState({data: result.data, users: result.data.bargainLogs});
      }.bind(this),
      error : function(){}.bind(this)
    });
  },
  render: function() {
    return (
      React.createElement(CourseContent, {data: this.state.data, users: this.state.users})
    );
  }
});

var BargainUser = React.createClass({displayName: "BargainUser",
  render: function() {
    var item = this.props.user;
    return (
      React.createElement("tr", null, 
        React.createElement("td", null, React.createElement(UI.Image, {src: item.headimg, width: "46", height: "46", thumbnail: true, circle: true})), 
        React.createElement("td", null, item.nickname), 
        React.createElement("td", null, "砍掉", React.createElement("strong", {className: "am-text-danger"}, item.price), "元")
      )
    );
  }
});
var BargainUsers = React.createClass({displayName: "BargainUsers",
  render: function() {
    var items = this.props.users.map(function(result){
      return (
        React.createElement(BargainUser, {user: result})
      );
    });
    return (
      React.createElement(UI.Table, {fill: true, className: "am-margin-top-sm"}, 
        React.createElement("thead", null), 
        React.createElement("tbody", null, 
          items
        )
      )
    );
  }
});
/* ============== Router ============= */

var routes = (
  React.createElement(Route, {path: "/", component: AppWrap}, 
    React.createElement(Route, {name: "list", handler: CourseListBox}, 
      React.createElement(Route, {name: "listitem", path: "/list/:subjectId", handler: ListLoad}), 
      React.createElement(DefaultRoute, {name: "list-index", handler: CourseListBody})
    ), 
    React.createElement(Route, {name: "view", path: "view/:courseId", handler: CourseView}), 
    React.createElement(DefaultRoute, {handler: Welcome})
  )
);
 
Router.run(routes, function (Handler) {
  React.render(React.createElement(Handler, null), document.body);
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