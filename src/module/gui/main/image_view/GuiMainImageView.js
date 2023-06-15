import React, {useEffect, useState} from "react";
import {Button, Paper} from "@mui/material";
import "./GuiMainImageView.css";
import {InferenceSession} from "onnxruntime-web";

const GuiMainImageView = () => {
    let [imageUrl, setImageUrl] = useState("");
    let [model, setModel] = useState(null);
    
    useEffect(() => {
        const _initModel = async () => {
            try {
                if(process.env.REACT_APP_MODEL_PATH == null) return;
                // console.log('test1: '+process.env.REACT_APP_MODEL_PATH);
                const new_model = await InferenceSession.create(String(process.env.REACT_APP_MODEL_PATH));
                setModel(new_model);
            } catch (e)
            {
                console.log("Error load model: " + e);
            }
            
            
        }
        _initModel();
        
    }, []);
    let handleImage = (e) => {
        setImageUrl(URL.createObjectURL(e.target.files[0]));
    };
    
    let handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
    };
    
    return(
        <React.Fragment>
            <div className= 'gui'>
                <Paper
                    elevation = {3}
                    className = "image_box"
                >
                    {
                        imageUrl && <img
                            src={imageUrl}
                            style = {
                                {
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
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
                        Upload
                    </Button>
                </Paper>
            </div>
            
        </React.Fragment>
    );
}

export default  GuiMainImageView;