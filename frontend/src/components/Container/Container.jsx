import React, { useLayoutEffect } from "react";

import './Container.css';
import LostCard from "../LostCard/LostCard";

export default function Container({cardData}) {
    useLayoutEffect(() => {
        window.scroll(0,0)
    })
    return(
        <div className="card-o-container">
            {/* <LostCard type={'lost'}/>
            <LostCard type={'found'}/> */}
            {cardData}
        </div>
    )
}