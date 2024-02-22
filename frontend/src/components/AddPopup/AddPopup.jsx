import React, { useRef, useState } from "react";

import './AddPopup.css';
import Button from "../Button/Button";
import { uploadNewPost } from "../../service/server";

export default function AddPopup({bFn}) {
    const form = useRef();
    const [addData, setAddData] = useState(
        {
            name: '',
            dept: '',
            upImage: '',
            image: '',
            title: '',
            brief: '',
            mail: '',
            phno: '',
            other: '',
            type: ''
        }
    )

    function onTextInputChange(event) {
        setAddData(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    async function onSubmitClick(event) {
        event.preventDefault();
        if(addData.brief.trim() == '' || addData.dept.trim() == '' || addData.mail.trim() == '' || addData.name.trim() == '' || addData.other.trim() == '' || addData.title.trim() == '' || addData.upImage.trim() == '' || addData.type.trim() == '') {
            window.alert('Missing required fields!')
            return;
        }

        if(!form.current) return;

        const newFdata = new FormData();
        newFdata.append('rollno', addData.name)
        newFdata.append('title', addData.title)
        newFdata.append('desc', addData.brief)
        newFdata.append('image', addData.image)
        newFdata.append('dept', addData.dept)
        newFdata.append('mail', addData.mail)
        newFdata.append('phno', addData.phno)
        newFdata.append('other', addData.other)
        newFdata.append('type', addData.type)

        // console.log(newFdata);
        const res = await uploadNewPost(newFdata);
        if(res) {
            bFn()
        }else{
            console.log('Error');
        }
    }

    function onCloseClick(event) {
        setAddData(
            (prev) => {
                return {
                    name: '',
                    dept: '',
                    upImage: '',
                    image: '',
                    title: '',
                    brief: '',
                    mail: '',
                    phno: '',
                    other: '',
                    type: ''
                }
            }
        )
    }

    function onImageSelected(event) {
        setAddData(prev => {
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            return {
                ...prev,
                image: event.target.files[0],
                upImage: imageUrl
            }
        })
    }

    return(
        <div className="add-popup-container noto-sans">

            <form ref={form} onSubmit={onSubmitClick}>
                    <div className="add-container">
                        <div className="add-name">
                            <input onChange={onTextInputChange} name="name" type="text" placeholder="Enter your Roll No" id="name" required/>
                        </div>

                        <div className="add-dept">
                            <select defaultValue={'Dept'} onChange={onTextInputChange} name="dept" id="dept">
                                <option  value="Dept" disabled>Department</option>
                                <option value="aero">AERO</option>
                                <option value="auto">AUTO</option>
                                <option value="bme">BME</option>
                                <option value="BT">BT</option>
                                <option value="CHEM">CHEM</option>
                                <option value="CIVIL">CIVIL</option>
                                <option value="CSE">CSE</option>
                                <option value="CSE (CS)">CSE (CS)</option>
                                <option value="CSBS">CSBS</option>
                                <option value="CSD">CSD</option>
                                <option value="EEE">EEE</option>
                                <option value="ECE">ECE</option>
                                <option value="FT">FT</option>
                                <option value="IT">IT</option>
                                <option value="AIML">AIML</option>
                                <option value="AIDS">AIDS</option>
                                <option value="MECH">MECH</option>
                                <option value="MCT">MCT</option>
                                <option value="RNA">RNA</option>
                                <option value="HS">HS</option>
                                <option value="MS">MS</option>
                            </select>
                        </div>

                        <div className="add-type">
                            <select defaultValue={'type'} onChange={onTextInputChange} name="type" id="dept">
                                <option  value="type" disabled>Type</option>
                                <option value="lost">Lost</option>
                                <option value="found">Found</option>
                            </select>
                        </div>

                        <div className="add image">
                            <input onChange={onImageSelected} type="file" name="upImage" accept="image/*" id="img-ip" />
                            <label htmlFor="img-ip">Select Image</label>
                            {addData.upImage != '' && <div className="image-container">
                                <img src={addData.upImage} alt="User Image" className="uploaded-image" />
                            </div>}
                        </div>

                        <div className="add title">
                            <input required onChange={onTextInputChange} type="text" name="title" placeholder="What had you lost?" id="title" />
                        </div>

                        <div className="add brief">
                            <textarea required onChange={onTextInputChange} type="text" name="brief" placeholder="Where?, When?, How?" id="brief" />
                        </div>

                        <div className="contact-details-container">
                            <p><b>Contact Details</b></p>
                            <input required onChange={onTextInputChange} type="email" name="mail" id="mail" placeholder="Mail ID" />
                            <input onChange={onTextInputChange} type="number" name="phno" placeholder="Whatsapp or Phone No."/>
                            <input required onChange={onTextInputChange} id="ot" type="text" name="other" placeholder="Any other social media" />
                            <label htmlFor="ot">EX: insta - recdevs</label>
                        </div>
                    </div>

                    <div className="add-p-b-ctn">
                        <Button buttonTitle={'UPLOAD'}/>
                        <Button buttonTitle={'CLOSE'} buttonFunction={bFn}/>
                    </div>
                </form>
        </div>
    )
}