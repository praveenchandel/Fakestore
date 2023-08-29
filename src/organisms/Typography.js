import React from 'react'
import '../../App.css'

function factory(type,text,classes){

    const textType={
        "h1":<h1> </h1>,
        "h2":<h2 className={classes}>{text}</h2>,
        "h3":<h3 className={classes}>{text}</h3>,
        "h4":<h4 className={classes}>{text}</h4>,
        "h5":<h5 className={classes}>{text}</h5>,
        "h6":<h6 className={classes}>{text}</h6>,
    }
    return textType[type];
}

export const Typography = (props) => {

    let item=factory(props.type,props.text,props.classes);
   // const text=document.createTextNode(props.text);
   // item.appendChild(document.createTextNode(props.text));

    

  return (
  <>{item}</>
  )
}

Typography.defaultProps = {
    type: "h6",
    text: "",
    classes: ""
  }

//   "h1":<h1 className={classes}>{text}</h1>,
//         "h2":<h2 className={classes}>{text}</h2>,
//         "h3":<h3 className={classes}>{text}</h3>,
//         "h4":<h4 className={classes}>{text}</h4>,
//         "h5":<h5 className={classes}>{text}</h5>,
//         "h6":<h6 className={classes}>{text}</h6>,