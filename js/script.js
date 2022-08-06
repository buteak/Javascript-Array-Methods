const addUser = document.getElementById('add-user');
const doubleMoney = document.getElementById('double-money');
const showMillionaire = document.getElementById('show-millionaire');
const sort = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');
const main = document.getElementById('show');

let data = [];


 async function showUser (){
   const res = await fetch('https://randomuser.me/api');
   const data = await res.json();

   const user = data.results[0];
   
   const newUser = {
    name : ` ${user.name.first} ${user.name.last}`,
    money : Math.floor(Math.random() * 100000)
   };
   
   addData(newUser)
   
}
// Double Money
function doubled(){
  data = data.map((newUser) => {
   return {...newUser, money: newUser.money *2}
  });

  updateDOM();
}

//  sort by riches

function sorted(){
 data.sort((a, b) => {
   return b.money-a.money;
 });

 updateDOM();
}

// filter Millionaire

function filtered(){
  data = data.filter((item) => {
    return item.money > 1000000;
  });
  updateDOM();
}

//  calculate Wealth

function calculated (){
   const wealth = data.reduce( (acc, user) => {
     return acc += user.money;
   }, 0);

   const wealthElement = document.createElement('div');
   wealthElement.innerHTML = `<h3> Total Wealth : <strong> ${formatMoney(wealth)}</strong> </h3>`;
   main.append(wealthElement);
}




// Add data function
function addData(obj){
    data.push(obj);

    updateDOM();
}

//  Update DOM
function updateDOM(providedData = data){
    // clear main div
   main.innerHTML = '<h2> <strong>Person</strong> Wealth</h2>';

   providedData.forEach(item => {
      const element = document.createElement('div');
      element.classList.add('person');
      element.innerHTML = `<strong>${item.name}</strong>  ${formatMoney(item.money)}`;
      main.appendChild(element)
   })
}

// format text as money
function formatMoney( num){
   return'$'+ '' + (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//  Event Listeners

addUser.addEventListener('click', showUser);
doubleMoney.addEventListener('click', doubled);
sort.addEventListener('click', sorted);
showMillionaire.addEventListener('click', filtered);
calculateWealth.addEventListener('click', calculated);