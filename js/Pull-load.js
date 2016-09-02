// Pull-load 滑动加载更多
// content：定高外部容器，内容为list
// list：变高列表，滑动加载更多list-item
// drag-up: 变高div，用来实现拖拽效果
// pull-arrow: 指示箭头图标
// moreItem: AngularJS中定义的方法，获取更多list-item

(function ($) {
  $(document).ready(function() {
  $('#content').scroll(function(){
      var topScroll = $('#content').scrollTop();
      var holderHeight = $('#content').height();
      var listHeight = $('#list').height();

      if(topScroll + holderHeight >= listHeight){
        var now;

        $('#list').on('touchstart',function(e) {
          $('#drag-up').attr("style", "height: 0;-webkit-transition: height 0.3s;");
          var touch = e.originalEvent.targetTouches[0]; 
          dragstart = touch.pageY;
        });

        $('#list').on('touchmove',function(e) {
          $('#pull-arrow').attr("style","-webkit-transform:rotate(180deg);-webkit-transition:0.3s;")
          var touch = e.originalEvent.targetTouches[0]; 
          now = touch.pageY;
          if(dragstart - now > 30){         
            var dragHeight = ((dragstart - now)>50?50:(dragstart - now));      
            var attrHeight = 'height: '+ dragHeight + 'px';
            $('#drag-up').attr("style", attrHeight);
          }
        });

        $('#list').on('touchend',function(e) {
          $('#pull-arrow').attr("style","-webkit-transform:rotate(0deg);-webkit-transition:0.3s;")
          var touch = e.originalEvent.changedTouches[0]; 
          dragend= touch.pageY;
          $('#drag-up').attr("style", "height: 0;-webkit-transition: height 0.3s;");
          if(dragstart-dragend>30){
            var scope=$('div[ng-controller="weiSpaceCtrl"]').scope();;
            scope.moreItem();
            scope.$apply();
          }
        });
      }else{
        $('#list').off('touchstart');      
        $('#list').off('touchmove');
        $('#list').off('touchend');
      };
    });
  });
}(jQuery));
