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





/* ============== Course List Pages ============= */

// var LikeButton = React.createClass({
//   getInitialState: function() {
//     return {liked: false};
//   },
//   handleClick: function(event) {
//     this.setState({liked: !this.state.liked});
//   },
//   render: function() {
//     var text = this.state.liked ? 'like' : 'haven\'t liked';
//     return (
//       <p onClick={this.handleClick}>
//         You {text} this. Click to toggle.
//       </p>
//     );
//   }
// });

// React.render(
//   <LikeButton />,
//   mountNode
// );


var ListNav = React.createClass({
  getInitialState : function(){
    return {sid: 0, items: {}};
  },
  handleClick : function(i, sid, item){
    console.log(item);
    this.setState({
      sid: sid,
      items : item
    });
  },
  
  render: function() {

    var _data = this.props.data;
    console.info('===-=-=-=-=-=-=-=-=-===');
    // console.log(_data);
    // console.log('------------------------');
    // return (<div>{_data.length}</div>);
    var nav = [], list = {}, item = [], sid = 0;
    $.each(this.props.data,function(k, v){
      var _nav = {id: v.subjectId, name: v.subjectName},
          _list = v.courseList;
      nav.push(_nav);
      list[v.subjectId] = _list;
    });
    // sid = _data[0].subjectId;
    // item = _data[0].courseList;

    console.log(_data[0]);
    sid = _data[0] ? _data[0].subjectId : sid;
    item = _data[0] ? _data[0].courseList : item;
    var _item = nav.map(function(d, i){
      return (
        <li key={i}>
          <a to="list" params={{id: d.id}} onClick={this.handleClick.bind(this, i, d.id, list[d.id])}>{d.name}</a>
          {/*<Link to="list" params={{id: d.id}} onClick={this.handleClick.bind(this, i, d.id, list[d.id])}>{d.name}</Link>*/}
        </li>
      );
    }, this);
    // return (<div>{_item}</div>);
    // var itemsData = _data.list[_data.sid];
    var _temp = this.state.items.length ? this.state.items : item;
    return (
      <UI.Panel className="am-margin-top-sm">
        <ul className="am-nav am-nav-pills am-nav-justify">
          {_item}
        </ul>
        <ListItems id={this.state.sid} list={list} nav={nav} items={_temp} />
      </UI.Panel>
    );
  }
});

// var ListNavItem = React.createClass({});

var ListItems = React.createClass({
  render: function() {
    // console.clear();
    console.log('*****************');
    console.log(this.props.nav[0]);
    // var prop = this.props;
    // var id = prop.nav[0].id;
    // var item = prop.list[id];
    // console.log(item);
    return (<div></div>);
    var _data = this.props.data.length 
                ? this.props.data 
                : this.props.inits.list[this.props.inits.sid];
    var arr = [];
    // console.log(this.props.data);
    console.log($.isArray(_data));
    // var newarr = $.map(_data, function(k, v){
    //     console.log('k: ' + k);
    //     console.log(v);
    // });
    // $.each(_data, function(k, v){
    //   console.log('key: ' + k);
    //   console.log(v);
    //   console.log('--------------');
    // });
    // console.log(_data);
    // var narr = $.makeArray(_data);
    // var arr = $.map(narr, function(r){
      // return r;
    // });
    // console.log(arr);
    var listNode = _data.map(function(con){
      return (
        <li key={con.courseId} id={"view_" + con.courseId} className="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left courselist_item">
        <div className="am-list-thumb am-u-sm-4 am-text-center am-padding-0">
          {/*<Link to="view" params={{courseId: 1}}>*/}
            <UI.Image src={con.teacherImg} responsive />
            <p className="am-center am-margin-xs">{con.teacherName}</p>
          {/*</Link>*/}
        </div>
        <div className="am-list-main am-u-sm-8">
          <h4 class="am-list-item am-margin-bottom-0">{con.CourseName}</h4>
          <div class="am-list-item-text">
            <p className="courselist_price am-margin-bottom-xs">课程价：<span className="am-text-danger">{con.price}</span> 元</p>
          </div>
          <div className="courselist_btn_go">
            <p className="am-text-xs am-text-center am-text-danger am-margin-bottom-0">已有{con.bargainNum}人参加</p>
            <UI.Button amStyle="danger" block>
              <Link to="view" params={{courseId: con.id}}>马上砍</Link>
            </UI.Button>
          </div>
        </div>
      </li>
      );
    });
    return (
      <ul className="am-list course_list">
        {listNode}
      </ul>
    );
  }
});

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

var ListPage = React.createClass({
  getInitialState : function(){
    return {data:[], nav : [], list: {}, items: [], sid : 0};
  },
  componentDidMount : function(){
    this.loadListData();
  },
  loadListData : function(){
    $.ajax({
      url: '/data/list/index.json',
      dataType : 'json',
      success : function(result){
        if(result.stat !== 1){ return false; }
        var t = {
          nav : [],
          list : {},
          sid : 0,
          items : []
        };
        $.each(result.data, function(k, v){
          t.nav.push({id: v.subjectId, name : v.subjectName});
          t.list[v.subjectId] = v.courseList;
          t.sid = v.subjectId;
          t.items = v.courseList;
        });
        this.setState({data: result.data, nav : t.nav, list : t.list, sid : t.sid, items : t.items});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var text = "ahahahahahahah";
    var data = this.state.data;
    return (
      <UI.Container>
        {text}
        <ListNavbar nav={this.state.nav} list={this.state.list} items={this.state.items} sid={this.state.sid} />
      </UI.Container>
    );
  }
});

var ListNavbar = React.createClass({
  getInitialState : function(){
    return {data:[], id: 0};
  },
  handleClick : function(i, id, list){
    var li = list[i];
    console.log(li);
    // this.setState({data: });
  },
  render: function() {
    console.log('===============');
    var nav = this.props.nav, list = this.props.list;
    // console.log(list);
    var _item = nav.map(function(d, i){
      return (
        <li key={i}>
          <a href={"#/" + d.id} params={{id: d.id}} onClick={this.handleClick.bind(this, i, d.id, list[d.id])}>{d.name}</a>
        </li>
      );
    }, this);
    var items = this.state.data.length ? this.state.data : this.props.items;
    // console.log(items);
    return (
      <UI.Panel className="am-margin-top-sm">
        <ul className="am-nav am-nav-pills am-nav-justify">
          {_item}
        </ul>
        <Listbar data={items} />
      </UI.Panel>
    );
  }
});

var Listbar = React.createClass({
  render: function() {
    console.log(this.props.data);
    var listNode = this.props.data.map(function(con){
      return (
        <li key={con.courseId} id={"view_" + con.courseId} className="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left courselist_item">
        <div className="am-list-thumb am-u-sm-4 am-text-center am-padding-0">
            <UI.Image src={con.teacherImg} responsive />
            <p className="am-center am-margin-xs">{con.teacherName}</p>
        </div>
        <div className="am-list-main am-u-sm-8">
          <h4 class="am-list-item am-margin-bottom-0">{con.CourseName}</h4>
          <div class="am-list-item-text">
            <p className="courselist_price am-margin-bottom-xs">课程价：<span className="am-text-danger">{con.price}</span> 元</p>
          </div>
          <div className="courselist_btn_go">
            <p className="am-text-xs am-text-center am-text-danger am-margin-bottom-0">已有{con.bargainNum}人参加</p>
            <UI.Button amStyle="danger" block>
              <a href={"view.html?id=" + con.id}>马上砍</a>
            </UI.Button>
          </div>
        </div>
      </li>
      );
    });
    return (
      <ul className="am-list course_list">
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
//     <Route name="list" path="#/:id" component={ListItems} />
//     <DefaultRoute handler={ListPage} />
//   </Route>
// );
// Router.run(routes, Router.HistoryLocation, function (Handler) {
//   React.render(<Handler/>, mountNode);
// });
React.render(
  <ListPage />,
  mountNode
);