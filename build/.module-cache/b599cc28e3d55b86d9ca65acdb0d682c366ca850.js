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

/* ============== Welcome Pages ============= */
/**
 * Welcome 组件
 * @param  {String} ){                 return (      <div className [description]
 * @return {[type]}     [description]
 */
// var Welcome = React.createClass({
//   render : function(){
//     return (
//       <div className="welcome">
//         <WelcomeBox url="src/json/welcome_imglist.json" />
//       </div>
//     );
//   }
// });
/**
 * Welcome 页中的 ：单个图片组件
 * @param  {[type]} ){                 return(        <UI.Image    );  }} [description]
 * @return {[type]}     [description]
 */
var WelcomeImg = React.createClass({displayName: "WelcomeImg",
  render : function(){
    return(
      React.createElement("p", {className: "am-padding-top-sm"}, 
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
    var imgNode = this.props.data.map(function(item, i){
      return (
        React.createElement(WelcomeImg, {key: i, src: item.src, style: item.style + " am-center "})
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
      React.createElement("p", {className: "am-block am-padding-bottom-sm"}, 
        React.createElement("a", {href: "/"}, 
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
      React.createElement("div", {className: "welcome"}, 
        React.createElement(UI.Container, null, 
          React.createElement(WelcomeImgList, {data: this.state.data}), 
          React.createElement(WelcomeSubmit, null)
        )
      )
    );
  }
});



React.render(React.createElement(WelcomeBox, {url: bargain.welcomeUrl}), mountNode);
