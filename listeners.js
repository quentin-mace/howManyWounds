import { howManyWounds } from "./maths.js";
import { displayOutput } from "./domManip.js";

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
        }
    });
}

//Function to launch the calculation when clicking the button
export function addCalculateButtonListener() {
    const calculateButton = document.querySelector(".caclulate-btn");
    calculateButton.addEventListener("click", ()=>{
        // Creation de l'objet "Special Rules"
        const specialRules = {
            sustained_hits: document.getElementById("has-sushits").checked,
            sushits_value: document.getElementById("sushits-input").value,
            lethal_hits: document.getElementById("lethits").checked
        };
        //Creation de l'objet "Weapon"
        const averageDamage = Number(document.getElementById("num-rnd-dmg").value)*Number(document.getElementById("rand-dmg").value)+Number(document.getElementById("damage").value);
        const weapon = {
            attack: document.getElementById("nb-attacks").value,
            cc_ct: document.getElementById("cc-ct").value,
            strengh: document.getElementById("strengh").value,
            ap: document.getElementById("ap").value,
            damage: averageDamage,
            special_rules: specialRules
        };
        // Création de l'objet "Target"
        const invul = document.getElementById("invul");
        if (invul.disabled) {
            invul.value = null;
        }
        const fnp = document.getElementById("fnp");
        if (fnp.disabled) {
            fnp.value = null;
        }
        const target = {
            toughness: document.getElementById("toughness").value,
            save: document.getElementById("save").value,
            invul: invul.value,
            fnp: fnp.value
        };
        const outputDamage = howManyWounds(weapon, target);
        displayOutput(outputDamage);
    });
}

//Function to activate/Deactivate the random damage selector
export function addRandomDamageListener() {
    const numberOfDiceDmg = document.getElementById("num-rnd-dmg");
    numberOfDiceDmg.addEventListener("change", ()=> {
        const diceSelector = document.getElementById("rand-dmg");
        console.log(numberOfDiceDmg.value);
        if (Number(numberOfDiceDmg.value) !== 0){
            diceSelector.disabled = false;
        } else {
            diceSelector.disabled = true;
        }
        console.log(diceSelector.disabled);
    });
}