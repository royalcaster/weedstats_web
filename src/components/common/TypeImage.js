import react from 'react'

//CSS
import './TypeImage.css'

const TypeImage = ({ type, backgroundColor, x }) => {

    const size = x;
   
    switch(type){
        case "joint": 
        return (
        <div className='container' style={{backgroundColor: backgroundColor ? backgroundColor : null, height: x, justifyContent: "center", display: "flex"}}>
            <img src={require('../../data/img/joint.png')} alt={type + "-Image"} style={{height: x*0.5, width: x*0.9, alignSelf: "center"}} />
        </div>
        )
        break;

        case "bong": 
        return (
        <div className='container' style={{backgroundColor: backgroundColor ? backgroundColor : null, height: x, justifyContent: "center", display: "flex"}}>
            <img src={require('../../data/img/bong.png')} alt={type + "-Image"}  style={{height: x*1.1, width: x*0.5, alignSelf: "center"}}/>
        </div>
        )
        break;

        case "vape": 
        return (
        <div className='container' style={{backgroundColor: backgroundColor ? backgroundColor : null, height: x, justifyContent: "center", display: "flex"}}>
            <img src={require('../../data/img/vape.png')} alt={type + "-Image"}  style={{height: x*1.1, width: x*0.4, alignSelf: "center"}}/>
        </div>
        )
        break;

        case "pipe": 
        return (
        <div className='container' style={{backgroundColor: backgroundColor ? backgroundColor : null, height: x, justifyContent: "center", display: "flex"}}>
            <img src={require('../../data/img/pipe.png')} alt={type + "-Image"}  style={{height: x*0.5, width: x*0.9, alignSelf: "center"}}/>
        </div>
        )
        break;

        case "cookie": 
        return (
        <div className='container' style={{backgroundColor: backgroundColor ? backgroundColor : null, height: x, justifyContent: "center", display: "flex"}}>
            <img src={require('../../data/img/cookie.png')} alt={type + "-Image"}  style={{height: x*0.8, width: x*0.9, alignSelf: "center"}}/>
        </div>
        )
        break;
        
        default: 
        return (
        <div className='container' style={{backgroundColor: backgroundColor ? backgroundColor : null, height: x, justifyContent: "center", display: "flex"}}>
            <img src={require('../../data/img/logo.png')} alt={"Logo-Image"}  style={[{height: x-10, width: x-15, alignSelf: "center"}]} source={require('../../data/img/logo.png')}/>
        </div>
        )
    }

}

export default TypeImage