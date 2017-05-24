var blurred = false;
window.onblur = ()=> blurred = true;
window.onfocus = ()=> blurred && (location.reload());

const arr = [{a:0}, {bb:3, cs:3}, {a:0, rr:2}];
console.log(arr.every(elem => typeof elem === 'object'));

// console.log(window.getComputedStyle(document.getElementById('titleBox')).getPropertyValue('--vPar').trim())

// var boxTie = box.tie({name:'scrolly' min: '0', max: '100px'}, {prop: 'width', min:'30vw', max:'10vw'}, 'linear');
// boxTie.event.name = 'scrollX';
// boxTie.event.min = '30px';
//
// var squareTie = square.tie('mouseX', {prop:'left'});
//
// var mouseY = new tieEvent('mouseY', window.mouseY);
