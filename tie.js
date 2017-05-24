var scrollYItems = [];
var scrollXItems = [];
var mouseXItems = ['notnull'];
var mouseYItems = [];
var ticking = false;

// var testp = {a:3, b:9, c:'hello'};
// console.log(testp.a);
// var testpKeys = Object.keys(testp);
// console.log(testpKeys[0]);
// var sym = Symbol(testpKeys[0]);
// console.log(testp[testpKeys[0]]);
// console.log(sym);
// console.log(testp[sym]);
// console.log(testp.(new Symbol(Object.keys(testp))[0]));

/*

elem.tie('scrolly 10% 50% height 10vw 20px opacity 0 1');
elem.tie({event: scrolly, min:10%, max:50%}, {height: [10vw, 20px]}, {opacity: [0, 1]})

Item Template

Item
  domNode,
  triggerbounds:
    start,
    end,
    tieBound //bound check function
  props[]:
    prop:
      name,
      start,
      end,
      multiplier
    prop: ...

foreach:

*/

var title = document.getElementById('title');
title.style.height = window.getComputedStyle(title).getPropertyValue('height');
// console.log(title.style.height);

function tieItem(node, tmin, tmax, propargs){
  this.node = node;
  this.tbounds.min = tmin;
  this.tbounds.max = tmax;
  this.props = [];
  propargs.forEach();
}

HTMLElement.prototype.tie = function (...args) {
  if(args.every(elem => typeof elem === 'object')){ //object notation
    // {event:'scrolly 10px 20px', left:'10px 20px', width:'10vw 80vw'}
    let event = args[0].split(' ');
    item = newItem
    switch(event[0]){
      case 'scrolly':
        scrollYItems.push(new tieItem())
    }
  }
  else if(typeof args[0] === 'string'){ // string notation
    // 'scrolly, width 10% 50%'
    // 'scrolly 20% 30%, height 10px 100vw quadratic, top 20vh 50vh'
    // var inwind = new tieBound('mousex 10vw 30vw');
    //  Creates a new boundary that's true when mousex is between 10vw and 30vw

    const params = args[0].split(',');
    const event = params[0].split(' ');
    var protoItem = {
      domNode: this,
      triggerbounds:{
        start: event[1],
        end: event[2]
      },
      props:[]
    };
    params.forEach((elem, i) => {
      if(i!=0){
        const curProp = elem.split(' ');
        // if(curProp.length===4){ //mapping function
        //   switch(curProp[3]){
        //     case 'quad':
        //     case 'quadratic':
        //   }
        // }
        // else{
          pstart = splitunit(curProp[0])[1];
          pend = splitunit(curProp[1])[1];
          estart = splitunit(event[2])[1];
          eend = splitunit(event[1])[1];
          protoItem.props.push({
            name: curProp[0],
            start: curProp[1],
            end: curProp[2],
            multiplier: ((pend-pstart)/(eend-estart))
          });
        // }
      }
    });
  }
};

function splitunit(str){
  return [(str.charAt(str.length-1) == "%" ? str.charAt(str.length-1) : str.substr(str.length-2, 2)),
        parseInt(str.charAt(str.length-1) == "%" ? str.substr(0, str.length-2) : str.substr(0, str.length-3))];
}

function handleScroll(vScrollPos, hScrollPos) {
  // let vscrollPct = scrollPos/(document.body.scrollHeight-window.innerHeight);
  let vDeltaScroll = vScrollPos - handleScroll.vLastScroll;
  let hDeltaScroll = hScrollPos - handleScroll.hLastScroll;
  if(vDeltaScroll!==0){
    scrollYItems.forEach(elem=>{
      elem.props.forEach(prop=>{
        if(elem.style[prop.name]){
          elem.style[prop.name]
        }
      });
    });
  }
  scrollXItems.forEach(elems=>{

  });
  handleScroll.vLastScroll = vScrollPos;
  handleScroll.hLastScroll = hScrollPos;
}

function handleMouse(x, y){
  // console.log(x, y);
  mouseXItems.forEach(elems=>{

  });
  mouseYItems.forEach(elems=>{

  });
}

if(scrollYItems[0]!=null || scrollXItems[0]!=null){
  window.addEventListener('scroll', function(e) {
    vLastScroll = e.currentTarget.scrollY;
    hLastScroll = e.currentTarget.scrollX;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        handleScroll(vLastScroll, hLastScroll);
        ticking = false;
      });
    }
    ticking = true;
  });
}

if(mouseYItems[0]!=null || mouseXItems[0]!=null){
  window.addEventListener('mousemove', function(e){
    let y = e.clientY;
    let x = e.clientX;
    handleMouse(x, y);
  });
}
