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

var AjaxDialog = React.createClass({displayName: "AjaxDialog",
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
      React.createElement(UI.Modal, React.__spread({},  this.props, {className: cls}), 
        React.createElement(UI.Image, {src: "src/img/bargaining.gif", className: "am-center", width: "150", responsive: true})
      )
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
  React.createElement(UI.Modal, {title: false, closeIcon: false}, 
    React.createElement(UI.Image, {src: "src/img/bargaining.gif", className: "am-center", width: "150", responsive: true})
  )
);
var ShareModal = React.createClass({displayName: "ShareModal",
  render: function() {
    return (
      React.createElement("div", {className: "share_box"}, 
        React.createElement("div", {className: "am-modal am-modal-no-btn am-modal-active", tabindex: "-1", id: "doc-modal-1"}, 
          React.createElement("div", {className: "am-modal-dialog"}, 
            React.createElement("div", {className: "am-modal-bd"}, this.props.content)
          )
        ), 
        React.createElement("div", {className: "am-dimmer am-active", "data-am-dimmer": ""})
      )
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

var CountDown = React.createClass({displayName: "CountDown",
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
        React.createElement("p", {className: "am-text-sm am-text-center countdown_text", round: true}, 
          "砍价已结束"
        )
      );
      if(this.state.stat){
        _text = (
          React.createElement("p", {className: "am-text-sm am-text-center countdown_text", round: true}, 
            "砍价倒计时：", 
            React.createElement("strong", {className: "am-text-danger"}, this.state.hour), " 小时", 
            React.createElement("strong", {className: "am-text-danger"}, this.state.minite), " 分", 
            React.createElement("strong", {className: "am-text-danger"}, this.state.second), " 秒"
          )
        );
      }
    return (
      React.createElement("div", null, _text)
    );
  }
});
// var BargainLoadData = React.createClass({});
var CourseContent = React.createClass({displayName: "CourseContent",
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
        alert('恭喜您，成功砍掉' + d.price + '元');
        window.location.reload();
        return false;
        this.setState({stat: 1});
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
        alert('恭喜您，成功砍掉' + d.price + '元');
        window.location.reload();
        return false;
        this.setState({stat: 2});
      }.bind(this),
      error : function(){}.bind(this)
    });
  },
  render: function() {
    var _data = this.props.data;

    var _video = (
        React.createElement("video", {id: "CourseVideo", controls: true, height: "250", width: "100%;", title: "暂停"}, 
          React.createElement("source", {src: _data.videoPath}), 
          "此页面上的内容需要较新版本的浏览器"
        )
    );
    var countdown = "", btn = "", shareBtn = "";
    if(_data.type != 1){
      var _assistBtn = (React.createElement("a", {href: "#/assist", onClick: this.handleAssist.bind(this, this.props.cid, _data.stuId), className: "am-btn am-btn-warning am-btn-lg am-fl am-margin-left-sm am-round course_btn"}, "帮TA砍价"));
      if(_data.hasOwnProperty('bargainEndTime')){
        var _now = new Date();
        var _end = _data.bargainEndTime * 1000;
        if(_now.getTime() > _end){
          _assistBtn = (React.createElement("a", {href: "#/assist", className: "am-btn am-btn-warning am-disabled am-btn-lg am-fl am-round course_btn"}, "帮TA砍价"));
        }
      }
      
      // 帮TA砍价
      btn = (
        React.createElement("ul", {className: "am-avg-sm-2"}, 
          React.createElement("li", null, _assistBtn), 
          React.createElement("li", null, 
            React.createElement("a", {href: "/Welfares/", className: "am-btn am-btn-primary am-btn-lg am-fr am-round course_btn"}, "我也要参加")
          )
        )
      );
      // btn = (
        
      //   <div className="">
      //     {_assistBtn}
      //     <a href="/Welfares/" className="am-btn am-btn-primary am-btn-lg am-fr am-round course_btn am-margin-right-sm">我也要参加</a>
      //   </div>
      // );
      shareBtn = (
        React.createElement("a", {className: "am-btn am-center am-btn-success am-btn-sm am-round", 
              href: "http://mp.weixin.qq.com/s?__biz=MjM5MzA3ODIwMA==&mid=209968557&idx=1&sn=0b92f769e876d4a19d4f8513dca40dd8#rd"
            }, "关注学而思网校参加砍价")
      );
    }else{
      if(_data.hasOwnProperty('bargainEndTime')){
        // 立即购买
        btn = (
          React.createElement("ul", {className: "am-avg-sm-2"}, 
            React.createElement("li", null, React.createElement("a", {href: "/ShoppingCart/addCart/"+ this.props.cid + "-0-0-0", className: "am-btn am-btn-danger am-btn-lg am-center am-round am-fl course_btn"}, "立即购买")), 
            React.createElement("li", null, React.createElement(UI.Button, {amSize: "lg", onClick: this.handleShare, amStyle: "primary", round: true, className: "course_btn am-fr"}, "分享给朋友帮砍价"))
          )
        );
        // btn = (
        //   <div className="">
        //   <a href={"/ShoppingCart/addCart/"+ this.props.cid + "-0-0-0"} className="am-btn am-btn-danger am-btn-lg am-center am-round am-fl am-margin-left-sm course_btn">立即购买</a>
        //     {<UI.Button amSize="lg" amStyle="danger" round className="course_btn am-fl am-margin-left-sm">立即购买</UI.Button>}
        //     <UI.Button amSize="lg" onClick={this.handleShare} amStyle="primary" round className="course_btn am-fr am-margin-right-sm">分享给朋友帮砍价</UI.Button>
        //   </div>
        // );
        
      }else{
        // 先砍一下
        btn = (
        React.createElement("div", {className: "coursebtn_single"}, 
          /*<UI.ModalTrigger modal={modal}>*/
        	   React.createElement("a", {href: "#/bargain", onClick: this.handleBargain.bind(this, this.props.cid), className: "am-btn am-btn-warning am-btn-lg am-btn-center am-round course_btn"}, "先砍一下")
        	/*</UI.ModalTrigger>*/
          /*<UI.Button amSize="lg" amStyle="warning" round className="am-center course_btn">先砍一下</UI.Button>*/
        )
        );  
      }
      
      
    }
    if(_data.hasOwnProperty('bargainEndTime')){
    // 倒计时
      countdown = (
          React.createElement(CountDown, {start: _data.bargainStartTime, end: _data.bargainEndTime})
      );
    }
    var bargain_price = "";
    if(_data.bargainPrice){
    	bargain_price = (
    		React.createElement("div", {className: "am-fl am-padding-left"}, "已砍到 ", React.createElement("strong", {className: "am-text-danger am-text-lg"}, _data.bargainPrice), " 元")
    	);
    }
    var dialog = '';
    if(this.state.stat == 1){
      dialog = (loadingModal);
    }else if(this.state.stat == 2){
      var user_text = (React.createElement("p", null, 
        React.createElement("span", {className: "am-text-danger"}, " ", this.props.username, " "), 
        "正在热砍学而思网校福利课程，快来帮忙砍价，一起嗨！"
        )
      );
      dialog = (React.createElement(ShareModal, {content: user_text}));
    }
    return (
      React.createElement("div", null, 
        dialog, 
        React.createElement(UI.Article, {title: _data.courseName, meta: _video}, 
          React.createElement("h2", {className: "am-padding-left courseview_teacher"}, _data.teacherName, " 老师 等你来砍价"), 
          React.createElement(UI.Article.Child, {role: "divider", className: "course_divider"}), 

          React.createElement("div", {className: "am-cf am-text-lg"}, 
            bargain_price, 
            React.createElement("div", {className: "am-fr am-padding-right"}, "课程原价", _data.price, "元")
          ), 

          React.createElement(UI.ButtonToolbar, {className: "am-center am-text-center am-margin-sm"}, 
            btn
          ), 
          React.createElement("div", {className: "countdown am-margin-top-sm"}, countdown), 
          React.createElement("div", {className: "follow_wechat am-margin-sm am-text-center "}, 
            shareBtn
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
      React.createElement(CourseContent, {data: this.state.data, users: this.state.users, cid: this.props.id, username: this.props.username})
    );
  }
});

var BargainUsers = React.createClass({displayName: "BargainUsers",
  render: function() {
    var items = this.props.users.map(function(result, i){
      return (
        React.createElement("tr", {key: "user_" + i}, 
          React.createElement("td", {className: "am-text-middle"}, React.createElement(UI.Image, {src: result.headimg, width: "46", height: "46", thumbnail: true, circle: true})), 
          React.createElement("td", {className: "am-text-middle"}, result.nickname), 
          React.createElement("td", {className: "am-text-middle"}, "砍掉", React.createElement("strong", {className: "am-text-danger"}, result.price), "元")
        )
      );
    });
    return (
      React.createElement(UI.Panel, {header: "砍价信息", className: "am-margin-top-sm"}, 
      React.createElement(UI.Table, {fill: true}, 
        React.createElement("thead", null), 
        React.createElement("tbody", null, 
          items
        )
      )
      )
    );
  }
});
/* ============== Router ============= */
React.render(
  React.createElement(CourseLoadData, {url: bargain.courseUrl, id: bargain.courseId, username: bargain.myself}),
  mountNode
);