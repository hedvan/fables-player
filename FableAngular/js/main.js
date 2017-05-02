var app = angular.module("FablePlayer",['simple-sprite']);

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
          console.log(childs);
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

          var frameCount = frames.length;
          var i = 0;
          var speed = attr.teste;
          var repeat = attr.repeat;

          if (speed === 0|| speed === null || speed === undefined)
            speed = 100;

          var interval = setInterval(function () {        
              frames[i % frameCount].style.display = "none"; 
              frames[++i % frameCount].style.display = "block";
              frames[i % frameCount].style.left = attr.left+'px';
              frames[i % frameCount].style.top = attr.top+'px';
              frames[i % frameCount].style.position = 'absolute';

              if(frameCount == i+1 && repeat==="no")
                clearInterval(interval);
          }, speed);
       }
  };
});

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