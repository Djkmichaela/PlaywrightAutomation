for(let k=1 ;k<=10;k++){

    if(k%2==0){

        console.log(k)
    }
}

for(let k=1 ;k<=10;k++){

    if(k%2==0 && k%5==0){

        console.log(k)
    }
}

const marks =[2,5,6,73,67,89,90];
console.log(marks.length)
marks.push(65)// adds the element at the end of the array
console.log(marks,'here')
marks.pop() // removes the last element in the array
console.log(marks,'here')
submarks = marks.slice(2,5); // creates a sub array and prints values from 2 to 5

console.log(submarks);

const scores = [12,13,15,16,20];
//print even numbers from the above array

let newFileterEvenScores = scores.filter(score=>score%2==0)// filter returns contions that are satisfied
console.log(newFileterEvenScores)

//lets add up all the values in the scores array below

let total = marks.reduce((sum,mark)=>sum+mark,0) // starts at zero, reduce performs operations on the whole array
console.log(total);

 let totals =marks.map(score=>score+3) // performs and oparation on each element in the array
 console.log(totals)

 let amounts =scores.filter(score=>score%2==0).map(score=>score+3).reduce((sum,score)=>sum+score,0)
console.log(amounts);

const fruits =['Banana','Apple','Mango','Pomplemouse'];

fruits.sort()
console.log(fruits)

const numbers =[12,3,24,16,19];
console.log(numbers.sort((a,b)=>a-b));// it does a bubble sort minus all compinations the ones with the smallest gap are moved to the front
console.log(numbers.reverse()) // prints the array in reverse