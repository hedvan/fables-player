var app = angular.module("FablePlayer",['simple-sprite']);

app.directive('fable', function() {
  return {
      restrict: 'E',
      transclude: true,
  	  scope: {
        width: '@width',
        height: '@height'
      },
      link:function(scope,elem,attrs){
        elem.css('width','attrs.width');
      }
      ,
      template: '<div style="width:{{width}}; height:{{height}}; border:1px solid #000" ng-transclude></div>'
  };
});

app.directive('animation', function() {
  return {
       restrict: 'E',
       transclude: true,
       scope: {
        id: '@id',
        type: '@type',
        x: '@x',
        y: '@y',
        xmove: '@xmove',
        ymove: '@ymove'
       },
       link:function(scope, elem, attr){
          var css = setAnimation(attr.type, attr.id, attr.x, attr.y, attr.xmove, attr.ymove);
          head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style');

          style.type = 'text/css';
          if (style.styleSheet){
            style.styleSheet.cssText = css;
          } else {
            style.appendChild(document.createTextNode(css));
          }

          head.appendChild(style);
       },
       template: '<div ng-transclude></div>'
  };
  function setAnimation(type,id,x,y,xmove,ymove){
    var anim, frames;
    if(type === "fly"){
      anim = '#'+id+"{ animation-name: "+"anim"+"-"+id+"; animation-duration: 5s; animation-iteration-count: 10; position: absolute; }";
      frames = "@keyframes "+"anim"+"-"+id+" { from { left: "+x+"px; top:"+y+"px;} to { left: "+xmove+"px; top: "+ymove+"px;}}";
    }else if(type === "spin"){
      anim = '#'+id+"{animation-name: "+"anim"+"-"+id+"; animation-duration: 4000ms; animation-iteration-count: infinite; position: absolute; left:"+x+"px; top: "+y+"px}"; 
      frames = "@keyframes "+"anim"+"-"+id+"{ from{ transform: rotate(0deg);} to{transform: rotate(360deg);}}";
    }else if(type === "fade-out"){
      anim = '#'+id+"{ opacity: 0; animation: "+"anim"+"-"+id+" 2s linear; }";
      frames = "@keyframes "+"anim"+"-"+id+"{ 0% {opacity: 1} 50%{opacity: 0.5} 100% {opacity: 0} }";
    }else if(type === "fade-in"){
      anim = '#'+id+"{opacity: 1; animation: "+"anim"+"-"+id+" 2s linear;}";
      frames ="@keyframes "+"anim"+"-"+id+" { 0% {opacity: 0} 50%{opacity: 0.5} 100% {opacity: 1} }";
    }

    console.log(anim+" "+frames);
    return anim+" "+frames;
  }
});

app.directive('figure', function() {
  return{
    restrict: 'E',
    transclude: true,
    scope: {
      src: '@src',
      width: '@width',
      height: '@height',
      x: '@x',
      y: '@y'
    },
    link:function(scope,elem,attr){
      var img = document.createElement("img");
      img.setAttribute("src", attr.src);
      img.setAttribute("height", attr.width);
      img.setAttribute("width", attr.height);
      img.setAttribute("alt", attr.id);
      elem.append(img);
      elem.css({

      })
    },
    template:'<div ng-transclude></div>'
  } 
});

app.directive('onTouch', function() {
  return {
       restrict: 'E',
       transclude: true,
       scope: {
       },
       template: '<div ng-transclude></div>'
  };
});

app.directive('position', function() {
  return {
       restrict: 'E',
       scope: {
        x: '@x',
        y: '@y' ,
        teste: '@teste'
       },
       link:function(scope,elem,attr,ctrl){
          //
          var frames = elem.children();
          
          var frameCount = frames.length;
          var i = 0;
          var speed = attr.teste;

          if (speed === 0|| speed === null || speed === undefined)
            speed = 100;

          setInterval(function () { 
              
              frames[i % frameCount].style.display = "none"; 
              frames[++i % frameCount].style.display = "block";
              //frames[i % frameCount].style.left = attr.left+'px';
              //frames[i % frameCount].style.top = attr.top+'px';
              //frames[i % frameCount].style.position = 'absolute';
          }, speed);
       }
  };
});