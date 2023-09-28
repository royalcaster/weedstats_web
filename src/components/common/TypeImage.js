const TypeImage = ({ type, backgroundColor, x }) => {

    const size = x;
   
    switch(type){
        case "joint": 
        return (
        <div style={{backgroundColor: backgroundColor ? backgroundColor : null, height: x, justifyContent: "center", display: "flex", width: x, borderRadius: 15}}>
            <img src={require('../../data/img/joint.png')} alt={type + "-Image"} style={{height: x*0.4, width: x*0.8, alignSelf: "center"}} />
        </div>
        )

        case "bong": 
        return (
        <div style={{backgroundColor: backgroundColor ? backgroundColor : null, height: x, justifyContent: "center", display: "flex", width: x, borderRadius: 15}}>
            <img src={require('../../data/img/bong.png')} alt={type + "-Image"}  style={{height: x*0.8, width: x*0.5, alignSelf: "center"}}/>
        </div>
        )

        case "vape": 
        return (
        <div style={{backgroundColor: backgroundColor ? backgroundColor : null, height: x, justifyContent: "center", display: "flex", width: x, borderRadius: 15}}>
            <img src={require('../../data/img/vape.png')} alt={type + "-Image"}  style={{height: x*0.8, width: x*0.3, alignSelf: "center"}}/>
        </div>
        )

        case "pipe": 
        return (
        <div style={{backgroundColor: backgroundColor ? backgroundColor : null, height: x, justifyContent: "center", display: "flex", width: x, borderRadius: 15}}>
            <img src={require('../../data/img/pipe.png')} alt={type + "-Image"}  style={{height: x*0.5, width: x*0.8, alignSelf: "center"}}/>
        </div>
        )

        case "cookie": 
        return (
        <div style={{backgroundColor: backgroundColor ? backgroundColor : null, height: x, justifyContent: "center", display: "flex", width: x, borderRadius: 15}}>
            <img src={require('../../data/img/cookie.png')} alt={type + "-Image"}  style={{height: x*0.7, width: x*0.8, alignSelf: "center"}}/>
        </div>
        )
        
        default: 
        return (
        <div style={{backgroundColor: backgroundColor ? backgroundColor : null, height: x, justifyContent: "center", display: "flex", width: x, borderRadius: 15}}>
            <img src={require('../../data/img/logo.png')} alt={"Logo-Image"}  style={{height: x-20, width: x-15, alignSelf: "center"}} source={require('../../data/img/logo.png')}/>
        </div>
        )
    }

}

export default TypeImage