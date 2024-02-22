import React from "react";

import './DetailsPopup.css';
import Button from "../Button/Button";

export default function DetailsPopup({fn, data}) {
    return(
        <div className="details-container noto-sans">
            <div className="detail-container">
                <div className="detail name">
                    <b>Roll No.: </b> <span>{data.rollno}</span>
                </div>

                <div className="detail dept">
                    <b>Department: </b> <span>{data.dept}</span>
                </div>

                <div className="detail contact">
                    <b>Contact Details:</b>
                    <p><b>Mail: </b><span>{data.mail}</span></p>
                    <p><b>Phone No.: </b><span>{data.phno}</span></p>
                    <p><b>Other: </b><span>{data.other}</span></p>
                </div>

                {/* <div className="detail-note">
                    <b>Note before contacting:</b>
                    <div className="note">
                        Lorem ipsum dolor sit amet.
                    </div>
                </div> */}
            </div>
            <Button buttonFunction={fn} buttonTitle={'CLOSE'} />
        </div>
    )
}