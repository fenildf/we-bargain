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
var AppWrap = React.createClass({
  render : function(){
    return (
      <div className="app_wrap">
        <RouteHandler />
        {/*this.props.children*/}        
      </div>
    );
  }
});
/**
 * 找不到时显示的内容
 * @param  {String} ){                 return (      <div className [description]
 * @return {[type]}     [description]
 */
var NotFound = React.createClass({
  render : function(){
    return (
      <div className="app_notfound">
        不好意思，您是不是迷路了！
      </div>
    );
  }
});




/* ============== Welcome Pages ============= */
/**
 * Welcome 组件
 * @param  {String} ){                 return (      <div className [description]
 * @return {[type]}     [description]
 */
var Welcome = React.createClass({
  render : function(){
    return (
      <div className="welcome">
        <WelcomeBox url="src/json/welcome_imglist.json" />
      </div>
    );
  }
});
/**
 * Welcome 页中的 ：单个图片组件
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
 * Welcome 页中的 ：图片列表
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
 * Welcome 页中的 ：提交按钮
 * @type {[type]}
 */
var WelcomeSubmit = React.createClass({
  render : function(){
    return (
      <p className="am-block am-padding-bottom-30">
        {/*<Link to="list" params={{userId: "user.id"}} query={{foo: "bar"}}>*/}
        <Link to="list">
          <UI.Image src="src/img/welcome_submit.png" className="welcome_submit am-center" responsive />
        </Link>
      </p>
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
        <WelcomeImgList data={this.state.data} />
        <WelcomeSubmit onClick={this.handleSubmit} />

      </UI.Container>
    );
  }
});




/* ============== Course List Pages ============= */
/**
 * 课程列表分类导航
 * @param  {[type]} ) {               var itemId [description]
 * @return {[type]}   [description]
 */
var NavItem = React.createClass({
  render: function() {
    var itemId = this.props.id;
    var par = this.props.par;
    var actCls = itemId == par ? 'am-active' : '';
    return (
      <li className={actCls} id={itemId} aria-par={par}>
        <Link to="listitem" activeClassName="am-active" params={{subjectId: itemId}}>{this.props.name}</Link>
      </li>
    );
  }
});
/**
 * 课程列表页的导航条
 * @param  {[type]} ){                 var _par [description]
 * @return {[type]}     [description]
 */
var NavBar = React.createClass({
  render : function(){
    var _par = this.props.par;
    var navNode = this.props.data.map(function(item){
      return (
        <NavItem act="" id={item.id} name={item.name} par={_par} />
      );
    });
    return (
          <ul className="am-nav am-nav-pills am-nav-justify">
            {navNode}
          </ul>
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
var NavBox = React.createClass({
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
      <div className="course_nav">
        <NavBar data={this.state.data} par={this.state.par} />
      </div>
    );
  }
});

/**
 * 列表中的单个项目
 * @type {[type]}
 */
var ListItem = React.createClass({
  render: function() {
    var par = this.props;
    var _teacher = par.teacher, teacher = [];
    $.each(_teacher, function(k, v){
      teacher.push(v);
    });
    teacher = teacher[0];
    return (
      <li id={"view_" + par.id} className="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left courselist_item">
        <div className="am-list-thumb am-u-sm-4 am-text-center am-padding-0">
          {/*<Link to="view" params={{courseId: 1}}>*/}
            <UI.Image src={teacher.img} responsive />
            <p className="am-center am-margin-xs">{teacher.name}</p>
          {/*</Link>*/}
        </div>
        <div className="am-list-main am-u-sm-8">
          <h4 class="am-list-item am-margin-bottom-0">{par.name}</h4>
          <div class="am-list-item-text">
            <p className="courselist_price am-margin-bottom-xs">课程价：<span className="am-text-danger">{par.price}</span> 元</p>
          </div>
          <div className="courselist_btn_go">
            <p className="am-text-xs am-text-center am-text-danger am-margin-bottom-0">已有123456人参加</p>
            <UI.Button amStyle="danger" block>
              <Link to="view" params={{courseId: par.id}}>马上砍</Link>
            </UI.Button>
          </div>
        </div>
      </li>
    );
  }
});

/**
 * 列表项
 * @type {[type]}
 */
var ListItems = React.createClass({
  render: function() {
    // console.log(this.props.data);
    var listNode = this.props.data.map(function(item){
      return (
        <ListItem id={item.courseId} name={item.courseName} price={item.price} teacher={item.teacher} />
      );
    });
    return (
      <ul className="am-list course_list">
        {listNode}
      </ul>
    );
  }
});

/**
 * 列表外围容器
 * @type {[type]}
 */
var ListBox = React.createClass({
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
       <div className="course_list_wrap">
        <ListItems data={this.state.data} />
       </div>
     );
   }
});

var ListLoad = React.createClass({
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
      <ListBox url={'data/' + _id + '/index.json'} />
    );
  }
});



/**
 * 课程列表组件
 * @param  {String} ){                 return (      <ul className [description]
 * @return {[type]}     [description]
 */
var CourseList = React.createClass({
  render : function(){
    return (
      <ul className="course_list"></ul>
    );
  }
});
/**
 * 课程列表容器
 * @param  {[type]} ) {                       return (      <div />    );  }} [description]
 * @return {[type]}   [description]
 */
var CourseListBody = React.createClass({
  render: function() {
    var sid = this.props.params.subjectId;
    // console.log(sid);
    // this.props.location.query.sort;
    return (
      <div />
    );
  }
});

/**
 * 课程列表页组件
 * @param  {[type]} ){                 var itemid [description]
 * @return {[type]}     [description]
 */
var CourseListBox = React.createClass({
  render : function(){
    var itemid = this.props.params.subjectId;
    return (
      <UI.Container>
        <UI.Panel>
          <NavBox url="src/json/subject.json" par={itemid} />
          <RouteHandler />
          {/*this.props.children*/}
        </UI.Panel>
      </UI.Container>
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
var CourseView = React.createClass({
  render : function(){
    var vid = this.props.params.courseId;
    // console.log(vid);
    return (
      <CourseLoadData url={"data/view/"+vid+".json"} />
    );
  }
});


// var BargainLoadData = React.createClass({});
var CourseContent = React.createClass({
  render: function() {
    var _data = this.props.data;
    var _video = (
        <video id="CourseVideo" controls height="250" width="100%;" title="暂停" autoplay="autoplay">
          <source src={_data.videoPath} />
          此页面上的内容需要较新版本的浏览器
        </video>
    );
    return (
      <div>
        <UI.Article title={_data.courseName} meta={_video}>
           <h2 className="am-padding-left courseview_teacher">{_data.teacherName} 老师 等你来砍价</h2>
           <UI.Article.Child role="divider" className="course_divider" />

           <div className="am-cf am-text-lg">
            <div className="am-fl am-padding-left">已砍到 <strong className="am-text-danger am-text-lg">{_data.bargainPrice}</strong> 元</div>
            <div className="am-fr am-padding-right">课程原价{_data.price}元</div>
           </div>

           <UI.ButtonToolbar className="am-center am-text-center">
            <UI.Button amSize="lg" amStyle="warning" round className="am-center course_btn">先砍一下</UI.Button>
            <UI.Button amSize="lg" amStyle="warning" round className="am-center course_btn">帮TA砍价</UI.Button>
            <UI.Button amSize="lg" amStyle="danger" round className="am-center course_btn">立即购买</UI.Button>
            <UI.Button amSize="lg" amStyle="success" round className="am-center course_btn">分享给朋友帮砍价</UI.Button>
          </UI.ButtonToolbar>
          <div className="countdown">
           <p className="am-text-sm am-text-center countdown_text" round>砍价倒计时：<strong className="am-text-danger">23</strong> 小时</p>
           </div>
        </UI.Article>
       <BargainUsers users={this.props.users} />
      </div>
    );
  }
});

var CourseLoadData = React.createClass({
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
      <CourseContent data={this.state.data} users={this.state.users} />
    );
  }
});

var BargainUser = React.createClass({
  render: function() {
    var item = this.props.user;
    return (
      <tr>
        <td><UI.Image src={item.headimg} width='46' height='46' thumbnail circle /></td>
        <td>{item.nickname}</td>
        <td>砍掉<strong className="am-text-danger">{item.price}</strong>元</td>
      </tr>
    );
  }
});
var BargainUsers = React.createClass({
  render: function() {
    var items = this.props.users.map(function(result){
      return (
        <BargainUser user={result} />
      );
    });
    return (
      <UI.Table fill className="am-margin-top-sm">
        <thead></thead>
        <tbody>
          {items}
        </tbody>
      </UI.Table>
    );
  }
});
/* ============== Router ============= */

var routes = (
  <Route path="/" component={AppWrap}>
    <Route name="list" handler={CourseListBox} >
      <Route name="listitem" path="/list/:subjectId" handler={ListLoad} />
      <DefaultRoute name="list-index" handler={CourseListBody} />
    </Route>
    <Route name="view" path="view/:courseId" handler={CourseView} />
    <DefaultRoute handler={Welcome} />
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