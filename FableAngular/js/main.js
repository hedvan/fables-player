var app = angular.module("FablePlayer",['simple-sprite']);

//Module Elements
var Elements = (function(){
  var animations = new Array();

  var getAnimation = function(animation){
    animations.push(animation);    
  }
  var checkAnimation = function(number){
    for(var i = 0; i < animations.length; i++)
      if(animations[i].pageId == number){
        animations[i].start();
      }
  }

  return{
    getAnimation: getAnimation,
    checkAnimation: checkAnimation
  }
}());

//Class Book
var Book =(function(){
  function Book(){
    this.pages = new Array();
    this.currentPage = 1;
  }
  Book.prototype.addPage = function(page){
    this.pages.push(page);
  }
  Book.prototype.changePage = function(number){
    if(number <= this.pages.length){
      this.currentPage = number;
      this.checkPage();
    }else{
      alert("ultima pagina");
    }
  }

  //muda a visibilidade das páginas
  Book.prototype.checkPage = function(){
    for(var i = 0; i < this.pages.length; i++){
          if(this.currentPage == this.pages[i].id){
              this.pages[i].page.style.display = "block";
          }else{
              this.pages[i].page.style.display = "none";
          }
    }
    Elements.checkAnimation(this.currentPage);
  }

  return Book;
}());

var book =new Book();

//<fable>
app.directive('fable', function() {
  return {
      restrict: 'E',
      transclude: true,
  	  scope: {
        width: '@width',
        height: '@height'
      },
      link:function(scope,elem,attrs){

        var list = elem.find("page");

        for(var i = 0; i < list.length; i++){
        	book.addPage({id: list[i].getAttribute("number"), page: list[i]});
        }
        book.checkPage();
        var i = 2;
        /*
        elem.bind('click', function() {
        	book.changePage(i);
        	i++;
        });
        */
      },
      template: '<div style="width:{{width}}; height:{{height}}; border:1px solid #000" ng-transclude></div>'
  };
});

//<transition>
app.directive('transition', function() {
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

    return anim+" "+frames;
  }
});

//<on-touch>
app.directive('onTouch', function() {
  return {
       restrict: 'E',
       link:function(scope, elem, attr){
          //identificar o tipo do elemento
          var childs = elem.children();
          var action = childs[0].attributes[0].localName;
          var element = childs[0].attributes[0].nodeValue;
          var touch = new OnTouch(action,element);
          
          elem.bind('click',function(){
            touch.start(book);
          })
       }
  };
});

//Class OnTouch
var OnTouch =(function(){
  function OnTouch(action, element){
    this.action = action;
    this.element = element;
  }
  OnTouch.prototype.start = function(book){
    if(this.element.includes("page"))
      book.changePage(parseInt(this.element.slice(4)));
  }

  return OnTouch;
}());

//<animation>
app.directive('animation', function() {
  return {
       restrict: 'E',
       scope: {
        x: '@x',
        y: '@y' ,
        speed: '@speed'
       },
       link:function(scope,elem,attr,ctrl){  
          var frames = elem.children();
          var parent = elem.parent();
          while(parent[0].localName != "page"){
            parent = parent.parent();
          }
          var pageId = parent[0].attributes[0].nodeValue;
          var anim = new Animation(frames, frames.length, attr.teste, pageId, attr.left, attr.top);
          Elements.getAnimation(anim);
       }
  };
});
//Class Animation
var Animation = (function(){
  function Animation(frames, frameCount, speed, pageId, left, top){
    this.frames = frames;
    this.frameCount = frameCount;
    this.speed = speed;
    this.pageId = pageId;
    this.left = left;
    this.top = top;
  }

  Animation.prototype.start = function(){
    var i = 0;
    var that = this;
    if (that.speed === 0|| that.speed === null || that.speed === undefined)
            that.speed = 100;

    var interval = setInterval(function () {        
              that.frames[i % that.frameCount].style.display = "none"; 
              that.frames[++i % that.frameCount].style.display = "block";
              that.frames[i % that.frameCount].style.left = that.left+'px';
              that.frames[i % that.frameCount].style.top = that.top+'px';
              that.frames[i % that.frameCount].style.position = 'absolute';

          }, that.speed);
  }

  return Animation;
}())

//<page>
app.directive('page', function(){
  return{
    restrict: 'E',
  };
});

//<agent>
app.directive('agent', function(){
  return{
    restrict: 'E',

  }
});