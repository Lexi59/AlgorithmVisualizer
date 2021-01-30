/*
    Alexis VanderWilt 2021
*/

var values = [];
var divs = [];

function select(sort){
    console.log(sort);
    const li = document.getElementsByTagName('li');
    for(element = 0; element < li.length; element++){
        li[element].className = '';
        if(li[element].innerHTML == sort){
            li[element].className = 'selected';
        }
    }
}

function generateArray(){
    values = [];
    for(var i = 0; i < 100; i++){
        values.push(Math.floor(Math.random()*500));
    }
    console.log(values);
    redraw();
}

function redraw(){
    const appArea = document.querySelector('#appArea');
    appArea.innerHTML = "";
    divs = [];
    for(var i =0 ; i < values.length; i++){
        var div = document.createElement('div');
        div.id = i;
        div.style.height = values[i] + 'px';
        appArea.appendChild(div);
        divs.push(div);
    }
}

generateArray();
