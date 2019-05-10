/**
 * Insertion sort
 * @param {number[]} arr Input array
 * @return {number[]} A sorted array
 */
function insertionSort(arr) {
  const array = arr.slice();
  
  for (let i = 1; i < array.length; i++) {
    const temp = array[i];
    let j;
    for (j = i - 1; j >= 0 && array[j] > temp; j--) {
      array[j+1] = array[j];
    }
    /*j = i - 1;
    while (j >= 0 && array[j] > temp) {
      array[j+1] = array[j];
      j--;
    }*/
    array[j+1] = temp;
  }
  
  return array;
}

/**
 * Generate an array of random numbers of given size
 * @param {number} n The size
 * @return {number[]} An array of random numbers
 */
function randomArray(n) {
  const array = [];
  for (let i=0; i<n; i++) {
    array.push(randomNumber());
  }
  return array;
}

/**
 * Generate a random number between 1 and 1000
 * @return {number} The random number
 */
function randomNumber() {
  return Math.floor(Math.random() * 1000) + 1;
}

const list = randomArray(10);
const sortedList = insertionSort(list);
//const sortedList = list.slice().sort((a,b)=>a>b);
console.log(list);
console.log(sortedList);