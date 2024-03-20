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
    console.log(dices + " Attaks");
    //Roll to hit
    dices = dices*diceProbability[weapon.cc_ct];
    console.log(dices + " Hits");
    //Roll to wound
    dices = dices*diceProbability[woundRoll(weapon.strengh, target.toughness)];
    console.log(dices + " Wounds");
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
    console.log(dices + " Scored");
    let damage = dices*weapon.damage;
    if (target.fnp !== null){
        console.log(damage + " Damages before fnp");
        damage = damage - damage*diceProbability[target.fnp];
        console.log(damage + " Damages after fnp");
    } else {
        console.log(damage + " Damages");
    }
    return damage;
}