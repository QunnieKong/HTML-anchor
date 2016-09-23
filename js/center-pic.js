// 容器宽高不变，自适应图片水平居中

var getMargin = function(width,height){
    var ele = $('#center');
    // 容器#center，宽高比为1.3393
      if(width/height >= 1.3393){
        ele.css("width","100%");
        ele.css("height","auto");
        ele.css("margin-left","0");
        ele.css("margin-top",function(){
          var rate = $(window).width()/width;
          var rem = $(window).width()/10;
          var parentH = 7.46667 * rem;
          var mar = 0.5 * parentH - 0.5*height*rate;
          return mar + 'px';
        })
      }else{      
        ele.css("height","100%");        
        ele.css("margin-top","0");
        ele.css("width","auto");
        ele.css("margin-left",function(){          
          var rate = (7.46667 * $(window).width()/10)/height;
          var mar = 0.5 * $(window).width() - 0.5*width*rate;
          return mar + 'px';
      })
    }   
  }
  $scope.showLarge = function(thisCase,index,ev){
    event.stopPropagation(ev);
    $scope.showLargePic = 1;
    $scope.largeCase = thisCase;
    $scope.largePic = $scope.largeCase.picList[index];
    $scope.largeIndex = index;

    getPicLabel($scope.largePic.picId);

    var img = new Image();
    img.src = $scope.largePic.fileName;
    if(img.complete){
      getMargin(img.width,img.height);
    }else{
      img.onload = function(){
        getMargin(img.width,img.height);
        img.onload = null;        
      }
    }

    
  }

// 正方形容器，显示图片中间部分

var getMargin = function(w,h){
  // 容器宽高值
  var divLen = 2.62667 * $(window).width() / 10;     
  var rate;
  if(w/h >= 1){
    rate = divLen/h;
    // 宽图
    var margin = String((rate*w - divLen)/2);
    var attr = 'height: 100%;margin-left:-' + margin + 'px;';
  }else{
    rate = divLen/w;
    // 高图
    var margin = String((rate*h - divLen)/2);
    var attr = 'width: 100%;margin-top:-' + margin + 'px;';
  } 
  return attr;
}
var imgLoad = function (img) {
  var attr = getMargin(img.width,img.height);
  img.setAttribute("style",attr);
};