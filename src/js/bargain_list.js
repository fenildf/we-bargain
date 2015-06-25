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
    window.location.href = d.data;
    return false;
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





/* ============== Course List Pages ============= */

var ListPage = React.createClass({
  getInitialState : function(){
    return {data:[], id: 0};
  },
  componentDidMount : function(){
    this.loadListData();
  },
  loadListData : function(){
    $.ajax({
      url: this.props.navUrl,
      dataType : 'json',
      success : function(result){
        var d = xue.ajaxCheck(result);
        if(!d){
          return false;
        }
        var list = [], sid = this.props.defaultId || 0;
        
        $.each(result.data, function(k, v){
          sid = sid == 0 ? v.subjectId : sid;
          list.push({id: v.id, name: v.name});
        });
        this.setState({data: list, id : sid});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var data = this.state.data;
    return (
      <UI.Container>
        <ListNavbar data={this.state.data} id={this.state.id} url={this.props.listUrl} />
      </UI.Container>
    );
  }
});

var ListNavbar = React.createClass({
  getInitialState : function(){
    return {data:[], id: 0};
  },
  componentDidMount : function(){
    var that = this;
    setTimeout(function(){
      that.loadListData(that.props.id);
    }, 500);
  },
  
  handleClick : function(id, i){
    this.loadListData(id);
  },
  loadListData : function(id, i){
    $.ajax({
      url : this.props.url + id + '.json',
      dataType : 'json',
      success : function(result){
        var d = xue.ajaxCheck(result);
        if(!d){
          return false;
        }
        this.setState({data: d, id: id});
      }.bind(this),
      error: function(){}.bind(this)
    });
  },
  render: function() {
    var nav = this.props.data;
    var _item = nav.map(function(d, i){
      var cls = this.state.id == d.id ? ' am-active' : '';
      console.log('cls: ' + cls);
      console.log('---------------');
      return (
        <li id={"nav_" + i} key={i}>
          <a className={"am-link-muted" + cls} href={"#/" + d.id} params={{id: d.id}} onClick={this.loadListData.bind(this, d.id, i)}>{d.name}</a>
        </li>
      );
    }, this);
    // this.loadListData(this.props.id);
    return (
      <UI.Panel className="am-margin-top-sm">
        <ul className="am-nav am-nav-pills am-nav-justify navlist">
          {_item}
        </ul>
        <Listbar data={this.state.data} id={this.state.id} />
      </UI.Panel>
    );
  }
});

var Listbar = React.createClass({
  render: function() {
    var listNode = this.props.data.map(function(con){
      var btn = (
        <div className="list_btn list_btn_go">
            <p className="am-text-xs am-text-center am-text-danger am-margin-bottom-0">已有{con.bargainNum}人参加</p>
            <UI.Button amStyle="danger" block>
              <a href={"view.html?id=" + con.courseId}>马上砍</a>
            </UI.Button>
          </div>
      );
      if(con.hasOwnProperty('assistNum')){
        btn = (
          <div className="list_btn list_btn_view">
            <p className="am-text-xs am-text-center am-text-primary am-margin-bottom-0">已有{con.assistNum}人帮砍</p>
            <UI.Button amStyle="primary" block>
              <a href={"view.html?id=" + con.courseId}>查看详情</a>
            </UI.Button>
          </div>
        );
      }
      var imgurl = con.teacherImg ? con.teacherImg : 'data:img/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QNvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAxNCA3OS4xNTE0ODEsIDIwMTMvMDMvMTMtMTI6MDk6MTUgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NUVBMjc2MDY3Qjk5RTExMTlGQzdGNzQwMzMzRUE0M0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Nzg0NjA0RkQ3QjY1MTFFNEI0NEFERUE4NUJCMzNEMkMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Nzg0NjA0RkM3QjY1MTFFNEI0NEFERUE4NUJCMzNEMkMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNTM4RUFGMUI5NzQxMUUzODA3NkVFOUQxNjJENjVGQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNTM4RUFGMkI5NzQxMUUzODA3NkVFOUQxNjJENjVGQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAICAgICAgICAgIDAgICAwQDAgIDBAUEBAQEBAUGBQUFBQUFBgYHBwgHBwYJCQoKCQkMDAwMDAwMDAwMDAwMDAwBAwMDBQQFCQYGCQ0LCQsNDw4ODg4PDwwMDAwMDw8MDAwMDAwPDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIADIAMgMBEQACEQEDEQH/xABwAAABBAMBAQAAAAAAAAAAAAAAAQIGCAMFBwQJAQEAAAAAAAAAAAAAAAAAAAAAEAACAQMBBQYGAgMBAAAAAAABAgMABAURITESkwZBUWFxgdEyEzNVBxdSFEKi0yQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APpiSdTtoDU9hOtBtMXiMtmpjBjLaS6dNDIwOiID/JiQBQbLK9J9R4WA3N9ZMLZfjnicSKuv8uE6j1oIyWJ3sT60Bqe+gdqe/soGneaBKCyv49toIelcfJCgV7kyS3D6bWfjK6nyAAFBMp4op4ZYZkEkMqMkqEagqRoQR5UFO5VVZZVT4FdlTyBIFAygd7UCHeaBKCyn49ycWQ6atIUBWXGf+WdTptKjUMNOwg0EsyF7DjrK6v5/o2cTSyAbyFGug8TuoKi3M/8AZubi5K8P9iV5eHu42LaemtBhoHe1Ah3mgVEeVxHEjSyNsWNAWYnwA20Hb/xrgc3i5r67yFu1naXkKLDBI2jl1bXiKdmzvoJZ1visjmcDLZYwBrhpY3eIvwcaKdSup2d2w0Fbb2wvcfKYL60ls5V3pKpXXyO4+lB5KB3tQbvp7DNnszaYwMY0lYtcSjesabWI8ewUFncbh8biIUgx9nFbIg04lUcbeLNvJ86DZUBQYZ7eC5jaK4hSeJho0cihlPoaCvn5B6Yt8DeW93YJ8uwyHEPkbxFKu0qvgQdR60HP9D/rrQSXpfqBemstJkHtDeI8LwtGGCsOJgdQTqP8aDo37btPsk/OT2oD9t2f2Sfmp7UB+27P7JPzU9qA/bdn9kn5qe1BEur+t4uprG2soca9oIJ/nNLI4YnRSoUAAd+2ggv/ACoHN8TfS30CcqgOVQHKoDlUByqDNyvp0H//2Q==';
      
      return (
        <li key={con.courseId} id={"view_" + con.courseId} className="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left courselist_item">
        <div className="am-list-thumb am-u-sm-3 am-text-center am-padding-xs">
            <UI.Image src={imgurl} width="60" height="60" responsive className="am-center am-img-thumbnail am-radius" />
            <p className="am-center am-margin-xs">{con.teacherName}</p>
        </div>
        <div className="am-list-main am-u-sm-9">
          <h4 className="am-list-item am-margin-bottom-0">{con.courseName}</h4>
          <div className="am-list-item-text">
            <p className="courselist_price am-margin-bottom-xs">课程价：<span className="am-text-danger">{con.price}</span> 元</p>
          </div>
          {btn}
        </div>
      </li>
      );
    });
    return (
      <ul className="am-list course_list am-margin-bottom-0" id={"subject_" + this.props.id}>
        {listNode}
      </ul>
    );
  }
});




/* ============== Router ============= */

// var routes = (
//   <Route path="/" component={AppWrap}>
//     <Route name="list" handler={CourseListBox} >
//       <Route name="listitem" path="/list/:subjectId" handler={ListLoad} />
//       <DefaultRoute name="list-index" handler={CourseListBody} />
//     </Route>
//     <Route name="view" path="view/:courseId" handler={CourseView} />
//     <DefaultRoute handler={Welcome} />
//   </Route>
// );
 // 
// var routes = (
//   <Route path="/" handler={ListPage}>
//     <Route name="list" path="#/:id" component={Listbar} />
//     <DefaultRoute handler={ListPage} />
//   </Route>
// );
// Router.run(routes, Router.HistoryLocation, function (Handler) {
//   React.render(<Handler/>, mountNode);
// });
React.render(
  <ListPage navUrl={bargain.subjectUrl} listUrl={bargain.listUrl} defaultId={bargain.defaultId} />,
  mountNode
);