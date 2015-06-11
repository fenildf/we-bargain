/**
 * Bargain Welcome
 * @authors Your Name (you@example.org)
 * @date    2015-06-08 20:21:40
 * @version $Id$
 */

var mountNode = document.getElementById('content');
var UI = AMUIReact;

/* ============== Welcome Pages ============= */

/**
 * 单个图片组件
 * @param  {[type]} ){                 return(        <UI.Image    );  }} [description]
 * @return {[type]}     [description]
 */
var WelcomeImg = React.createClass({
  render : function(){
    return(
      <p>
        <UI.Image src={this.props.src} className={this.props.className} responsive />
      </p>
    );
  }
});
/**
 * 图片列表
 * @type {[type]}
 */
var WelcomeImgList = React.createClass({
  render : function(){
    var imgNode = this.props.data.map(function(item){
      return (
        <WelcomeImg src={item.src} />
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
 * welcome页提交按钮
 * @type {[type]}
 */
var WelcomeSubmit = React.createClass({
  render : function(){
    return (
      <button></button>
    );
  }
});
/**
 * welcome页面整体布局
 * @type {[type]}
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

var welcomeContent = (
    <WelcomeBox url="src/json/welcome_imglist.json" />
);

React.render(welcomeContent, mountNode);
