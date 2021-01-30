/*
    Alexis VanderWilt 2021
*/

var values = [];
var divs = [];
var targetVal;

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
    var index = Math.floor(Math.random()*values.length);
    targetVal = values[index];
    document.getElementById(index).className = 'target';
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
async function linearSearch(){
    for(var i = 0; i < values.length; i++){
        document.getElementById(i).style.backgroundColor = 'green';
        await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, 100)
          );
        if(values[i] == targetVal){
            document.getElementById(i).style.backgroundColor = 'blue';
            return;
        }
        else{
            document.getElementById(i).style.backgroundColor = 'red';
        }
    }
}
function swap2(i, j){
    const container = document.getElementById('appArea');
    const div1 = document.getElementById(i);
    const div2 = document.getElementById(j);
    const div1Swap = document.getElementById(j+1);
    const div2Swap = document.getElementById(i+1);

    div1.id = j;
    div2.id = i;
    
    temp = values[i];
    values[i] = values[j];
    values[j] = temp;

    container.insertBefore(div2, div2Swap);
    container.insertBefore(div1, div1Swap);
}
function insertionSort(){
    var i = 1;
    while( i < values.length){
        var j = i;
        while(j > 0 && values[j-1] > values[j]){
            swap2(j,j-1);
            j--;
        }
        i++;
    }
}
async function binarySearch (l, r){
    if(r >= 1){
        var mid = Math.floor(l+(r-l)/2);
        document.getElementById(mid).style.backgroundColor = 'green';
        await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, 1000)
          );
        if(values[mid] == targetVal){
            document.getElementById(mid).style.backgroundColor = 'blue';
            return mid;
        }
        else if(values[mid] > targetVal){
            document.getElementById(mid).style.backgroundColor = 'red';
            return binarySearch(1, mid-1);
        }
        else{
            document.getElementById(mid).style.backgroundColor = 'red';
            return binarySearch(mid+1,r);
        }
    }
} 
async function jumpSearch(){
    var step = Math.sqrt(values.length); 
    var prev = 0; 
    while (values[Math.min(step, values.length)-1] < targetVal) 
    { 
        document.getElementById(Math.min(step, values.length)-1).style.backgroundColor = 'green';
        await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, 100)
          );
        document.getElementById(Math.min(step, values.length)-1).style.backgroundColor = 'red';
        prev = step; 
        step += Math.sqrt(values.length); 
        if (prev >= values.length) 
            return -1; 
        
    } 
    while (values[prev] < targetVal) 
    {
        document.getElementById(Math.min(step, values.length)-1).style.backgroundColor = 'green';
        await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, 100)
          );
        document.getElementById(Math.min(step, values.length)-1).style.backgroundColor = 'red';
        prev++; 
        if (prev == Math.min(step, values.length)) 
            return -1; 
        
    } 
    if (values[prev] == targetVal){
        document.getElementById(prev).style.backgroundColor = 'blue';
        return prev; 
    }
}
async function interpolationSearch(lo,hi){
    if (lo <= hi && targetVal >= values[lo] && targetVal <= values[hi]){
        var pos = Math.floor(lo + ((hi - lo) / (values[hi] - values[lo]) * (targetVal - values[lo])));
        document.getElementById(pos).style.backgroundColor = 'green';
        await new Promise(resolve =>
            setTimeout(() => {
              resolve();
            }, 500)
          );
        if(values[pos] == targetVal){
            document.getElementById(pos).style.backgroundColor = 'blue';
            return pos;
        }

        if(values[pos] < targetVal){
            document.getElementById(pos).style.backgroundColor = 'red';
            return interpolationSearch(pos + 1,hi);
        }
 
        if(values[pos] > targetVal){
            document.getElementById(pos).style.backgroundColor = 'red';
            return interpolationSearch(lo,pos - 1);
        }
    }
}
function search(){
    const searchType = document.getElementsByClassName('selected')[0].innerHTML;
    if(searchType == "Linear Search"){
        linearSearch();
    }
    else if(searchType == "Binary Search"){
        insertionSort();
        binarySearch( 0, values.length -1);
    }
    else if(searchType == "Jump Search"){
        insertionSort();
        jumpSearch();
    }
    else if(searchType == "Interpolation Search"){
        insertionSort();
        interpolationSearch(0,values.length-1);
    }
}
generateArray();
