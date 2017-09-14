/**
* criação da mudança de estado do agent
* 
*/



var app = angular.module("FablePlayer",['simple-sprite']);

//Module Elements
var Elements = (function(){
  /**
  * Arrays que guardam os objetos do Fables
  */
  var animations = new Array();
  var agents = new Array();
  var sounds = new Array();
  var properties = new Array();
  var draggable = new Array();
  var detectable = new Array();

  //guarda um objeto Animation
  var getAnimation = function(animation){
    animations.push(animation);    
  }

  //Verifica quando as animações devem ser iniciadas
  var checkAnimation = function(number){
    for(var i = 0; i < animations.length; i++)
      if(animations[i].pageId == number){
        animations[i].start();
      }
  }

  //guarda um objeto Agent
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

  //guarda um objeto som
  var addSound = function(sound){
    sounds.push(sound);
  }

  //retorna um objeto som
  var getSound = function(id){
    for(var i = 0; i < sounds.length; i++){
      if(sounds[i].id == id){
        return sounds[i];
      }
    }
  }

  //guarda um objeto property
  var addProperty = function(property){
    properties.push(property);
  }

  //retorna um objeto property
  var getProperty = function(id){
    for(var i = 0; i < properties.length; i++){
      if(properties[i].id == id)
        return properties[i];
    }
  }

  //guarda um objeto drag
  var addDrag = function(drag){
    draggable.push(drag);
  }

  //retorna drag
  var getDrag = function(id){
    for(var i = 0; i < draggable.length; i++){
      if(draggable[i].id == id)
        return draggable[i];
    }
  }

  //guarda um objeto detect
  var addDetectable = function(dectect){
    detectable.push(dectect);
  }

  //retorn detect
  var getDetectable = function(id){
    for(var i = 0; i < detectable.length; i++){
      if(detectable[i].id == id)
        return detectable[i];
    }
  }

  //Procura a tag na qual desejo manipular
  var searchElement = function(elem, type){
    var parent = elem.parent();
      
    while((parent[0].localName != type)){
      parent = parent.parent();
      if(parent == undefined){
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
    searchElement: searchElement,
    addDrag: addDrag,
    getDrag: getDrag,
    addDetectable: addDetectable,
    getDetectable: getDetectable
  }
}());

/*Class Book
* - Contém: páginas, página atual
* - Ações:
*     - guardar páginas
*     - trocar de página
*     - ir para próxima ou anterior página
*     - checa visibilidade da página
*/
var Book =(function(){
  //Construtor
  function Book(){
    this.pages = new Array();
    this.currentPage = 1;
    this.sound;
  }

  //Adiciona uma página ao livro
  Book.prototype.addPage = function(page){
    this.pages.push(page);
  }

  //Troca de página
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

  //avança para a próxima
  Book.prototype.nextPage = function(){
    ModuleFable.getBook().changePage(this.currentPage+1);
  }

  //retorna a página anterior
  Book.prototype.previousPage = function(){
    this.changePage(this.currentPage-1);
  }

  return Book;
}());//Fim da classe Book

//isolar livro no modulo
//var ModuleFable.getBook() = new Book();//Cria um livro

//diretiva <fable>
app.directive('fable', function() {
  return {
      restrict: 'E',
      transclude: true,
  	  scope: {
        width: '@width',
        height: '@height'
      },
      link:function(scope,elem,attr){
        //iniciando o fábulas
        var book = ModuleFable.initializeBook();
        
        var list = elem.find("page");
        //pega todos os elementos page e salva em um array
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
      template: '<div class="container">'+'<div class="box" style="width:{{width}}; height:{{height}}" ng-transclude>'+'</div>'
  };
});

/* Módulo Fabulas
* 
*/
var ModuleFable = (function(){
  var book;

  var initializeBook = function(){
    book = new Book();
    return book;
  }

  var getBook = function(){
    return book;
  }

  return{
    getBook: getBook,
    initializeBook: initializeBook
  }
}());//Fim do módulo Canvas

/*diretiva <on-touch>
* Contém diretivas: test, target(para troca de página), alert
*                   set, play, audio
*/
app.directive('onTouch', function() {
  return {
       restrict: 'E',
       link:function(scope, elem, attr){
          //identificar o tipo do elemento
          var childs = elem.children();
          //pegando a tag agent
          function getParent(){
            var parent = elem.parent();
            while((parent[0].localName != "agent" && parent[0].localName != "page")){
              parent = parent.parent();
            }
            return parent;
          }
          var parent = getParent();

          var act = new Action(elem);
          var actData = act.setAgentAndStateAndAction(childs);

          elem.bind('click',function(){
            if(actData.action == "start"){
              if(actData.agent == "page")
                act.pageStart(ModuleFable.getBook());//troca de página
              
              if(Elements.checkAgent(actData.agent))
                act.startState();//muda de state
            }
          })
          
       }
  };
});

/*Class Action
* - Executa as ações do livro como mudar de página
* - Alterar estado de um elemento
* - atualizar um agente
*/
var Action = (function(){
  function Action(elem){
    this.action = "";//action = start
    this.agent = "";//element = agent
    this.elem = elem;
    this.state = "";//elementId = state
  }

  Action.prototype.setAgentAndStateAndAction = function(childs){
    for(var i = 0; i < childs.length; i++){
      if(childs[i].tagName == "TARGET"){
        this.action = childs[i].attributes[0].localName;// action: start
        res = childs[i].attributes[0].value.split("#");
        this.agent = res[0];
        this.state = res[1];
      }
    }

    return {
      action: this.action,
      agent: this.agent,
      state: this.state
    }
  }

  Action.prototype.startState = function(){
    var elements = Elements;
    //se for um state busca o agente 
    //que ele pertence e muda o estado
    var agent = elements.getAgent(this.agent);
    agent.changeState(this.state); 
  }

  Action.prototype.pageStart = function(Book){
      Book.changePage(parseInt(this.state));
  }

  return Action;
}());//fim da Classe Action

/*
* Diretiva animation
*/
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
              frames[i].style.width = attr.width+"px";
              frames[i].style.height = attr.height+"px";
              frames[i].style.left = attr.left+"px";
              frames[i].style.top = attr.top+"px";
            }
          }
          var parent = elem.parent();
          while(parent[0].localName != "page"){
            parent = parent.parent();
          }
          var pageId = parent[0].id;
          var anim = new Animation(frames, frames.length, attr.teste, pageId, attr.left, attr.top, attr.repeat);
          anim.setSpeed(attr.speed);
          Elements.getAnimation(anim);
       }
  };
});

/*
* Class Animation
*/
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

  Animation.prototype.setSpeed = function(speed){
    this.speed = speed;
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

      /*garante que o width e height do fable sempre sejam definidos certos*/
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
      //ModuleFable.getBook().bgSoundStart(attr.bgSound);
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

/*
* diretiva audio
*/
app.directive('audio', function(){
  return{
    restrict: 'E',
    link: function(scope, elem, attr, ctrl){
      var sound = undefined;
      //se elemento não existe cria um novo
      sound = Elements.getSound(attr.id);
      if(sound == undefined)
        sound = new Sound(elem[0].id, attr.src, elem);
      var onTouch = Elements.searchElement(elem,"on-touch");

      onTouch.bind('click',function(){
        if(attr.role == "play")
          sound.start();
      });
    }
  }
});

/*
* Classe Sound
* - Ações que devem ser efetudas: tocar, avançar, retroceder, parar
*/
var Sound = (function(){
  function Sound(id, source, elem){
    this.id = id;
    this.source = source;
    this.elem = elem;
    this.audio = new Audio(source);
  }

  Sound.prototype.start = function(){
    this.audio.play();
  }

  Sound.prototype.stopSound = function(){
    this.audio.pause();
  }
  //avançar audio
  Sound.prototype.advanceSound = function(){
    if(this.audio.ended)
      this.audio.currentTime = 0;
    this.audio.currentTime++;
  }
  //retroceder audio
  Sound.prototype.backSound = function(){
    if(this.audio.ended)
      this.audio.currentTime = 0;
    this.audio.currentTime--;
  }
  return Sound;
}());

/*
* Diretiva play
* - tocar áudios dentro do onTouch
*/
app.directive('play',function(){
  return{
    restrict: 'E',
    link: function(scope, elem, attr, ctrl){
      //criar elemento audio
      if(attr.type == "audio"){
        var media = new Audio(attr.src);
        media.volume = 0.2;
      }
      
      var onTouch = Elements.searchElement(elem,"on-touch");
      onTouch.bind('click',function(){
        media.play();
      });
    }
  }
})

/*
* Diretiva property
*/
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

/*
* Classe Property
*/
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

/*
* Diretiva set
* - muda um valor de uma propriedade
*/
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

/*
* Classe Alert
* - chamado dentro de um ontouch ele lança um aviso na tela
*/
var Alert = (function(){
  function Alert(text, elem){
    this.text = text;
    this.element = elem;
    this.flag = true;
    elem[0].style.display = "none";
  }

  Alert.prototype.createAlert = function($animate){
    //estilizando
    $animate.addClass(this.element,'element-animation-fadeIn');
    this.element.css({
      display: 'none',
      position: 'absolute',
      background: '#bdbdbd', 
      'font-size': '30px',
      padding: '5px',
      'text-align': 'justify',
      left: '50px',
      top: '10px',
      width:'300px',
      'border-radius': '10px',
      'border': '2px solid #455a64',
      'z-index': '1'
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

/*
* Diretiva test
*/
app.directive('test',function($animate){
  return{
    restrict: 'E',
    link: function(scope, elem, attr){

      //pega o on-touch
      var onClick = Elements.searchElement(elem,"on-touch");
      //gera mensagem
      var alert = new Alert("text",elem);
      alert.createAlert($animate);
      //
      var test = new Test(elem);  
      onClick.bind('click',function(){
        //pegar a property
        var property = Elements.getProperty(attr.target);
        //pegar value
        var value = attr.value;
        //pegar shout
        var shout = elem[0].children;
        var execute = shout[0].attributes[0].nodeValue;
        var shout_target = shout[0].attributes[1].nodeValue;
        console.log("execute "+execute+" target"+shout_target);
        //comparar
        if( test.compareValues(property, value) ){
          //ações  

          //finalizar página 
          if(execute == "endPage"){
            console.log("Test encerra pagina");
            //
            ModuleFable.getBook().nextPage();
          }
          if(execute == "changeState"){
            console.log("Test muda estado");
            //
            res = shout_target.split('#');
            var parameterOne = res[0];//agent / page
            var parameterTwo = res[1];//state / number

            test.changeState(parameterOne, parameterTwo);
          }
          if(execute == "changePage"){
            //
            res = shout_target.split('#');
            var parameterOne = res[0];//page
            var parameterTwo = res[1];//number
            ModuleFable.getBook().changePage(parseInt(parameterTwo));
          }
        }//encerra o onClick
      })

    }
  }
})

/*
* Class Test
*/
var Test = (function(){
  function Test(element){
    this.element = element;
  }

  //Recebe uma property e um value e retorna o resultado
  Test.prototype.compareValues = function(property, value){
    return (property.getValue() == value);
  }

  //Muda o estado de um agente dentro de um teste
  Test.prototype.changeState = function(agent, state){
    var agent = Elements.getAgent(agent);
    agent.changeState(state);
  }

  return Test;
}());

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
      if(attr.fontSize == undefined)
        attr.fontSize = "25px";
      elem.css({
        position: 'absolute',
        background: attr.color, 
        'border-radius': '10px',
        'font-size': attr.fontSize,
        padding: '5px',
        'text-align': 'justify',
      })
    }
  }
})

//diretivas de posição
app.directive('x',function(){
  return{
    restrict: 'A',
    link: function(scope, elem, attr, ctrl){
      elem.css({
        position: 'absolute', 
        left: attr.x+'px'
      })
    }
  }
})

app.directive('y',function(){
  return{
    restrict: 'A',
    link: function(scope, elem, attr, ctrl){
      elem.css({
        position: 'absolute', 
        top: attr.y+'px'
      })
    }
  }
})

app.directive('width',function(){
  return{
    restrict: 'A',
    link: function(scope, elem, attr, ctrl){
      elem.css({
        position: 'absolute', 
        width: attr.width+'px'
      })
    }
  }
})

app.directive('height',function(){
  return{
    restrict: 'A',
    link: function(scope, elem, attr, ctrl){
      elem.css({
        position: 'absolute', 
        height: attr.height+'px'
      })
    }
  }
})

/*
* Diretiva draggable
*/
app.directive('draggable', ['$document', function($document) {
  return {
    restrict: 'AE',
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = attr.x, y = attr.y;
      var drag = new Drag(element[0].id, element);
      Elements.addDrag(drag);

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content

        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
        //
        dect = Elements.getDetectable(element[0].id);
      });

      function mousemove(event) {
        console.log("x: "+event.pageX+" y: "+event.pageY);
        console.log("ox: "+event.offsetX+" oy: "+event.offsetY);

        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
        //
        drag.attPosition(x, y);
        if(dect != undefined){
          dect.checkArea();
          dect.startEvent();
        }
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}]);

/*
*Classe Drag
*/
var Drag = (function(){
  function Drag(id,elem){
    this.id = id;
    this.elem = elem;
    this.top = 0;
    this.left = 0;
  }

  Drag.prototype.attPosition = function(x, y){
    this.top = y;
    this.left = x;
    console.log("id "+this.id);
    console.log("x:"+this.left+" y:"+this.top);
  }

  Drag.prototype.getPosition = function(){
    return{
      x: this.left,
      y: this.top
    }
  }

  return Drag;
}());//fim da Classe Drag

/** Diretiva detect
*
*/
app.directive('detect',function(){
  return{
    restrict: 'AE',
    link: function(scope, elem, attr){
      var dect = new Detect(attr.target, attr.x, attr.y, attr.w, attr.h);
      dect.setEvent(attr.event, attr.for);

      if(attr.event == "changeState")
        dect.setAgent(attr.of);
      
      Elements.addDetectable(dect);
    }
  }
})

/*Classe Detect
* - Responsável por detectar elementos arrastáveis
* - Gera uma ação quando o elemento está sobre a área informada
*/
var Detect = (function(){
  function Detect(id, x, y, w, h,agent){
    this.id = id;
    this.value = false;
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.action = "";
    this.event = "";
    this.agent = "";
  }

  Detect.prototype.setEvent = function(event, action){
    this.action = action;
    this.event = event;
  }

  Detect.prototype.setAgent = function(agent){
    this.agent = agent;
  }

  Detect.prototype.startEvent = function(event,action,param1){
    if(this.value){
      if(this.event == "changePage")
        ModuleFable.getBook().changePage(parseInt(this.action));
      if(this.event == "changeState")
        var agent = Elements.getAgent(this.agent);
        agent.changeState(this.action);
    }
  }

  Detect.prototype.getValue = function(){
    console.log("dect: "+ this.value);
    return this.value;
  }

  Detect.prototype.checkArea = function (){
    var drag = Elements.getDrag(this.id);
    var position = drag.getPosition();
    var x = this.x < position.x && position.x <(this.x + this.width);
    var y = this.y < position.y && position.y <(this.y + this.height);
    if(x && y){
      this.value = true;
    }
  }

  return Detect;
}());//fim da Classe Detect


/*class Transition
* - Responsável por efeitos de transições
* - em elementos, imagens
*/
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
}()); //fim da Class Trasition

/* 
* Diretiva transition
*/
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