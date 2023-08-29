import React from "react";
import typeMapping from "../atoms/typoFactory";

function Typography(props){
    const element = React.createElement(
        typeMapping[props.type],{
            className:props.classes,
            onClick:()=>props.onClick(),
            onChange:()=>props.onChange()
        },
        props.text
    )
    return element;
}

Typography.defaultProps={
    type:'h6',
    text:'',
    classes:'',
    onClick:()=>{},
    onChange:()=>{}
}

export default Typography;