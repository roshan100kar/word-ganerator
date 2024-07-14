const inputNum = document.getElementById('num-input');
const optInput = document.getElementById('opt');
const btnElm = document.getElementById('gen-btn');
const genContent = document.querySelector('.gen-content');
const cpyBtn = document.getElementById('copy-btn')
let count = 5, options = "paras", tempCount = 0;
btnElm.addEventListener('click', function() {
    getValues();
})

function getValues() {
    count = inputNum.value;
    options = optInput.value;
    validateValue()
    // console.log(count, options);
    let url = `https://baconipsum.com/api/?type=meat-and-filler&${options}=${count}&start-with-lorem=1`;
    fetchContent(url) 
    
}

async function fetchContent(url) {
    let response = await fetch(url);
    if(response.status === 200) {
        let data = await response.json()
        // console.log(data);
        displayGenContent(data);
    }
}

function displayGenContent(data) {
    let text = "";
    text = data.join("<br><br>");
    genContent.innerHTML = text;

}
function validateValue() {
    tempCount = "";
    if(count > 100) {
        invalidInput()
        count = 100;
        inputNum.value = "100"
    } else if(count < 1 || isNaN(count)){
        invalidInput();
        count = 5;
        inputNum.value = "5";
    }else {
        // alert("Error");
    }
}

function invalidInput() {
    inputNum.style.borderColor = "red";

    setTimeout(()=> {
        inputNum.style.borderColor = "rgba(92, 42, 22, 0.548)";
    }, 1000);
}

cpyBtn.addEventListener('click', ()=> {
    let copyText = genContent.textContent;
    navigator.clipboard.writeText(copyText);
})

