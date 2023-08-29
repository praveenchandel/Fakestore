const reducer=(state=0,action)=>{
    if(action.type==="add"){
        return state+action.payload;
    }else if(action.type==="set"){
        return action.payload;
    }
    else{
        return state;
    }
}

export default reducer;