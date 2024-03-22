import { addCheckboxListener, addCalculateButtonListener, addRandomDiceListener } from "./listeners.js";


addCheckboxListener(".invul-cb",".invul-input");
addCheckboxListener(".fnp-cb",".fnp-input");
addCheckboxListener(".has-sushits",".sushits-input");
addCheckboxListener(".torrent",".cc-ct");

addRandomDiceListener("num-rnd-atk", "rand-atk");
addRandomDiceListener("num-rnd-dmg", "rand-dmg");

addCalculateButtonListener();