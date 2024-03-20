const diceProbability = {
    2: 5/6,
    3: 2/3,
    4: 1/2,
    5: 1/3,
    6: 1/6
};


function woundRoll(strengh, toughness){
    if(strengh === toughness){
        return 4;
    } else if(strengh >= 2*toughness) {
        return 2;
    } else if(strengh > toughness) {
        return 3;
    } else if(toughness >= 2*strengh) {
        return 6;
    } else {
        return 5;
    }
}

export function howManyWounds(weapon, target){
    let dices = 0;
    //Number of attacks
    dices = weapon.attack;
    console.log(Number(dices).toFixed(2) + " Attaks");
    //Roll to hit
    dices = dices*diceProbability[weapon.cc_ct];
    console.log(Number(dices).toFixed(2) + " Hits");
    //Store the lethal hits and remove them from the calculations
    let lethalHits = 0;
    if(weapon.special_rules.lethal_hits){
        lethalHits = weapon.attack/6;
        dices = dices - lethalHits;
        console.log(Number(lethalHits).toFixed(2) + " dice are lethal");
        console.log(Number(dices).toFixed(2) + " dice to roll for wounding");
    }
    //Add sustained hits
    if (weapon.special_rules.sustained_hits){
        let sustainedDice = 0;
        sustainedDice = (weapon.attack/6)*weapon.special_rules.sushits_value;
        dices = dices+sustainedDice;
        console.log(Number(dices).toFixed(2) + " dice to roll with sustained");
    }
    //Calculate how many dev wounds would score
    let devWounds = 0;
    if(weapon.special_rules.dev_wounds){
        devWounds = dices/6;
    }
    //Roll to wound
    dices = dices*diceProbability[woundRoll(weapon.strengh, target.toughness)];
    //Remove the devastating wounds from the calculations
    console.log(Number(dices).toFixed(2) + " Wounds scored");
    if(weapon.special_rules.dev_wounds){
        console.log(Number(devWounds).toFixed(2) + " of them are Devastating");
        dices = dices-devWounds;
        console.log(Number(dices).toFixed(2) + " left to roll");
    }
    //Add back the lethal hits if needed
    if(weapon.special_rules.lethal_hits){
        dices = dices+lethalHits;
        console.log("Re adding the " + lethalHits.toFixed(2) + " lethal hits");
        console.log(Number(dices).toFixed(2) + " total wounds scored");
    }
    //Roll save
    let save = Number(target.save) + Number(weapon.ap);
    console.log("Modified Save : " + save);
    //Do we use the invul
    console.log("Invul : " + target.invul);
    if (target.invul && target.invul < save) {
        save = target.invul;
    }
    if(save <= 6){
        dices = dices - dices*diceProbability[save];
    }
    console.log(Number(dices).toFixed(2) + " Scored");
    //Add back the devastating wounds
    if(weapon.special_rules.dev_wounds){
        console.log(Number(devWounds).toFixed(2) + " dev wounds re-added");
        dices = dices + devWounds;
        console.log(Number(dices).toFixed(2) + " total dices scored");
    }
    //Calculation of the final damage
    let damage = dices*weapon.damage;
    //Utilisation du FNP si besoin
    if (target.fnp){
        console.log(Number(damage).toFixed(2) + " Damages before fnp");
        damage = damage - damage*diceProbability[target.fnp];
        console.log(Number(damage).toFixed(2) + " Damages after fnp");
    } else {
        console.log(Number(damage).toFixed(2) + " Damages");
    }
    return damage;
}