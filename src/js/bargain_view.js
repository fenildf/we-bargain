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

var xue = xue || {};
xue.ajaxCheck = function(d){
  if(d.stat == -1){
    window.location.href = '/Welfares/lists/'; return false;
  }else if(d.stat == 0){
    alert(d.data);
    return false;
  }else{
    return d.data;
  }

};
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

var AjaxDialog = React.createClass({
  getInitialState : function(){
    return {show: true}
  },
  componentDidMount : function(){
    var that = this;
    $(document).ajaxStop(function(){
      that.setState({show: false});
    });
  },
  render: function() {
    var cls = this.state.show ? 'js-modal-open' : 'js-modal-close'
    return (
      <UI.Modal {...this.props} className={cls}>
        <UI.Image src="src/img/bargaining.gif" className="am-center" width="150" responsive />
      </UI.Modal>
    );
  }
});

var ajaxStart = {};


/* ============== Course View Pages ============= */
/**
 * 课程详情页
 * @param  {[type]} ){                 return (      <article></article>    );  }} [description]
 * @return {[type]}     [description]
 */

var loadingModal = (
  <UI.Modal title={false} closeIcon={false}>
    <UI.Image src="src/img/bargaining.gif" className="am-center" width="150" responsive />
  </UI.Modal>
);
var ShareModal = React.createClass({
  render: function() {
    return (
      <div className="share_box">
        <div className="am-modal am-modal-no-btn am-modal-active" tabindex="-1" id="doc-modal-1">
          <div className="am-modal-dialog">
            <div className="am-modal-bd">{this.props.content}</div>
          </div>
        </div>
        <div className="am-dimmer am-active" data-am-dimmer=""></div>
      </div>
    );
  }
});


// var modalInstance = (
//   <UI.ModalTrigger
//     modal={modal}>
//     <UI.Button amStyle="primary">Loading 窗口</UI.Button>
//   </UI.ModalTrigger>
// );


var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
  }
};

var CountDown = React.createClass({
  mixins: [SetIntervalMixin], // 引用 mixin
  getInitialState : function(){
    return {
      stat : false,
      day:0,
      hour:0,
      minite:0,
      second:0
    };
  },
  componentDidMount : function(){
    this.handleCount();
    this.setInterval(this.handleCount, 1000); // 调用 mixin 的方法
  },
  handleCount : function(d){
    var _state = {
      stat   : false,
      day    : 0,
      hour   : 0,
      minite : 0,
      second : 0
    };
    function pad(n) {
      return (n < 10 ? '0' : '') + n;
    }
    var startTime = new Date();
    startTime = startTime.getTime();
    var endTime = this.props.end * 1000;
    var lag = (endTime - startTime) / 1000; //当前时间和结束时间之间的秒数


    // console.log('===============');
    // console.log('end: ' + endTime);
    // console.log('str: ' + startTime);



    // var nowTime = startTime;
    // var svrTime = this.props.start * 1000;
    // var newTime = {
    //   start : svrTime - nowTime,
    //   end : endTime
    // };
    // console.log('s: ' + newTime.start);
    // console.log('e: ' + newTime.end);
    // console.log('-----------------------');

    // // var lag = (newTime.end - newTime.start) / 1000; //当前时间和结束时间之间的秒数
    // // 
    // // 
    // var ln = (newTime.end - newTime.start); //当前时间和结束时间之间的秒数

    // ln = ln + nowTime;
    // console.log('ln: ' + ln);
    // lag = ln / 1000;

    var content = '';
    if (lag > 0) {
      _state.stat = true;
      _state.hour = pad(Math.floor((lag / 3600) % 24)) ;
      _state.minite = pad(Math.floor((lag / 60) % 60)) ;
      _state.second = pad(Math.floor(lag % 60));
      _state.day = pad(Math.floor((lag / 3600) / 24));
    } else{
        _state.stat = false;
        this.intervals.map(clearInterval);
    }
    this.setState(_state);
  },
  render: function() {
    var _text = (
        <p className="am-text-sm am-text-center countdown_text" round>
          砍价已结束
        </p>
      );
      if(this.state.stat){
        _text = (
          <p className="am-text-sm am-text-center countdown_text" round>
            砍价倒计时：
            <strong className="am-text-danger">{this.state.hour}</strong> 小时
            <strong className="am-text-danger">{this.state.minite}</strong> 分
            <strong className="am-text-danger">{this.state.second}</strong> 秒
          </p>
        );
      }
    return (
      <div>{_text}</div>
    );
  }
});
// var BargainLoadData = React.createClass({});
var CourseContent = React.createClass({
  getInitialState : function(){
    return {stat:0};
  },
  componentDidMount : function(){
    // return (<AjaxDialog />);
  },
  handleShare : function(){
    this.setState({ stat: 2 });
  },
  handleBargain : function(cid, uid){
    var that = this;
    $.ajax({
      url : '/Welfares/firstBargain/' + cid,
      dataType : 'json',
      beforeSend : function(){
        that.setState({stat: 1});
      }.bind(this),
      complete : function(){
        setTimeout(function(){
          that.setState({stat: 0});
        }, 2000);
      }.bind(this),
      success : function(result){
        var d = xue.ajaxCheck(result);
        if(!d){
          return false;
        }
      }.bind(this),
      error : function(){}.bind(this)
    });
  },
  handleAssist : function(cid, uid){
    var that = this;
    $.ajax({
      url : '/Welfares/assistBargain/' + cid + '/' + uid,
      dataType : 'json',
      beforeSend : function(){
        that.setState({stat: 1});
      }.bind(this),
      complete : function(){
        setTimeout(function(){
          that.setState({stat: 0});
        }, 2000);
      }.bind(this),
      success : function(result){
        var d = xue.ajaxCheck(result);
        if(!d){
          return false;
        }
      }.bind(this),
      error : function(){}.bind(this)
    });
  },
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
      // 帮TA砍价
      btn = (
        <div className="">
          {/*<UI.ModalTrigger modal={modal}>*/}
          <a href="#/assist" onClick={this.handleAssist.bind(this, this.props.cid, _data.stuId)} className="am-btn am-btn-warning am-btn-lg am-fl am-margin-left-sm am-round course_btn">帮TA砍价</a>
          {/*</UI.ModalTrigger>*/}
          <a href="/Welfares/" className="am-btn am-btn-primary am-btn-lg am-fr am-round course_btn am-margin-right-sm">我也要参加</a>
          {/*<UI.Button amSize="lg" amStyle="warning" round className="am-center course_btn">帮TA砍价</UI.Button>*/}
        </div>
      );
    }else{
      if(_data.bargainEndTime){
        // 立即购买
        btn = (
          <div className="">
          <a href={"/ShoppingCart/addCart/"+ this.props.cid + "-0-0-0"} className="am-btn am-btn-danger am-btn-lg am-center am-round am-fl am-margin-left-sm course_btn">立即购买</a>
            {/*<UI.Button amSize="lg" amStyle="danger" round className="course_btn am-fl am-margin-left-sm">立即购买</UI.Button>*/}
            <UI.Button amSize="lg" onClick={this.handleShare} amStyle="primary" round className="course_btn am-fr am-margin-right-sm">分享给朋友帮砍价</UI.Button>
          </div>
        );
        // 倒计时
        countdown = (
            <CountDown start={_data.bargainStartTime} end={_data.bargainEndTime} />
        );
      }else{
        // 先砍一下
        btn = (
        <div className="coursebtn_single">
          {/*<UI.ModalTrigger modal={modal}>*/}
        	   <a href="#/bargain" onClick={this.handleBargain.bind(this, this.props.cid)} className="am-btn am-btn-warning am-btn-lg am-btn-center am-round course_btn">先砍一下</a>
        	{/*</UI.ModalTrigger>*/}
          {/*<UI.Button amSize="lg" amStyle="warning" round className="am-center course_btn">先砍一下</UI.Button>*/}
        </div>
        );  
      }
      
    }
    var bargain_price = "";
    if(_data.bargainPrice){
    	bargain_price = (
    		<div className="am-fl am-padding-left">已砍到 <strong className="am-text-danger am-text-lg">{_data.bargainPrice}</strong> 元</div>
    	);
    }
    var dialog = '';
    if(this.state.stat == 1){
      dialog = (loadingModal);
    }else if(this.state.stat == 2){
      var user_text = (<p>
        <span className="am-text-danger"> {this.props.username} </span>
        正在热砍学而思网校福利课程，快来帮忙砍价，一起嗨！
        </p>
      );
      dialog = (<ShareModal content={user_text} />);
    }
    return (
      <div>
        {dialog}
        <UI.Article title={_data.courseName} meta={_video}>
          <h2 className="am-padding-left courseview_teacher">{_data.teacherName} 老师 等你来砍价</h2>
          <UI.Article.Child role="divider" className="course_divider" />

          <div className="am-cf am-text-lg">
            {bargain_price}
            <div className="am-fr am-padding-right">课程原价{_data.price}元</div>
          </div>

          <UI.ButtonToolbar className="am-center am-text-center am-margin-sm">
            {btn}
          </UI.ButtonToolbar>
          <div className="countdown am-margin-top-sm">{countdown}</div>
          <div className="follow_wechat am-margin-top-sm">
            <UI.Button amStyle="success" round amSize="sm " className="am-center">关注学而思网校参加砍价</UI.Button>
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
        var d = xue.ajaxCheck(result);
        if(!d){
          return false;
        }
        this.setState({data: result.data, users: result.data.bargainLogs || []});
      }.bind(this),
      error : function(){}.bind(this)
    });
  },
  render: function() {
    return (
      <CourseContent data={this.state.data} users={this.state.users} cid={this.props.id} username={this.props.username} />
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
  <CourseLoadData url={bargain.courseUrl} id={bargain.courseId} username={bargain.myself} />,
  mountNode
);