import React, { useEffect, useState } from "react";

import './LostCard.css';
import Button from "../Button/Button";
import Overlay from "../Overlay/Overlay";
import DetailsPopup from "../DetailsPopup/DetailsPopup";
import { deletePost } from "../../service/server";

export default function LostCard({cardData, isProfile}) {
    const [detailClicked, setDetailClicked] = useState(false);

    function onDetailClick() {
        setDetailClicked(prev => !prev);
    }

    function onDeleteClick(event) {
        deletePost(JSON.stringify(cardData));
    }

    return(
        <>
        {
            cardData.type == 'lost'?
                <div className="card-container noto-sans card-lost">
                    <div className="card-image-container">
                        <img src={cardData.image} alt="Hello" className="card-image" />
                        <div className="card-type">
                            <span>
                                LOST
                            </span>
                        </div>
                    </div>

                    <div className="card-title-container">
                        {cardData.title}                 
                    </div>

                    <div className="card-day-container">               
                        {cardData.postDate && (Math.round((Date.now() - cardData.postDate)/3600000) <= 0) ? 'Few moments ago': `${Math.round((Date.now() - cardData.postDate)/3600000)} Hours Ago`}
                    </div>

                    <div className="card-brief-container">
                        {cardData.desc}                
                    </div>

                    {!isProfile? <Button buttonFunction={onDetailClick} buttonTitle={'Contact Details'}/> : <Button buttonFunction={onDeleteClick} buttonTitle={'Delete'} />}
                </div>
            :
            <div className="card-container noto-sans card-found">
                <div className="card-image-container">
                    <img src={cardData.image} alt="Hello" className="card-image" />
                    <div className="card-type">
                        <span>
                            FOUND
                        </span>
                    </div>
                </div>

                <div className="card-title-container">
                    {cardData.title}
                </div>

                <div className="card-day-container">
                    {cardData.postDate && (Math.round((Date.now() - cardData.postDate)/3600000) <= 0) ? 'Few moments ago': `${Math.round((Date.now() - cardData.postDate)/3600000)} Hours Ago`}
                </div>

                <div className="card-brief-container">
                    {cardData.desc}
                </div>

                {!isProfile? <Button buttonFunction={onDetailClick} buttonTitle={'Contact Details'}/> : <Button buttonFunction={onDeleteClick} buttonTitle={'Delete'} />}

            </div>
        }
        {
            detailClicked && <>
                <Overlay />
                <DetailsPopup data={cardData} fn={onDetailClick} />                
            </>
        }
        </>
    )
}