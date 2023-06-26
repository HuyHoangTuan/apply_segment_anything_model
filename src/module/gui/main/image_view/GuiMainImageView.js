import React, {useEffect, useState} from "react";
import {Button, Paper} from "@mui/material";
import "./GuiMainImageView.css";
import {APIManager} from "../../../api/APIManager";
import {API_ENDPOINT, GUI_STATE} from "../../../const/Const";
const GuiMainImageView = () => {
    let [image, setImage] = useState(null);
    let [imageURL, setImageURL] = useState("");
    let [state, setState] = useState(GUI_STATE.DONE);
    
    useEffect(() => {
        switch (state)
        {
            case GUI_STATE.LOADING:
                break;
                
            case GUI_STATE.DONE:
                break;
        }
    }, [state]);
    let handleImage = (e) => {
        if(e.target.files[0] != null) 
        {
            setImage(e.target.files[0]);
            setImageURL(URL.createObjectURL(e.target.files[0]));
        }
    };
    
    let convertToBase64 = (data) => {
        let base64Data = btoa(
            new Uint8Array(data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );
        let _src = `data:image/png;base64,${base64Data}`;
        
        setImageURL(_src);
        
    }
    let handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        let endPoint = API_ENDPOINT.REMOVE_BACKGROUND;
        
        let formData = new FormData();
        formData.append("file", image);
        
        let headers = {
            'Content-Type': 'multipart/form-data',
        }
        
        let responseType = 'arraybuffer'
        
        APIManager.post(endPoint, headers, {}, responseType, formData)
            .then((res) => {
                convertToBase64(res.data);
            })
            .catch((err) => {
               console.log(`POST ${endPoint} errors: ${err}`); 
            });
        setState(GUI_STATE.LOADING)
    };
    
    return(
        <React.Fragment>
            <div className= 'gui'>
                <Paper
                    elevation = {3}
                    className = "image_box"
                >
                    {
                        imageURL && <img
                            src={imageURL}
                            alt={'image'}
                            style = {
                                {
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    marginLeft: "auto",
                                    marginRight: "auto"
                                }
                            }
                        />
                    }
                </Paper>
                
                <Paper
                    elevation = {3}
                    className = "tool_box"
                >
                    <form
                        style = {
                            {
                                width: "50%",
                                position: "absolute",
                                left: "50%",
                                bottom: "60px",
                                transform: "translateX(-50%)",
                            }
                        }
                    >
                        <input
                            style = {
                                {
                                    width: "100%",
                                }
                            }
                            type = "file"
                            accept = "image/*"
                            onChange = {handleImage}
                        />
                    </form>
                    <Button
                        variant = "contained"
                        style = {
                            {
                                position: "absolute",
                                left: "50%",
                                bottom: "10px",
                                transform: "translateX(-50%)",
                            }
                        }
                        onClick = {handleSubmit}
                    >
                        PROCESS
                    </Button>
                </Paper>
            </div>
            
        </React.Fragment>
    );
}

export default  GuiMainImageView;