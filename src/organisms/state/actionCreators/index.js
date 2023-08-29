export const addItemToCart=()=>{
    return (dispatch)=>{
        dispatch({
            type:"add",
            payload:1
        })
    }
}

export const setState=(value)=>{
    return (dispatch)=>{
        dispatch({
            type:"set",
            payload:value
        })
    }
}
