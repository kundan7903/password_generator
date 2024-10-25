const inputSlider = document.querySelector("[data-lengthslider]");
const lengthDisplay = document.querySelector("[data-length-number]");
const passwordDisplay = document.querySelector("[data-passworddisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '!@#$%^&*()_+<>?":}{|;\',./.,~`';
let password = "";
let passwordlength = 10;
let checkcount = 0;
setIndicator("#ccc");

handleSlider();

function handleSlider() {
    inputSlider.value = passwordlength;
    lengthDisplay.innerText = passwordlength;

    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordlength-min)*100/(max-min))+"%100%"
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRndInteger() {
    return getRndInteger(0, 10);
}

function generateLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasupper = false;
    let haslower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasupper = true;
    if (lowercaseCheck.checked) haslower = true;
    if (numberCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasupper && haslower && (hasNum || hasSym) && passwordlength >= 8) {
        setIndicator("#0f0");
    } else if ((haslower || hasupper) && (hasNum || hasSym) && passwordlength >= 6) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    } catch (e) {
        copyMsg.innerText = "fail";
    }

    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

function handleCheckboxChange() {
    checkcount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkcount++;
        }
    });

    if (passwordlength < checkcount) {
        passwordlength = checkcount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckboxChange);
});

inputSlider.addEventListener('input', (e) => {
    passwordlength = e.target.value;
    handleSlider();
});

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
});

generateBtn.addEventListener('click', (e) => {
    if (checkcount <= 0) return;

    if (passwordlength < checkcount) {
        passwordlength = checkcount;
        handleSlider();
    }

    password = "";

    function shufflePassword(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }

    let funcArr = [];
    if (uppercaseCheck.checked) {
        funcArr.push(generateUpperCase);
    }

    if (lowercaseCheck.checked) {
        funcArr.push(generateLowerCase);
    }

    if (numberCheck.checked) {
        funcArr.push(generateRndInteger);
    }

    if (symbolsCheck.checked) {
        funcArr.push(generateSymbol);
    }

    
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }

   
    for (let i = password.length; i < passwordlength; i++) {
        let rndIndex = getRndInteger(0, funcArr.length);
        password += funcArr[rndIndex]();
    }

   
    password = shufflePassword(Array.from(password));

    passwordDisplay.value = password;
    calcStrength();
});
