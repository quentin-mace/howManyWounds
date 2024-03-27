import { calculateAverageDices } from "./maths.js";


function readSpecialRules(){
    let sushitsNumber = document.getElementById("sushits-input").value;
    if(sushitsNumber<1){
        throw new Error(`The sustained hits number cannot be less than 1`);
    }
    const specialRules = {
        sustained_hits: document.getElementById("has-sushits").checked,
        sushits_value: sushitsNumber,
        lethal_hits: document.getElementById("lethits").checked,
        dev_wounds: document.getElementById("devwounds").checked,
        torrent: document.getElementById("torrent").checked,
        twin_linked: document.getElementById("twin-linked").checked
    };
    return specialRules;
}

export function readWeapon(){
    const averageDamage = calculateAverageDices("num-rnd-dmg", "rand-dmg", "damage");
    if(averageDamage<1){
        throw new Error(`The damage value cannot be less than 1`);
    }
    const averageAttacks = calculateAverageDices("num-rnd-atk", "rand-atk", "nb-attacks");
    if(averageAttacks<1){
        throw new Error(`The number of attacks cannot be less than 1`);
    }
    let cc_ct = document.getElementById("cc-ct").value;
    if(cc_ct<2){
        throw new Error(`The CC/CT cannot be better thant 2+`);
    }
    if(cc_ct>6){
        throw new Error(`The CC/CT cannot be worse thant 6+`);
    }
    let strengh = document.getElementById("strengh").value;
    if(strengh<1){
        throw new Error(`The strength cannot be less than 1`);
    }
    let ap = document.getElementById("ap").value;
    if(ap<0){
        throw new Error(`The AP is incorrect`);
    }
    const weapon = {
        attack: averageAttacks,
        cc_ct: cc_ct,
        strengh: strengh,
        ap: ap,
        damage: averageDamage,
        special_rules: readSpecialRules()
    };
    return weapon;
}

export function readTarget(){
    const toughness = document.getElementById("toughness").value;
    if(toughness < 1){
        throw new Error(`The toughness cannot be worse than 1`);
    }
    const save = document.getElementById("save").value;
    if(save < 2){
        throw new Error(`The save cannot be better than 2+`);
    }
    const pv = document.getElementById("pv").value;
    if(pv < 1){
        throw new Error(`The HP value cannot be worse than 1`);
    }
    const invul = document.getElementById("invul");
    if (invul.disabled) {
        invul.value = null;
    }else if(invul.value<2){
        throw new Error(`The Invulnerable save cannot be better than 2+`);
    }else if(invul.value>6){
        throw new Error(`The Invulnerable save cannot be worse than 6+`);
    }
    const fnp = document.getElementById("fnp");
    if (fnp.disabled) {
        fnp.value = null;
    }else if(fnp.value<2){
        throw new Error(`The Feel no Pain cannot be better than 2+`);
    }else if(fnp.value>6){
        throw new Error(`The Feel no Pain save cannot be worse than 6+`);
    }
    const target = {
        toughness: toughness,
        save: save,
        pv: pv,
        invul: invul.value,
        fnp: fnp.value
    };
    return target;
}