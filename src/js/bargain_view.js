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
// var Router = ReactRouter; // or var Router = ReactRouter; in browsers

// var DefaultRoute = Router.DefaultRoute;
// var Link = Router.Link;
// var Route = Router.Route;
// var RouteHandler = Router.RouteHandler;


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





/* ============== Course View Pages ============= */
/**
 * 课程详情页
 * @param  {[type]} ){                 return (      <article></article>    );  }} [description]
 * @return {[type]}     [description]
 */



// var BargainLoadData = React.createClass({});
var CourseContent = React.createClass({
  render: function() {
    var _data = this.props.data;
    var _video = (
        <video id="CourseVideo" controls height="250" width="100%;" title="暂停">
          <source src={_data.videoPath} />
          此页面上的内容需要较新版本的浏览器
        </video>
    );
    var countdown = "";
    var btn = "";
    if(_data.type != 1){
      btn = (
        <div className="coursebtn_single">
          <UI.Button amSize="lg" amStyle="warning" round className="am-center course_btn">帮TA砍价</UI.Button>
        </div>
      );
    }else{
      if(_data.bargainEndTime){
        btn = (
          <div className="">
            <UI.Button amSize="lg" amStyle="danger" round className="course_btn am-fl am-margin-left-sm">立即购买</UI.Button>
            <UI.Button amSize="lg" amStyle="success" round className="course_btn am-fr am-margin-right-sm">分享给朋友帮砍价</UI.Button>
          </div>
        );
        countdown = (
           <p className="am-text-sm am-text-center countdown_text" round>砍价倒计时：<strong className="am-text-danger">23</strong> 小时</p>
        );
      }else{
        btn = (
        <div className="coursebtn_single">
          <UI.Button amSize="lg" amStyle="warning" round className="am-center course_btn">先砍一下</UI.Button>
        </div>
        );  
      }
      
    }
    
    return (
      <div>
        <UI.Article title={_data.courseName} meta={_video}>
           <h2 className="am-padding-left courseview_teacher">{_data.teacherName} 老师 等你来砍价</h2>
           <UI.Article.Child role="divider" className="course_divider" />

           <div className="am-cf am-text-lg">
            <div className="am-fl am-padding-left">已砍到 <strong className="am-text-danger am-text-lg">{_data.bargainPrice}</strong> 元</div>
            <div className="am-fr am-padding-right">课程原价{_data.price}元</div>
           </div>

           <UI.ButtonToolbar className="am-center am-text-center am-margin-sm">
            {btn}
           {
          /*  <UI.Button amSize="lg" amStyle="warning" round className="am-center course_btn">先砍一下</UI.Button>
            <UI.Button amSize="lg" amStyle="warning" round className="am-center course_btn">帮TA砍价</UI.Button>
            <UI.Button amSize="lg" amStyle="danger" round className="am-center course_btn">立即购买</UI.Button>
            <UI.Button amSize="lg" amStyle="success" round className="am-center course_btn">分享给朋友帮砍价</UI.Button>
          */
         }
          </UI.ButtonToolbar>
          <div className="countdown am-margin-top-sm">{countdown}</div>
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

var BargainUsers = React.createClass({
  render: function() {
    var items = this.props.users.map(function(result, i){
      return (
        <tr key={"user_" + i}>
          <td className="am-text-middle"><UI.Image src={result.headimg} width='46' height='46' thumbnail circle /></td>
          <td className="am-text-middle">{result.nickname}</td>
          <td className="am-text-middle">砍掉<strong className="am-text-danger">{result.price}</strong>元</td>
        </tr>
      );
    });
    return (
      <UI.Panel header="帮砍信息" className="am-margin-top-sm">
      <UI.Table fill>
        <thead></thead>
        <tbody>
          {items}
        </tbody>
      </UI.Table>
      </UI.Panel>
    );
  }
});
/* ============== Router ============= */
React.render(
  <CourseLoadData url={bargain.courseUrl} id={bargain.courseId} />,
  mountNode
);