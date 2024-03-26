export function displayOutput(killcount){
    const outputDiv = document.querySelector(".result");
    const outputMessage = document.createElement("p");
    outputMessage.innerHTML = `
    On average, you would inflict <strong>${killcount.totalDamage.toFixed(0)}</strong> wounds.
    <br>
    It would kill <strong>${killcount.kills.toFixed(0)}</strong> models
    <br>
    And inflict <strong>${killcount.remainingDmg.toFixed(0)}</strong> more wounds
    `
    outputDiv.innerHTML = ``;
    outputDiv.appendChild(outputMessage);
}