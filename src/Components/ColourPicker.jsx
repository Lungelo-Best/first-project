import React, {useState} from "react";

function ColourPicker() {

    const [colour,setColour] = useState("#ffffff");


    return(<div className="colour-display">
        <p>Selected colour: {colour}</p>
        <label>Select Colour: </label>
        <input type="colour"/>
    </div>);
}

export default ColourPicker