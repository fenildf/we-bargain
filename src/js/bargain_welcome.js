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
var WelcomeImg = React.createClass({
  render : function(){
    return(
      <p className="am-padding-top-sm">
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
    var imgNode = this.props.data.map(function(item, i){
      return (
        <WelcomeImg key={i} src={item.src} style={item.style + " am-center "} />
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
      <p className="am-block am-padding-bottom-sm">
        <a href="/">
          <UI.Image src="src/img/welcome_submit.png" className="welcome_submit am-center" responsive />
        </a>
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
      <div className="welcome">
        <UI.Container>
          <WelcomeImgList data={this.state.data} />
          <WelcomeSubmit />
        </UI.Container>
      </div>
    );
  }
});



React.render(<WelcomeBox url={bargain.welcomeUrl} />, mountNode);
