const diceProbability = {
    2: 5/6,
    3: 2/3,
    4: 1/2,
    5: 1/3,
    6: 1/6
};

export function calculateAverageDices(diceNumberId, diceValueId, modifierId){
    return Number(document.getElementById(diceNumberId).value)*Number(document.getElementById(diceValueId).value)+Number(document.getElementById(modifierId).value);
} 

function woundTable(strengh, toughness){
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

function hitRoll(attacks, cc_ct, rules) {
    let hits = {
        basic: 0,
        lethal:0
    }
    if (rules.torrent) {
        hits.basic = attacks;
        console.log("Auto Hits");
    } else {
        hits.basic = attacks*diceProbability[cc_ct];
        console.log(Number(hits).toFixed(2) + " Hits");
        if (rules.sustained_hits) {
            sushits = (attacks/6)*rules.sushits_value;
            hits.basic += sushits;
            console.log(Number(sushits).toFixed(2) + " of them are sustained");
            console.log(Number(hits.basic).toFixed(2) + " total hits");
        }
        if (rules.lethal_hits) {
            hits.lethal = attacks/6
            hits.basic -= hits.lethal;
            console.log(Number(hits.lethal).toFixed(2) + " of them are lethal");
            console.log(Number(hits.basic).toFixed(2) + " dice to roll for wounding");
        }
    }
    return hits;
}

function woundRoll(hits, strengh, toughness, rules){
    let wounds = {
        basic: 0,
        devastating: 0
    }
    wounds.basic = hits.basic*diceProbability[woundTable(strengh, toughness)];
    console.log(Number(wounds.basic).toFixed(2) + " Wounds scored");
    wounds.devastating = hits.basic/6;
    if(rules.twin_linked){
        let remainingHits = hits.basic-wounds.basic;
        console.log(Number(remainingHits).toFixed(2) + " left to reroll");
        wounds.basic += remainingHits*diceProbability[woundTable(strengh, toughness)];
        wounds.devastating += remainingHits/6;
        console.log(Number(wounds.basic).toFixed(2) + " total Wounds scored");
    }
    if(rules.dev_wounds){
        wounds.basic -= wounds.devastating;
        console.log(Number(wounds.devastating).toFixed(2) + " of them are Devastating");
        console.log(Number(wounds.basic).toFixed(2) + " left to roll");
    }
    if (rules.lethal_hits) {
        wounds.basic += hits.lethal;
        console.log("Re adding the " + hits.lethal.toFixed(2) + " lethal hits");
        console.log(Number(wounds.basic).toFixed(2) + " total wounds scored");
    }
    return wounds;
}

function saveRoll(wounds, target, ap, rules) {
    let scored = wounds.basic;
    let save = Number(target.save) + ap;
    console.log("Modified Save : " + save + "+");
    if (target.invul && target.invul < save) {
        console.log("The Invul will be used : " + target.invul + "+");
        save = target.invul;
    }
    if(save <= 6){
        scored -= wounds.basic*diceProbability[save];
    }
    console.log(Number(wounds.basic).toFixed(2) + " attacks Scored");
    if(rules.dev_wounds){
        console.log(Number(wounds.devastating).toFixed(2) + " dev wounds re-added");
        wounds.basic = wounds.basic + wounds.devastating;
        console.log(Number(wounds.basic).toFixed(2) + " total attacks scored");
    }
    return scored;
}

export function howManyWounds(weapon, target){
    //Initial number of attacks
    let attaks = weapon.attack;
    console.log(Number(attaks).toFixed(2) + " Attaks");

    //Hit roll
    let hits = hitRoll(attaks, weapon.cc_ct, weapon.special_rules);

    //Wound Roll
    let wounds = woundRoll(hits, weapon.strengh, target.toughness, weapon.special_rules);

    //Roll save
    let scored = saveRoll(wounds, target, weapon.ap, weapon.special_rules);

    //Calculation of the final damage
    let damage = scored*weapon.damage;
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