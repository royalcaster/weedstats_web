//React
import { useContext, useEffect } from 'react';

//Style
import '../../About.css'
import Button from '../../../common/Button';
import { useNavigate } from 'react-router-dom';
import { shadeColor } from '../../../../data/Service';
import { UserContext } from '../../../../data/UserContext';

const HeroShot = ({ language }) => {

  //Hooks
  const navigate = useNavigate();

  //Context
  const user = useContext(UserContext);

  useEffect(() => {
   
  },[]);

  return (
    <div className='content_container' style={{padding: "0px"}}>
        <div className='heroshot_gif_container' style={{padding: "20px", height: "100vh", display: "flex"}}>

        <div className='heroshot_smartphone_container'>
            <img className='heroshot_smartphone_img' src={require("../../img/smartphone.png")} />
        </div>

        <div style={{flex: 1, display: "flex", flexDirection: "column"}}>

        <div style={{flex: 2, display: "flex", alignItems: "center", padding: "20px", textAlign: "center", flexDirection: "column"}}>
            {language.short === "de" ? 
            <p className='heroshot_heading'>Das Werkzeug zum
            <span style={{fontSize: "2.5rem", color: "#26FF72"}}> Erfassen,</span>
            <span style={{fontSize: "2.5rem", color: "#FFBB24"}}> Auswerten </span>&
            <span style={{fontSize: "2.5rem", color: "#FC2044"}}> Teilen </span>
            deines Konsums</p>
            : 
            <p className='heroshot_heading'>The tool for 
            <span style={{fontSize: "2.5rem", color: "#26FF72"}}> Tracking,</span>
            <span style={{fontSize: "2.5rem", color: "#FFBB24"}}> Evaluating </span>& 
            <span style={{fontSize: "2.5rem", color: "#FC2044"}}> Sharing </span> 
            your consumption</p>}

            {user ? <Button
                        title={"Zur App"}
                        onPress={() => navigate("/home/counter")}
                        borderradius={10}
                        color={"#131520"}
                        fontColor={"#409FFF"}
                        borderColor={"#409FFF"}
                        hovercolor={shadeColor("#131520",-25)}
                      /> : <><Button title={language.get_started} onPress={() => navigate("/create")} borderradius={10} color={"#409FFF"} fontColor={"white"} hovercolor={shadeColor("#409FFF", -25)}/>
            <div style={{height: 10}}></div>
            <Button title={language.sign_in} onPress={() => navigate("/login")} borderradius={10} color={"#484F78"} fontColor={"white"} hovercolor={shadeColor("#484F78", -25)}/></>}
        </div>

        

        </div>

        </div>
    </div>
  );
}

export default HeroShot;
