class Cloner {
  static _cloneObject(obj){
    let ret={};
    Object.entries(obj).forEach((entry) => {
      ret[entry[0]]=Cloner.clone(entry[1]);
    });
    return(ret);
  }
  static _cloneArray(ar){
    let ret=[];
    for(let i=0;i<ar.length;i++){
      ret[i]=Cloner.clone(ar[i]);
    };
    return(ret);
  }
  static clone(mixed){
    if(Array.isArray(mixed))return(Cloner._cloneArray(mixed));
    else if(typeof mixed === "object")return(Cloner._cloneObject(mixed));
    else return(mixed);
  }
}
export default Cloner;
