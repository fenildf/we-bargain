/**
 * bargain
 * @authors Your Name (you@example.org)
 * @date    2015-06-08 20:21:40
 * @version $Id$
 */
/** @jsx React.DOM */

var mountNode = document.getElementById('content');
var U = AMUIReact;
var gridInstance = (
	React.createElement("div", {className: "welcom"}, 
	React.createElement("h1", null, "大家来砍价"), React.createElement("h2", null, "精品课程微信专属活动"), 
	/* 全宽的列可以使用容器，不需要的网格嵌套 */
	React.createElement(U.Container, null, 
		React.createElement(U.Panel, null

		)
	), 
	"​", 
	/* 当然，这样写也没问题 */
	React.createElement(U.Grid, {fixed: true, className: "doc-g"}, 
	  React.createElement(U.Col, {sm: 3, smCentered: true}, 
	  	React.createElement(U.Button, {amStyle: "danger", round: true}, "选福利")
	  )
	)
)
);
React.render(gridInstance, mountNode);