const container = document.querySelector('.container')

const numberInput = document.getElementById('number');
const validInput = document.getElementById('month');
const ownerInput = document.getElementById('owner');
const bankInput = document.getElementById('bank');
const cvvInput = document.getElementById('cvv');

const numberOutput = document.querySelector('.card .number');
const bankOutput = document.querySelector('.card .bank');
const cvvOutput = document.querySelector('.card .cvv-code');
const ownerOutput = document.querySelector('.card .owner');
const validOutput = document.querySelector('.card .valid');



const cardFront = document.querySelector('.card.front');
const cardBack = document.querySelector('.card.back');


numberInput.oninput = (e) => {
    const input = numberInput.value;

    numberOutput.innerHTML = validCardNumber(input)
    }
    
ownerInput.oninput = (e) => {
    const input = ownerInput.value;

    ownerOutput.innerHTML = validOwner(input)
}

validInput.oninput = (e) => {
    const input = validInput.value;

    validOutput.innerHTML = validDate(input)
}

cvvInput.oninput = (e) => {
    const input = cvvInput.value;

    cvvOutput.innerHTML = validCvv(input)
}

bankInput.oninput = (e) => {
    const input = bankInput.value;

    bankOutput.innerHTML = changeCardStyle(input)
}



cvvInput.onfocus = ()=>{rotateCard(180,360)};
cvvInput.onblur = ()=>{rotateCard(360,180)}; 
    






function rotateCard(front,back)
{
    cardFront.style.transform = `rotateY(${front}deg)`;
    cardFront.style.transition = "linear .75s";
    cardBack.style.transform = `rotateY(${back}deg)`;
    cardBack.style.transition = "linear .75s"; 
}

function validCardNumber(input)
{
    let output = "################";
    let inputTab = [...input];
    if(inputTab.some(element=>isNaN(parseInt(element)))){
        if(!document.querySelector('.error')){errorInfo("Numer karty powinien zawierać tylko cyfry 0-9, bez spacji","append", 21,9.5)}
        inputTab = inputTab.filter(element=>!isNaN(parseInt(element)));
    }
    else{
        if(document.querySelector('.error')){errorInfo('DIV DO USUNIĘCIA','remove',0,0)}
    }
    let regex = /[\d*#*]{4}/g;
    output = inputTab.concat([...output].slice(inputTab.length));

    if(/[\d]{16}/.test(output.join(''))){console.log('vali'),numberInput.style.border = "green 2px solid"}
    else{numberInput.style.border = null}
    return output.join('')
            .match(regex)
            .join(' ')
}

function validOwner(input)
{
    const regex = /[a-z]+(?=\s)|[a-z]+$/gi;
    const testRegex = /^[a-z][a-z\s]*[a-z]$/gi
    input = input.trim();
    
    let output = input.match(regex);
    
    if(output){
        output = output.map(element=>element[0].toUpperCase()+element.slice(1).toLowerCase());
        if(/^[a-z][a-z\s]*[a-z]$/gi.test(input)){ownerInput.style.border = "green 2px solid", console.log(output.join(''))}
        else{ownerInput.style.border = null}
    }
    else if(input.length>0){ownerInput.style.border = null}
    
    if(!testRegex.test(input) && input.length>1 || (input.length === 1 && !/[a-z]/i.test(input)))
        {if(!document.querySelector('.error')){
            errorInfo('Może zawierać tylko litery, bez polskich znaków','append',21,12.5)
        }}
    else if(document.querySelector('.error')){
        errorInfo("DIV DO USUNIĘCIA", 'remove', 0, 0)
    }
    else if(input.length===0){
        output = "Imię i nazwisko"
    }
   
    
    return Array.isArray(output) ? output.join(' '):output
}

function validDate(input)
{
    
    let today = new Date();
    let validThru = new Date(input);
    let output = "MM/YY"
    
    if(today < validThru){

        let month = validThru.getMonth()+1;
        if(month<10){month = "0"+month}
        if(document.querySelector('.error')){errorInfo('','remove',0,0)}
        output = `${month}/${validThru.getFullYear().toString().slice(2,4)}`
        if(document.querySelector('.error')){errorInfo('','remove',0,0)}
        validInput.style.border = "green 2px solid"
    }
    else if(validThru.getFullYear()>2000) {output = `${validThru.getMonth()+1}/##`; 
        validInput.style.border = null;
        if(!document.querySelector('.error')){errorInfo('Karta straciła ważność. Podaj ważną kartę','append',5,17)}}

    return output;

}

function validCvv(input)
{
    const regex = /^[\d]+$/;
    if(!regex.test(input) && input.length>0 && !document.querySelector('.error')){errorInfo("Kod cvv powinien zawierać tylko 3 cyfry z zakresu 0-9","append",22,15)}
    else if(document.querySelector('.error') && (regex.test(input) || input.length === 0)){errorInfo("","remove",0,0)}

    if(regex.test(input) && input.length===3){cvvInput.style.border = "2px solid green"}
    else{cvvInput.style.border = null}
    return regex.test(input) ? input: "###" 

}

function changeCardStyle(input)
{
    let colors;
    let deg;
    let output;
    let string = ""
    switch(input){
        case "ing": deg = "135deg"; colors = ['#cc4000', '#ff6200', '#ff9533']; output = "ING Bank Śląski"; break;
        case "pko": deg = "135deg"; colors = ['#6f0000 0%','#aa0000 40%','#aabbcc']; output = "PKO Bank Polski"; break;
        case "mbank": deg = "90deg"; colors = ['#dd0000 25%', '#000000 25% 30%', '#ff8f00 30% 55%', '#aa0000 55% 72%', '#00ddff 72% 75%', '#00aa00 75% 100%']; output = "mBank"; break;
        case "bnp": deg = "90deg"; colors = ['#028166 75%', '#eee 75%']; output = "BNP Paribas"; break;
        case "millenium": deg = "180deg"; colors = ["#c02581 32%", "#fff 32% 34%", "#c02581 33%"]; output = "Millenium"; break;
        case "alior": deg = "90deg"; colors = ["#c67d2c 40%", "#800000 50%"]; output = "Alior Bank"; break;
        case "pekao": deg = "135deg"; colors = ['#dd0000 60%','#bbbbbb']; output = "PEKAO S.A."; break;
        case "agricole": deg = "90deg"; colors = ['#1a9199 47%','#ee2c3f 50% 55%', '#0b6d53 58% 100%' ]; output = "Credit Agricole"; break;
        default: colors = []; output = "Bank"; break;
    }
    for(let i = 0; i<[...colors].length; i++)
    {
        string+=","+colors[i]
    }
    console.log(string)
    cardFront.style.background = `linear-gradient(${deg} ${string})`
    cardBack.style.background = `linear-gradient(${deg} ${string})`

    return output
}

function errorInfo(message, action, left, top)
{
    if(action === "append")
    {
        let error = document.createElement('div');
        error.classList.add('error');
        container.append(error);
        error.style.left = left + "rem";
        error.style.top = top + "rem";
        error.innerHTML = message;
    }
    else {
        let error = document.querySelector('.error')
        container.removeChild(error)
    }
}