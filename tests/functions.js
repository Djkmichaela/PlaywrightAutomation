function add(a,b){
  return  a+b
}

let sum =add(2,4);
console.log(sum);

// annonymous functions
let sums = ((a,b)=>a+b);

console.log(sums(9,10))


// dealing with strings

let day = 'Wednesday';

console.log(day.length);

// pring a few letters of the string

let subday =day.slice(2);// starts printing at the the second index
console.log(subday);

let days = 'February';
let subdays =days.slice(2,8) // prints a section of the string
console.log(subdays);