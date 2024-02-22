import React from "react";

import './Button.css';

export default function Button({buttonTitle, buttonFunction}) {
    return(
        <button onClick={buttonFunction} className="button lilita-one-regular">
            {buttonTitle}
        </button>
    )
}