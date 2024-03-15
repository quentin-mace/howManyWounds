export function displayOutput(damages){
    const outputDiv = document.querySelector(".result");
    const outputMessage = document.createElement("p");
    outputMessage.innerHTML = `On average, you would inflict <strong>${damages.toFixed(2)}</strong> wounds.`
    outputDiv.innerHTML = ``;
    outputDiv.appendChild(outputMessage);
}