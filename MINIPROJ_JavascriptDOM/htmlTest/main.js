// import DOM from './dom.js';
// import DOM from 'dom';

// import DOM from './dom';
// import Contract from './contract';
// import './flightsurety.css';



mockAirlines = [
  { name: 'airline1', addr: '0x1' },
  { name: 'airline2', addr: '0x2' },
  { name: 'airline3', addr: '0x3' },
];

mockFlights = [
  { name: 'flight1', addr: '0x1' },
  { name: 'flight2', addr: '0x2' },
  { name: 'flight3', addr: '0x3' },
];



(async () => {
  let result = null;
  console.log('Starting main script');
  document.writeln("<p>First line</p>")
  // flightsDropdownWrite();
})();


/****************/
/*** Airlines ***/
/****************/
function airlinesWrite() {
  console.log('airlinesWrite()');
  
  // Get all airlines from smart contract
  _airlines = airlinesGet();

  // Select the table
  let t1 = document.getElementById("airlinesTable");

  // Build the rows
  let rows = [];
  for (al of _airlines) {
    rows.push(`<tr><td>${al.name}<td>${al.addr}</tr>`)
  }
  allRows = rows.join("")
  t1.innerHTML = allRows;
}

function airlinesGet() {
  return mockAirlines;
}

/***************/
/*** Flights ***/
/***************/
function flightsDropdownWrite() {
  console.log('flightsDropdownWrite()');
  
  // Get all flights
  _flights = flightsGet();

  // Select the dropdown and text element
  let dr1 = document.getElementById("thisFlight");

  // Build the dropdowns
  let items = [];
  for (fl of _flights) {
    items.push(`<option value="${fl.name}">${fl.name}</option>`);
  }
  allItems = items.join("");
  dr1.innerHTML=allItems;
}

function flightsGet() {
  return mockFlights;
}

function selectFlight() {
  // Get flight from dropdown
  var thisFlight = document.getElementById("thisFlight").value;
  
  // Select the header text tag
  let t1 = document.getElementById("selectedFlight")

  // Write
  t1.innerHTML=`Selected flight: ${thisFlight}`
}

/*************/
/*** Other ***/
/*************/
function showCommentForm() {
  var data = "Name:<input type='text' name='name'><br>Comment:<br><textarea rows='5' cols='80'></textarea><br><input type='submit' value='Post Comment'>"
  document.getElementById("mylocation").innerHTML = data;
}


function getCube() {
  var number = document.getElementById("number").value;
  alert(number * number * number);
}



