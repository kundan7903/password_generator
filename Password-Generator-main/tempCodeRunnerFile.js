const inputSlider=document.querySelector("[data-lengthslider]");
const lengthDisplay=document.querySelector("[ data-length-number]");
const passwordDisplay=document.querySelector("[ data-passworddisplay]");
const copyBtn=document.querySelector("[ data-copy]");
const copyMsg=document.querySelector("[ data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase");
const lowercaseCheck=document.querySelector("#lowercase");
const numberCheck=document.querySelector("#numbers");
const symbolsCheck=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateBtn");
const allCheckBox=document.querySelectorAll("input[ type=checkbox]");
let password="";
let passwordlength=10;
let checkcount=1;

function handleSlider(){
    inputSlider.value=passwordlength;
    lengthDisplay.innerText=10;
}