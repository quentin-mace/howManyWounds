import { howManyWounds } from "./maths.js";
import { displayError, displayOutput } from "./domManip.js";
import { readWeapon, readTarget } from "./docReader.js";

//Function to activate of deactivate the invul field with the checkbox
export function addCheckboxListener(checkboxClass, inputClass) {
    const checkbox = document.querySelector(checkboxClass);
    checkbox.addEventListener("change", ()=>{
        //console.log(checkbox.name + " : " + checkbox.checked);
        const input = document.querySelector(inputClass);
        if(input.disabled){
            input.disabled = false;
        } else {
            input.disabled = true;
            input.value = null;
        }
    });
}

//Function to launch the calculation when clicking the button
export function addCalculateButtonListener() {
    const calculateButton = document.querySelector(".caclulate-btn");
    calculateButton.addEventListener("click", ()=>{
        try{
            const weapon = readWeapon();
            const target = readTarget();
            const outputDamage = howManyWounds(weapon, target);
            displayOutput(outputDamage);
        } catch(error) {
            displayError(error.message);
        }
    });
}

//Function to activate/Deactivate the random damage selector
export function addRandomDiceListener(numberOfRandom, randomDice) {
    const numberOfDiceDmg = document.getElementById(numberOfRandom);
    numberOfDiceDmg.addEventListener("change", ()=> {
        const diceSelector = document.getElementById(randomDice);
        console.log(numberOfDiceDmg.value);
        if (Number(numberOfDiceDmg.value) !== 0){
            diceSelector.disabled = false;
        } else {
            diceSelector.disabled = true;
        }
        console.log(diceSelector.disabled);
    });
}