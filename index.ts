// Import stylesheets
import './style.css';
import { Colours } from './models/colours.enum';
import { BodyParts, BodyPartsHelper } from './models/bodyParts.enum';
import { SpinRecord } from './models/spin';

// used to make the spinner spin
let spinnerCounter = 0;

// container for the spinner
let spinnerCycle;

// used to keep track of how many spins have been requested
let spinCount = 0;

// used to keep track of the results of the spin
let selectedColour: string;
let selectedBodyPart: string;

// use to store the results of spins
let spinHistoryArray: Array<SpinRecord> = [];

const colourDiv = document.getElementById('colourResult');

// sets up an array of strings to represent the colours from the enum
let coloursArray: Array<string> = [];
for (let colour in Colours) {
  if (isNaN(Number(colour))) {
    coloursArray.push(colour);
  }
}

const bodyPartP = document.getElementById('bodyPartText');

// TODO see above and create an array of strings to store the bodypart strings from the enum
let bodyPartsArray: Array<string> = [];
for (let part in BodyParts) {
  if (isNaN(Number(part))) {
    bodyPartsArray.push(part);
  }
}

let SpinRecord: Array<string | number> = [];
// TODO add eventlistners to buttons
const spinBtn = <HTMLButtonElement>document.getElementById('spin-btn');
spinBtn.addEventListener('click', () => spinBtnHandler(2000, 100));
const statsBtn = <HTMLButtonElement>document.getElementById('statsBtn');
statsBtn.addEventListener('click', statsBtnHandler);
// TODO handles the spin button click
// time in ms, interval in ms
function spinBtnHandler(time: number, interval: number) {
  // start spinner rotating through colours
  spinnerCycle = setInterval(() => spinSpinners(), interval);

  // TODO randomly select colour from array
  let colourIndex: number = Math.floor(Math.random() * coloursArray.length);
  selectedColour = coloursArray[colourIndex];

  // TODO randomly select bodyPart from array
  let bodyPartIndex: number = Math.floor(Math.random() * bodyPartsArray.length);
  selectedBodyPart = bodyPartsArray[bodyPartIndex];

  spinBtn.disabled = true;

  // set timer to stop the spinners rotating
  setTimeout(() => stopSpinners(), time);
}

// rotates between the colours in Colours.enum.
function spinSpinners() {
  spinnerCounter++;

  colourDiv.style.backgroundColor =
    coloursArray[spinnerCounter % coloursArray.length];

  bodyPartP.innerHTML = bodyPartsArray[spinnerCounter % bodyPartsArray.length];
}

// stops spinner after time parameter, time in ms
function stopSpinners() {
  clearInterval(spinnerCycle);
  // TODO set colourDiv and bodyPartP to the randomly spun results
  document.getElementById(
    'colourResult'
  ).style.backgroundColor = selectedColour;
  document.getElementById('bodyPartResult').innerText = selectedBodyPart;

  spinBtn.disabled = false;
  addToHistory();
}

// TODO add the newly spun result to the history table
let Num = 0;
function addToHistory() {
  const historyTableBody: HTMLTableSectionElement = <HTMLTableSectionElement>(
    document.getElementById('historyTableBody')
  );

  let newBody: HTMLTableSectionElement = <HTMLTableSectionElement>(
    document.createElement('tbody')
  );
  newBody.id = 'historyTableBody';
  Num++;
  newBody.innerHTML =
    historyTableBody.innerHTML +
    '<tr><td>' +
    Num +
    '</td><td>' +
    selectedColour +
    '</td><td>' +
    selectedBodyPart +
    '</td></tr>';
  historyTableBody.parentNode.replaceChild(newBody, historyTableBody);
  SpinRecord.push(selectedColour);
  SpinRecord.push(selectedBodyPart);
  SpinRecord.push(Num);
}

let countC = 0;
let countB = 0;
const colourSelect = <HTMLSelectElement>document.getElementById('colourSelect');
const partSelect = <HTMLSelectElement>document.getElementById('bodyPartSelect');
for (let c in Colours) {
  if (isNaN(Number(c))) {
    let newOption: HTMLOptionElement = document.createElement('option');
    newOption.innerHTML = c;
    newOption.value = countC.toString();
    countC++;
    colourSelect.add(newOption);
  }
}
for (let c in BodyParts) {
  if (isNaN(Number(c))) {
    let newOption: HTMLOptionElement = document.createElement('option');
    newOption.innerHTML = c;
    newOption.value = countB.toString();
    countB++;
    partSelect.add(newOption);
  }
}

function statsBtnHandler() {
  // TODO set the statsResults div innerHTML to the amount and last spun number that the user has chosen
  // eg. Red LeftHand spun 10 times
  //     Red LeftHand last spun at num 23
  let cDiv = <HTMLInputElement>document.getElementById('colourSelect');
  let cDivValue = cDiv.value;

  let bPP = <HTMLInputElement>document.getElementById('bodyPartSelect');
  let bPPValue = bPP.value;

  document.getElementById('statsResults').innerHTML =
    Colours[cDivValue] +
    ' ' +
    BodyParts[bPPValue] +
    ' spun ' +
    getAmount(cDivValue, bPPValue) +
    ' times. ' +
    '<br>' +
    Colours[cDivValue] +
    ' ' +
    BodyParts[bPPValue] +
    ' last spun at num ' +
    getLastSpun(cDivValue, bPPValue);
}

// TODO returns the amount of times the combination of selected of colour and body part have been spun
function getAmount(colour, bodyPart): number {
  let countD = 0;
  let c = 0;
  while (c < SpinRecord.length) {
    //if (isNaN(Number(c))) {
    console.log(SpinRecord[c] + ' Testing');

    if (coloursArray[colour] == SpinRecord[c]) {
      console.log(SpinRecord[c] + ' Pass 1');
      if (bodyPartsArray[bodyPart] == SpinRecord[c + 1]) {
        countD++;
      }
    }
    c = c + 1;
    //}
  }
  console.log(countD);

  console.log(coloursArray[colourSelect.value]);
  console.log(colourSelect.value);
  return countD;
}

// TODO return the last num which the combination of selected of colour and body part have been spun
function getLastSpun(colour, bodyPart): number {
  let d = 0;
  let c = 0;
  while (c < SpinRecord.length) {
    //if (isNaN(Number(c))) {
    console.log(SpinRecord[c] + ' Testing');

    if (coloursArray[colour] == SpinRecord[c]) {
      console.log(SpinRecord[c] + ' Pass 1');
      if (bodyPartsArray[bodyPart] == SpinRecord[c + 1]) {
        d = (c + 3) / 3;
      }
    }
    c = c + 1;
    //}
  }

  console.log(coloursArray[colourSelect.value]);
  console.log(colourSelect.value);
  return d;
}
