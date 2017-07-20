var app = angular.module("FablePlayer",['simple-sprite']);

//Module Elements
var Elements = (function(){
  var animations = new Array();
  var agents = new Array();
  var sounds = new Array();
  var properties = new Array();

  //Animations
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

  //Agents
  var addAgent = function(agent){
    agents.push(agent);
  }

  //retorna o agente indicado pelo id
  var getAgent = function(id){
    for(var i = 0; i < agents.length; i++){
      if(agents[i].id == id)
        return agents[i];
    }
  }

  var checkAgent = function(id){
   for(var i = 0; i < agents.length; i++){
      if(agents[i].id == id)
        return true;
    }
    return false; 
  }

  //Sounds
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

  //Properties
  var addProperty = function(property){
    properties.push(property);
  }

  var getProperty = function(id){
    for(var i = 0; i < properties.length; i++){
      if(properties[i].id == id){
        console.log("achei propriedade");
        return properties[i];
      }
    }
  }

  //Procura a tag na qual desejo manipular
  var searchElement = function(elem, type){
    var parent = elem.parent();
    console.log("type: "+parent);
    if(parent == undefined){
      console.log("dua lipa")
    }
      
    while((parent[0].localName != type)){
      parent = parent.parent();
      if(parent == undefined){
        console.log("dua lipa")
        break;
      }
    }
    return parent;
  }

  return{
    getAnimation: getAnimation,
    checkAnimation: checkAnimation,
    addAgent: addAgent,
    getAgent: getAgent,
    checkAgent: checkAgent,
    addSound: addSound,
    getSound: getSound,
    addProperty: addProperty,
    getProperty: getProperty,
    searchElement: searchElement
  }
}());

//Class Book
var Book =(function(){
  function Book(){
    this.pages = new Array();
    this.currentPage = 1;
    this.sound;
  }
  Book.prototype.addPage = function(page){
    this.pages.push(page);
  }
  Book.prototype.changePage = function(number){
    if(number <= this.pages.length){
      var sound = Elements.getSound("bgSound"+this.currentPage);
      if(sound != undefined)
        sound.stopSound();
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

  Book.prototype.nextPage = function(){
    book.changePage(this.currentPage+1);
  }

  Book.prototype.previousPage = function(){
    this.changePage(this.currentPage-1);
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
      link:function(scope,elem,attr){

        var list = elem.find("page");
        //pega todos os elements page e salva em um array
        for(var i = 0; i < list.length; i++){
        	book.addPage({id: list[i].id, page: list[i]});
        }
        book.checkPage();

        /*Criando audio background para todas as páginas*/
        if(attr.bgSound != undefined){
          var bgSound = new Sound("bgSound"+attr.id,attr.bgSound, elem);
          bgSound.start();
          Elements.addSound(bgSound);
        }
      },
      template: '<div class="top"></div>'
                 +'<div class="left"></div>'
                 +'<div class="right"></div>'
                 +'<div style="width:{{width}}; height:{{height}}; border:1px solid #000" ng-transclude></div>'
                 +'<div class="bottom"></div>'
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
          console.log(childs);
          console.log(elem);
          //pegando a tag agent
          var parent = elem.parent();
          while((parent[0].localName != "agent" && parent[0].localName != "page")){
            parent = parent.parent();
          }

          var element,elementId;
          //garante que na bagunça de tags sempre pegue o target
          for(var i = 0; i < childs.length; i++){
            if(childs[i].tagName == "TARGET"){
              action = childs[i].attributes[0].localName;// action: start
              res = childs[i].attributes[0].value.split("#");
              element = res[0];
              elementId= res[1];
            }
          }

          //gero a ação de click em todos os elementos contidos no state
          var touch = new OnTouch(action, element, elementId, elem);
          elem.bind('click',function(){
            console.log("element: "+element+" elementId: "+elementId);
            if(element == "page"){
              console.log("entrei no page");
              touch.pageStart(elementId, book);
            }
            if(Elements.checkAgent(element)){
              console.log("entrei no agent: ");
              touch.agentStart(element, elementId);
            }
          })
          
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
        agent.changeState(that.elementId);
      }
      if(that.element == "audio"){
        var audio = Elements.getSound(that.elementId);
        audio.start();
      }
    })
  }

  OnTouch.prototype.pageStart = function(page, Book){
      Book.changePage(parseInt(page));
  } 

  OnTouch.prototype.agentStart = function(Agent, stateId){
    var agent = Elements.getAgent(Agent);
    agent.changeState(stateId);
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

          if(attr.width != "" && attr.height != ""){
            for(var i = 0; i < frames.length; i++){
              frames[i].style.width = attr.width;
              frames[i].style.height = attr.height;
              frames[i].style.left = attr.left;
              frames[i].style.top = attr.top;
            }
          }
          var parent = elem.parent();
          while(parent[0].localName != "page"){
            parent = parent.parent();
          }
          var pageId = parent[0].id;
          var anim = new Animation(frames, frames.length, attr.teste, pageId, attr.left, attr.top, attr.repeat);
          Elements.getAnimation(anim);
       }
  };
});

//Class Animation
var Animation = (function(){
  function Animation(frames, frameCount, speed, pageId, left, top, repeat){
    this.frames = frames;
    this.frameCount = frameCount;
    this.speed = speed;
    this.pageId = pageId;
    this.left = left;
    this.top = top;
    this.repeat = repeat;
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

              if(i==(that.frames.length-1) && that.repeat == "no")
                clearInterval(interval);

          }, that.speed);
  }

  return Animation;
}())

//<page>
app.directive('page', function(){
  return{
    restrict: 'E',
    link: function(scope, elem, attr, ctrl){

      elem[0].style.position = "relative";

      //pegar a tag fable
      var fable_elem = Elements.searchElement(elem, "fable");
      var fable_atts = fable_elem[0].attributes;//atributos fables
      var fable_width;//largura fable
      var fable_height;//altura fable
      /*garante que o width e height do fable
      sempre sejam definidos certos*/
      for(var i = 0; i < fable_atts.length; i++){
        if(fable_atts[i].nodeName == "width")
          fable_width = fable_atts[i].value;
        if(fable_atts[i].nodeName == "height")
          fable_height = fable_atts[i].value;
      }
      elem[0].style.width = fable_width;
      elem[0].style.height = fable_height;

      /*criando background*/
      if(attr.bgImage != undefined){
        var img = document.createElement("img");
        img.src = attr.bgImage;
        img.width = parseInt(fable_width);
        img.height = parseInt(fable_height);
        img.style.left = 0;
        img.style.top = 0;
        img.style.position = "absolute";
        img.style.zIndex = -1;
        elem.append(img);
      }

      /*criando audio-background*/
      if(attr.bgSound != undefined){
        var bgSound = new Sound("bgSound"+attr.id,attr.bgSound, elem);
        bgSound.start();
        Elements.addSound(bgSound);
      }
      //book.bgSoundStart(attr.bgSound);
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
    console.log("meu id "+this.id);
    for(var i=0; i < this.array.length; i++){
      if(this.array[i].id == id){
        this.elem.after(this.array[i]);//coloca no html o trecho
      }
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
  function Sound(id, source, elem){
    this.id = id;
    this.source = source;
    this.elem = elem;
    this.audio = 0;
  }

  Sound.prototype.start = function(){
    //pegar o primeiro audio e rodar
    this.audio = new Audio(this.source);
    this.audio.play();
  }

  Sound.prototype.stopSound = function(){
    this.audio.pause();
  }

  return Sound;
}());

//<property>
app.directive('property',function(){
  return{
    restrict: 'E',
    link: function(scope, elem, attr, ctrl){
      var prop = new Property(attr.name, attr.value);
      console.log(prop);
      Elements.addProperty(prop);
    }
  }
});

//class Property
var Property = (function(){
  function Property(id, value){
    this.id = id;
    this.value = value;
  }

  Property.prototype.setValue = function(value){
    this.value = value;
  }

  Property.prototype.getValue = function(){
    return this.value;
  }

  return Property;
}());

//<set>
app.directive('set',function(){
  return{
    restrict: 'E',
    link: function(scope, elem, attr, ctrl){
      
      var element = Elements.searchElement(elem,"on-touch");
      //e uso ele para ativar ações da tag set
      element.bind('click',function(){
        //pega o property
        var prop = Elements.getProperty(attr.target);
        console.log(prop);
        prop.setValue(attr.value);
      })
    }
  }
});

var Alert = (function(){
  function Alert(text, elem){
    this.text = text;
    this.element = elem;
    this.flag = true;
  }

  Alert.prototype.createAlert = function($animate){
    //estilizando
    $animate.addClass(this.element,'element-animation-fadeIn');
    this.element.css({
      display: 'none',
      position: 'absolute',
      background: 'red', 
      'font-size': '30px',
      padding: '5px',
      'text-align': 'justify',
      left: '50px',
      top: '50',
      width:'300px'
    })
  }

  Alert.prototype.actionAlert = function(){
    
    if(this.flag){
      this.element[0].style.display = "block";
      this.flag = false;
      console.log("mostrar")
    }else{
      this.element[0].style.display = "none";
      this.flag = true;
      console.log("nao mostrar")
    } 
  }

  return Alert;
}());

//<alert>
app.directive('alert',function($animate){
  return{
    restrict: 'E',
    link: function(scope, elem, attr, ctrl){
        var flag = {value:true,button:false};
        var text = elem[0].childNodes[0].data;
        var alert = new Alert(text,elem);
        alert.createAlert($animate);

        var onTouch = elem.parent();
        onTouch.bind('click',function(){
          alert.actionAlert();
        });
    }
  }
})

//<test>
app.directive('test',function($animate){
  return{
    restrict: 'E',
    link: function(scope, elem, attr, ctrl){

      //pega o on-touch
      var onClick = Elements.searchElement(elem,"on-touch");
      var alert = new Alert("text",elem);
      alert.createAlert($animate);
      //pegar o que ta no else e guardar aqui;
      elem[0].childNodes[0].data="fueifwiuegwy";

      onClick.bind('click',function(){
        //pegar a property
        var property = Elements.getProperty(attr.target);
        //pegar value
        var test_value = attr.value;
        //pegar shout
        var shout = elem[0].children;
        var shout_target = shout[0].attributes[0].nodeValue;
        //
        var xelse =elem.find("else");
        var message = xelse.find("alert");
        message.remove();
        //comparar
        if(property.getValue() == test_value){

          if(shout_target == "_END_PAGE"){
              book.nextPage();
            }else{
            //pegar o shout target e fazer dele o element e elementId
            console.log("enntrei aquiu")
            res = shout_target.split('#');
            var element = res[0];
            var elementId = res[1];

            //gero a ação de click em todos os elementos contidos no state
            var state = Elements.searchElement(elem,"state");
            var touch = new OnTouch("start", element, elementId, elem);
            if(element == "page"){
              touch.pageStart(elementId, book);
            }
            if(Elements.checkAgent(element)){
              touch.agentStart(element, elementId);
            }
          }
        }else{
          //AJEITAR AQUI
          alert.actionAlert();
        }
      })

    }
  }
})


//<set>
app.directive('set',function(){
  return{
    restrict: 'E',
    link: function(scope, elem, attr, ctrl){
      var onClick = Elements.searchElement(elem, "state");
      var new_value = attr.value;
      
      onClick.bind('click', function(){
        //pega a property
        var property = Elements.getProperty(attr.target);
        console.log(property);
      
        console.log("troquei");
        property.setValue(new_value);
      })
    }
  }
})

//<board>
app.directive('board',function(){
  return{
    restrict: 'E',
    link: function(scope, elem, attr, ctrl){
      //estilização da board
      var left = attr.left;
      if(left == undefined)
        left = "10px";
      var top = attr.top;
      if(top == undefined)
        top = "10px";
      if(attr.fontSize == undefined)
        attr.fontSize = "25px";
      elem.css({
        position: 'absolute',
        background: attr.color, 
        'border-radius': '10px',
        'font-size': attr.fontSize,
        padding: '5px',
        'text-align': 'justify',
        left: left,
        top: top,
        width:'300px',
      })
    }
  }
})

//<draggable>
app.directive('draggable', ['$document', function($document) {
  return {
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      element.on('mousedown', function(event) {
        element.css({
         position: 'absolute',
         border: '1px solid red',
         backgroundColor: 'lightgrey',
         cursor: 'pointer'
        });
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;

        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.pageY-startY/2;
        x = event.pageX-startX/2;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        element.css({
         position: 'absolute',
         border: '1px solid rgba(255, 255, 255, 0.8)',
         backgroundColor: 'lightgrey',
         cursor: 'pointer'
        });
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}]);

//<play type="" src="">
app.directive('play',function(){
  return{
    restrict: 'E',
    link: function(scope, elem, attr, ctrl){
      //criar elemento audio
      if(attr.type == "audio"){
        var media = new Audio(attr.src);
        media.volume = 0.2;
      }
      
      /*corrigir on-touch
      - ele está sendo setado pelo state*/
      var onTouch = Elements.searchElement(elem,"on-touch");
      onTouch.bind('click',function(){
        console.log("estou funcionando")
        media.play();
      })

    }
  }
})

//class Transition
var Transition = (function(){
	function Transition(elem,animateCss){
		this.elem = elem;
		this.animateCss = animateCss;
		this.css = null;
	}

	Transition.prototype.setStyle = function(type){
		var classType;
		if(type == "fadeOut")
			classType = "element-animation-fadeOut";
		else if(type == "fadeIn")
			classType = "element-animation-fadeIn";
		else if(type == "tada")
			classType = "element-animation-tada";
		else if(type == "bounce")
			classType = "element-animation-bounce";
		else if(type == "scaling")
			classType = "element-animation-scaling";

		this.css = this.animateCss(this.elem,{
			addClass: classType
		})
	}

	Transition.prototype.startAnimation = function(){
		this.css.start();
	}

	return Transition;
}())

//<transition>
app.directive('transition',function($animateCss){
  return{
    restrict: 'A',
    link: function(scope, elem, attr, ctrl){
      var transition = new Transition(elem, $animateCss);
      transition.setStyle(attr.transition);

      transition.startAnimation();
    }
  }
})