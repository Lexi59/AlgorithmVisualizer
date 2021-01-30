// TODO: Add Heap and Merge sort
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

function swap2(i, j){
    return new Promise(resolve => {
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
    
        // Wait for the transition to end!
        window.requestAnimationFrame(function() {
          setTimeout(() => {
            container.insertBefore(div2, div2Swap);
            container.insertBefore(div1, div1Swap);
            resolve();
          }, 100);
        });
      });
}


async function bubbleSort(){
    for(var i = 0; i < values.length-1; i++){
        var swap = false;
        for(var j = 0; j < values.length-i-1; j++){
            document.getElementById(j).style.backgroundColor = 'green';
            document.getElementById(j+1).style.backgroundColor = 'green';
            await new Promise(resolve =>
                setTimeout(() => {
                  resolve();
                }, 10)
              );
            if(values[j] > values[j+1]){
                await swap2(j,j+1);
                swap = true;
            }
            document.getElementById(j).style.backgroundColor = 'red';
            document.getElementById(j+1).style.backgroundColor = 'red';
        }
        if(!swap){return;}
    }
}
async function quickSort(arr, start, end) {
    // Base case or terminating case
    if (start >= end) {
        return;
    }
    
    // Returns pivotIndex
    let index = await partition(arr, start, end);
    
    // Recursively apply the same logic to the left and right subarrays
    await quickSort(arr, start, index-1);
    await quickSort(arr, index + 1, end);
}
async function partition(arr, start, end){
    // Taking the last element as the pivot
    const pivotValue = arr[end];
    let pivotIndex = start; 

    document.getElementById(end).style.backgroundColor = 'green';

    for (let i = start; i < end; i++) {
        document.getElementById(i).style.backgroundColor = 'green';
        if (arr[i] < pivotValue) {
            if(i != pivotIndex){
                document.getElementById(i).style.backgroundColor = 'blue';
                document.getElementById(pivotIndex).style.backgroundColor = 'blue';
                await swap2(i,pivotIndex);
                document.getElementById(pivotIndex).style.backgroundColor = 'red';
            }
            pivotIndex++;
        }
        document.getElementById(i).style.backgroundColor = 'red';   
    }
    // Putting the pivot value in the middle
    document.getElementById(end).style.backgroundColor = 'blue';
    document.getElementById(pivotIndex).style.backgroundColor = 'blue';
    await swap2(pivotIndex, end);
    document.getElementById(pivotIndex).style.backgroundColor = 'red';
    document.getElementById(end).style.backgroundColor = 'red';
    return pivotIndex;
};
async function insertionSort(){
    var i = 1;
    while( i < values.length){
        var j = i;
        while(j > 0 && values[j-1] > values[j]){
            document.getElementById(j).style.backgroundColor = 'green';
            document.getElementById(j-1).style.backgroundColor = 'green';
            await swap2(j,j-1);
            document.getElementById(j).style.backgroundColor = 'red';
            document.getElementById(j-1).style.backgroundColor = 'red';
            j--;
        }
        i++;
    }
}
async function selectionSort(){
    var i, j, min_idx;  
    for (i = 0; i < values.length-1; i++)  
    {  
        // Find the minimum element in unsorted array  
        min_idx = i;  
        for (j = i+1; j < values.length; j++)  
            if (values[j] < values[min_idx])  
                min_idx = j;  
    
        // Swap the found minimum element with the first element  
        document.getElementById(min_idx).style.backgroundColor = 'green';
        document.getElementById(i).style.backgroundColor = 'green';
        await swap2(min_idx, i);
        document.getElementById(min_idx).style.backgroundColor = 'red';
        document.getElementById(i).style.backgroundColor = 'red';
    }  
}
function sort(){
    document.getElementById('sort').backgroundColor = 'grey';
    const sortType = document.getElementsByClassName('selected')[0].innerHTML;
    if(sortType == "Bubble Sort"){
        bubbleSort();
    }
    else if(sortType == "Quick Sort"){
        quickSort(values, 0, values.length-1);    
    }
    else if (sortType == "Insertion Sort"){
        insertionSort();
    }
    else if(sortType == "Selection Sort"){
        selectionSort();
    }
}

generateArray();
