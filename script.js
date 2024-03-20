import { addCheckboxListener, addCalculateButtonListener, addRandomDamageListener } from "./listeners.js";


addCheckboxListener(".invul-cb",".invul-input");
addCheckboxListener(".fnp-cb",".fnp-input");
addCheckboxListener(".has-sushits",".sushits-input");
addCheckboxListener(".torrent",".cc-ct");
addCalculateButtonListener();
addRandomDamageListener();