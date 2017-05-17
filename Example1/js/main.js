var app = angular.module("FablePlayer",['simple-sprite']);

//Module Elements
var Elements = (function(){
  var animations = new Array();
  var agents = new Array();
  var sounds = new Array();

  var getAnimation = function(animation){
    animations.push(animation);    
  }
  //Checa quais animações devem ser iniciadas
  var checkAnimation = function(number){
    for(var i = 0; i < animations.length; i++)
      if(animations[i].pageId == number){
        animations[i].start();
      }
  }

  var addAgent = function(agent){
    agents.push(agent);
  }

  //Retorna o agente que foi selecionado
  var getAgent = function(id){
    for(var i = 0; i < agents.length; i++){
      if(agents[i].id == id){
        return agents[i];
      }  
    }
  }

  var addSound = function(sound){
    sounds.push(sound);
  }

  var getSound = function(id){
    for(var i = 0; i < sounds.length; i++){
      if(sounds[i].id == id){
        return sounds[i];
      }
    }
  }

  return{
    getAnimation: getAnimation,
    checkAnimation: checkAnimation,
    addAgent: addAgent,
    getAgent: getAgent,
    addSound: addSound,
    getSound: getSound
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

        //pega todos os elements page e salva em um array
        for(var i = 0; i < list.length; i++){
        	book.addPage({id: list[i].id, page: list[i]});
        }

        book.checkPage();
        var i = 2;
      },
      template: '<div style="width:{{width}}; height:{{height}}" ng-transclude></div>'
  };
});

//Module Transitions
var Transitions = (function(){

  var setAnimation = function(type,id,x,y,xmove,ymove){
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

  return{
    setAnimation: setAnimation
  }
}());

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
          var css = Transitions.setAnimation(attr.type, attr.id, attr.x, attr.y, attr.xmove, attr.ymove);
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
});

//<on-touch>
app.directive('onTouch', function() {
  return {
       restrict: 'E',
       link:function(scope, elem, attr){
          //identificar o tipo do elemento
          var childs = elem.children();
          var action, element;
          //pegando a tag agent
          var parent = elem.parent();
          while((parent[0].localName != "agent" && parent[0].localName != "page")){

            parent = parent.parent();
          }

          var action = childs[0].attributes[0].localName;//ação que desejo
          var element = childs[0].attributes[0].value;//elemento linkado a ela
          var elementId;
          //garante que na bagunça de tags sempre pegue o target
          for(var i = 0; i < childs.length; i++){
            if(childs[i].tagName == "TARGET"){
              action = childs[i].attributes[0].localName;
              res = childs[i].attributes[0].value.split("#");
              element = res[0];
              elementId= res[1];
            }
          }

          console.log(element+" "+elementId);
          
          var res = element.split("#");

          
          var touch = new OnTouch(action,element, elementId,elem);
          
          if(parent[0].localName == "agent"){
            touch.setAgent(parent[0].id);
          }

          touch.start(book);
          
       }
  };
});

//Class OnTouch
var OnTouch =(function(){
  function OnTouch(action, element,elementId , elem){
    this.agent = "";
    this.action = action;
    this.element = element;
    this.elem = elem;
    this.elementId = elementId;
  }
  OnTouch.prototype.start = function(book1){
    var that = this;
    var elements = Elements;
    that.elem.bind('click',function(){
      //se o element for uma página ele troca
      if(that.element == "page"){
        book.changePage(parseInt(that.elementId));
      }
      //se for um state busca o agente 
      //que ele pertence e muda o estado
      if(that.element == "state"){
        //peço para Elements o States usando a id do agent
        var agent = elements.getAgent(that.agent);
        console.log(that.action);
        agent.changeState(that.elementId);
      }
      if(that.element == "audio"){
        var audio = Elements.getSound(that.elementId);
        audio.start();
      }
    })
  }
  OnTouch.prototype.setAgent = function(agent){
    this.agent = agent;
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
          var pageId = parent[0].id;
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
    for(var i = 0; i < frames.length; i++)
      this.frames[i % this.frameCount].style.display = "none";
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
    link: function(scope, elem, attr, ctrl){
      console.log("aaaaaa");
      console.log(attr.bgImage);

      var img = document.createElement("img");
      img.src = attr.bgImage;
      img.width = parseInt(attr.width);
      img.height = parseInt(attr.height);
      img.style.left = 0;
      img.style.top = 0;
      img.style.position = "absolute";
      img.style.zIndex = -1;
      elem.append(img);
    }
  };
});

//<agent>
app.directive('agent', function(){
  return{
    restrict: 'E',
    link: function(scope, elem, attr, ctrl){
      //capturar state
      var states = elem.find("state");
      var state = new Agent(states, elem, attr.id);
      for(var i=1;i<states.length;i++){
        states[i].remove();
      }
      Elements.addAgent(state);
      // salvar agents em elements e identifica-los pelo id
    }
  }
});

//Class Agent
var Agent = (function(){
  function Agent(states, elem, id){
    this.elem = elem;
    this.array = states;
    this.id = id; //id do agent
  }

  Agent.prototype.changeState = function(id){
    for(var i=0; i < this.array.length; i++){
      if(this.array[i].id == id)
        this.elem.after(this.array[i]);//coloca no html o trecho
      else
        this.array[i].remove();//retira os estados não usados      
    }
  }

  return Agent;
}());

//<audio>
app.directive('audio', function(){
  return{
    restrict: 'E',
    link: function(scope, elem, attr, ctrl){
      
      console.log(elem[0].id);
      //pegar tag source
      var sources = elem.find("source");
      var sound = new Sound(elem[0].id, sources,elem);
      Elements.addSound(sound);
    }
  }
});

//class Audio
var Sound = (function(){
  function Sound(id, sources, elem){
    this.id = id;
    this.sources = sources;
    this.elem = elem;
  }

  Sound.prototype.start = function(name){
    //pegar o primeiro audio e rodar
    var audio = new Audio(this.sources[0].src);
    audio.play();
  }

  return Sound;
}());
