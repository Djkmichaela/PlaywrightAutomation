function generateAString(){
// Generate a string  
let string = "Playw";

let characts = 'random';
if (characts === 'random') {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i <= (Math.floor(Math.random() * 4 + 5)); i++) {
        let selector = Math.floor(Math.random() * characters.length);    
        string += characters[selector]
    }
} 
 return string;
}
console.log(generateAString());


let person={};

// Function to generate a random name
function generateRandomName() {
    // Arrays of first and last names
const firstNames = ["John", "Jane", "Alex", "Chris", "Taylor", "Jordan", "Morgan", "Sam", "Casey", "Riley","Faith","Michael"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson"];

  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  person.firstName = randomFirstName;
  person.lastName = randomLastName;
 // return `${randomFirstName} ${randomLastName}`;
 return person;
}
generateRandomName();
// Example of generating a random name
console.log(person.firstName, person.lastName);


// Function to generate a random phone number
function generateRandomPhoneNumber() {
    // Random area code (in the format of a 2-digit number)
    const areaCode = Math.floor(Math.random() * 90) + 10; // 100-999
  
    // Random central office code (3 digits)
    const centralOfficeCode = Math.floor(Math.random() * 900) + 100; // 100-999
  
    // Random line number (3 digits)
    const lineNumber = Math.floor(Math.random() * 900) + 100; // 1000-9999
  
    // Format the phone number
    return `07${areaCode} ${centralOfficeCode}${lineNumber}`;
  }
  
  // Example of generating a random phone number
  console.log(generateRandomPhoneNumber());
  