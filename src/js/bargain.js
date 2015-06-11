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
	<div className="welcom">
	<h1>大家来砍价</h1><h2>精品课程微信专属活动</h2>
	{/* 全宽的列可以使用容器，不需要的网格嵌套 */}
	<U.Container>
		<U.Panel>

		</U.Panel>
	</U.Container>
	​
	{/* 当然，这样写也没问题 */}
	<U.Grid fixed className="doc-g">
	  <U.Col sm={3} smCentered>
	  	<U.Button amStyle="danger" round>选福利</U.Button>
	  </U.Col>
	</U.Grid>
</div>
);
React.render(gridInstance, mountNode);