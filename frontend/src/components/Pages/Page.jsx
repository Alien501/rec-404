import React from "react";

import Container from "../Container/Container";

import './Page.css';

export default function Page({card, isLoading}) {
    return(
        <>
            {
                isLoading?
                <div className="load-container">
                Loading...
                </div>:
                <Container cardData={card}/>
            }
        </>
    )   
}