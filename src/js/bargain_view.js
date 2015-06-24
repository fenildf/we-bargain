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
    // alert(d.data);
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
var AlertModal = React.createClass({
  render: function() {
    return (
      <UI.Modal type="alert" title="提示">{this.props.content}</UI.Modal>
    );
  }
});


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
    return {stat:0, con: ''};
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
        }, 3000);
      }.bind(this),
      success : function(result){
        var d = xue.ajaxCheck(result);
        if(result.stat == 0){
          this.setState({stat: 3, con : result.data})
          return false;
        }
        if(!d){
          return false;
        }
        this.setState({stat: 1, con : '恭喜您，成功砍掉' + d.price + '元'});
        // alert('恭喜您，成功砍掉' + d.price + '元');
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
      url : '/Welfares/assistBargain/' + cid + '/21210',
      dataType : 'json',
      beforeSend : function(){
        that.setState({stat: 1});
      }.bind(this),
      complete : function(){
        setTimeout(function(){
          that.setState({stat: 0});
        }, 3000);
      }.bind(this),
      success : function(result){
        var d = xue.ajaxCheck(result);
        if(result.stat == 0){
          this.setState({stat: 3, con : result.data})
          return false;
        }
        if(!d){
          return false;
        }
        this.setState({stat: 1, con : '恭喜您，成功砍掉' + d.price + '元'});
        // alert('恭喜您，成功砍掉' + d.price + '元');
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
        <video id="CourseVideo" controls height="250" width="100%;" title="暂停">
          <source src={_data.videoPath} />
          此页面上的内容需要较新版本的浏览器
        </video>
    );
    var countdown = "", btn = "", shareBtn = "";
    if(_data.type != 1){
      var _assistBtn = (<a href="#/assist" onClick={this.handleAssist.bind(this, this.props.cid, _data.stuId)} className="am-btn am-btn-warning am-btn-lg am-fl am-margin-left-sm am-round course_btn">帮TA砍价</a>);
      if(_data.hasOwnProperty('bargainEndTime')){
        var _now = new Date();
        var _end = _data.bargainEndTime * 1000;
        if(_now.getTime() > _end){
          _assistBtn = (<a href="#/assist" className="am-btn am-btn-warning am-disabled am-btn-lg am-fl am-round course_btn">帮TA砍价</a>);
        }
      }
      
      // 帮TA砍价
      btn = (
        <ul className="am-avg-sm-2">
          <li>{_assistBtn}</li>
          <li>
            <a href="/Welfares/" className="am-btn am-btn-primary am-btn-lg am-fr am-round course_btn">我也要参加</a>
          </li>
        </ul>
      );
      // btn = (
        
      //   <div className="">
      //     {_assistBtn}
      //     <a href="/Welfares/" className="am-btn am-btn-primary am-btn-lg am-fr am-round course_btn am-margin-right-sm">我也要参加</a>
      //   </div>
      // );
      shareBtn = (
        <a className="am-btn am-center am-btn-success am-btn-sm am-round"
              href="http://mp.weixin.qq.com/s?__biz=MjM5MzA3ODIwMA==&mid=209968557&idx=1&sn=0b92f769e876d4a19d4f8513dca40dd8#rd"
            >关注学而思网校参加砍价</a>
      );
    }else{
      if(_data.hasOwnProperty('bargainEndTime')){
        // 立即购买
        btn = (
          <ul className="am-avg-sm-2">
            <li><a href={"/ShoppingCart/addCart/"+ this.props.cid + "-0-0-0"} className="am-btn am-btn-danger am-btn-lg am-center am-round am-fl course_btn">立即购买</a></li>
            <li><UI.Button amSize="lg" onClick={this.handleShare} amStyle="primary" round className="course_btn am-fr">分享给朋友帮砍价</UI.Button></li>
          </ul>
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
        <div className="coursebtn_single">
        	<a href="#/bargain" onClick={this.handleBargain.bind(this, this.props.cid)} className="am-btn am-btn-warning am-btn-lg am-btn-center am-round course_btn">先砍一下</a>
        	{/*<UI.Button amSize="lg" amStyle="warning" round className="am-center course_btn">先砍一下</UI.Button>*/}
        </div>
        );  
      }
      
      
    }
    if(_data.hasOwnProperty('bargainEndTime')){
    // 倒计时
      countdown = (
          <CountDown start={_data.bargainStartTime} end={_data.bargainEndTime} />
      );
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
    }else if(this.state.stat == 3){
      dialog = (<AlertModal content={this.state.con} />);
    }


    var coursePriceBox = (
        <div className="am-g am-text-lg">
          <div className="am-u-sm-6">
            <div className="am-fl">{bargain_price}</div>
          </div>
          <div className="am-u-sm-6">
            <div className="am-fr">课程原价{_data.price}元</div>
          </div>
        </div>
    );
    return (
      <div>
        {dialog}
        
        {coursePriceBox}
        <UI.ButtonToolbar className="am-center am-text-center am-margin-sm">
          {btn}
        </UI.ButtonToolbar>
        <div className="countdown am-margin-top-sm">{countdown}</div>
        <div className="follow_wechat am-margin-sm am-text-center ">
          {shareBtn}
        </div>
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
      var imgurl = result.headimg ? result.headimg : 'data:img/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QNvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NUVBMjc2MDY3Qjk5RTExMTlGQzdGNzQwMzMzRUE0M0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Nzg0NjA0RkQ3QjY1MTFFNEI0NEFERUE4NUJCMzNEMkMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Nzg0NjA0RkM3QjY1MTFFNEI0NEFERUE4NUJCMzNEMkMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNTM4RUFGMUI5NzQxMUUzODA3NkVFOUQxNjJENjVGQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNTM4RUFGMkI5NzQxMUUzODA3NkVFOUQxNjJENjVGQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAICAgICAgICAgIDAgICAwQDAgIDBAUEBAQEBAUGBQUFBQUFBgYHBwgHBwYJCQoKCQkMDAwMDAwMDAwMDAwMDAwBAwMDBQQFCQYGCQ0LCQsNDw4ODg4PDwwMDAwMDw8MDAwMDAwPDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIADIAMgMBEQACEQEDEQH/xABwAAABBAMBAQAAAAAAAAAAAAAAAQIGCAMFBwQJAQEAAAAAAAAAAAAAAAAAAAAAEAACAQMBBQYGAgMBAAAAAAABAgMABAURITESkwZBUWFxgdEyEzNVBxdSFEKi0yQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APpiSdTtoDU9hOtBtMXiMtmpjBjLaS6dNDIwOiID/JiQBQbLK9J9R4WA3N9ZMLZfjnicSKuv8uE6j1oIyWJ3sT60Bqe+gdqe/soGneaBKCyv49toIelcfJCgV7kyS3D6bWfjK6nyAAFBMp4op4ZYZkEkMqMkqEagqRoQR5UFO5VVZZVT4FdlTyBIFAygd7UCHeaBKCyn49ycWQ6atIUBWXGf+WdTptKjUMNOwg0EsyF7DjrK6v5/o2cTSyAbyFGug8TuoKi3M/8AZubi5K8P9iV5eHu42LaemtBhoHe1Ah3mgVEeVxHEjSyNsWNAWYnwA20Hb/xrgc3i5r67yFu1naXkKLDBI2jl1bXiKdmzvoJZ1visjmcDLZYwBrhpY3eIvwcaKdSup2d2w0Fbb2wvcfKYL60ls5V3pKpXXyO4+lB5KB3tQbvp7DNnszaYwMY0lYtcSjesabWI8ewUFncbh8biIUgx9nFbIg04lUcbeLNvJ86DZUBQYZ7eC5jaK4hSeJho0cihlPoaCvn5B6Yt8DeW93YJ8uwyHEPkbxFKu0qvgQdR60HP9D/rrQSXpfqBemstJkHtDeI8LwtGGCsOJgdQTqP8aDo37btPsk/OT2oD9t2f2Sfmp7UB+27P7JPzU9qA/bdn9kn5qe1BEur+t4uprG2soca9oIJ/nNLI4YnRSoUAAd+2ggv/ACoHN8TfS30CcqgOVQHKoDlUByqDNyvp0H//2Q==';
      
      return (
        <tr key={"user_" + i}>
          <td className="am-text-middle">
            <UI.Image src={imgurl} width='46' height='46' thumbnail circle />
          </td>
          <td className="am-text-middle">{result.nickname}</td>
          <td className="am-text-middle">砍掉<strong className="am-text-danger">{result.price}</strong>元</td>
        </tr>
      );
    });
    return (
      <UI.Panel header="砍价信息" className="am-margin-top-sm">
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