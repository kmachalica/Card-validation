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

console.log(numberOutput,bankOutput,cvvOutput,ownerOutput,validOutput)

numberInput.onkeyup = (e)=>{
    let value = numberInput.value;
    if(e.key="Backspace"){
        
    }
    if(value.length===4 || value.length===9 || value.length ==14){value=value+" ";numberInput.value = value}

    const output = value+numberOutput.innerHTML.slice(value.length);
    numberOutput.innerHTML = output;
    console.log(output)

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