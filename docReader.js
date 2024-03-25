import { calculateAverageDices } from "./maths.js";


function readSpecialRules(){
    const specialRules = {
        sustained_hits: document.getElementById("has-sushits").checked,
        sushits_value: document.getElementById("sushits-input").value,
        lethal_hits: document.getElementById("lethits").checked,
        dev_wounds: document.getElementById("devwounds").checked,
        torrent: document.getElementById("torrent").checked,
        twin_linked: document.getElementById("twin-linked").checked
    };
    return specialRules;
}

export function readWeapon(){
    const averageDamage = calculateAverageDices("num-rnd-dmg", "rand-dmg", "damage");
    const averageAttacks = calculateAverageDices("num-rnd-atk", "rand-atk", "nb-attacks");
    const weapon = {
        attack: averageAttacks,
        cc_ct: document.getElementById("cc-ct").value,
        strengh: document.getElementById("strengh").value,
        ap: document.getElementById("ap").value,
        damage: averageDamage,
        special_rules: readSpecialRules()
    };
    return weapon;
}

export function readTarget(){
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
        pv: document.getElementById("pv").value,
        invul: invul.value,
        fnp: fnp.value
    };
    return target;
}