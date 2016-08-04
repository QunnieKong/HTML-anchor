# HTML-anchor
A question about using &lt;a> anchor to locate different section of one html page.

<p>页面中有两部分结构，第一部分是导航条nav，第二部分是内容content。</p>
<p>其中，导航条用<a href="anchor-name">锚链接，内容分为四块每块前面添加<a id="#anchor-name">的锚点。</p>
<p>调用js判断页面滚动高度，到达一定高度时将导航条fix在视窗顶端.</p>
<p>此时问题出现了：</p>
<p>当导航条不为fixd状态时，点击锚链接则会跳转到比正常跳转位置偏上的状态：</p>
<img src="https://pic3.zhimg.com/54951b048d684a856da763a2a95fe862_r.png">
<p>而在导航条fixed的状态下点击锚链接，则会正常显示：</p>
<img src="https://pic4.zhimg.com/7a98b88a5f42c40b74d6305aad36c7a3_r.png">
<p>不知道问题描述清楚没有，总之就是相同的锚和同一个锚链接，为什么两次跳转结果不同？</p>
<p>锚链接的跳转原理是什么？如果是改变scroll高度的话是改变的相对高度吗？</p>

——2016.8.4目前还未找到好的解决办法
