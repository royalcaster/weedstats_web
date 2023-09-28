//React
import React, { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "../../../data/UserContext";

//Custom Components
import StatsDashboard from "./StatsDashboard/StatsDashboard";
import CustomLoader from "../.././common/CustomLoader";
import Button from "../../common/Button";

//Service
import { getLocalData } from "./../../../data/Service";
import Empty from "../../common/Empty";
import { LanguageContext } from "../../../data/LanguageContext";

const Stats = () => {

  //Context
  const user = useContext(UserContext);
  const language = useContext(LanguageContext)

  //State
  const [localData, setLocalData] = useState(["test1", "test2", "test3"]);
  const [localDataLoaded, setLocalDataLoaded] = useState(false);

  useEffect( () => { 
    loadData();
    setLocalDataLoaded(true);
  }, []);

  const loadData = async () => {
    setLocalDataLoaded(false);
    /* setLocalData(await getLocalData(user, () => setLocalDataLoaded(true))); */
  }

  // Zum Löschen einzelner Daten aus der History. Erstmal entfernt, da die Konsistenz der Daten nach aktuellem Stand darunter leidet
  const deleteEntry = async (delEntry) => {
    console.log("Die Lösch-Funktion wurde temporär deaktiviert, bis ein sicheres Verfahren gefunden wurde.");
    /* try {
      console.log(delEntry.number);
      await AsyncStorage.removeItem(user.id + "_entry_" + delEntry.number);
      setLocalData(
        localData.filter((entry) => entry.number != delEntry.number)
      );
      if (delEntry.number == user.main_counter) {
        await deleteEntryGlobally(
          delEntry.type,
          localData[user.main_counter - 1]
        );
      } else {
        await deleteEntryGlobally(delEntry.type);
      }
    } catch (e) {
      console.log("Error:", e);
    } */
  };

  return (
    <div style={styles.container}>

      {
        !localDataLoaded ? <CustomLoader x={50} color={"#484F78"}/> : 
        <>
          {
            !localData ? <div style={{height: "100%"}}><Empty title={language.short == "de" ? "Noch keine Einträge" : "No entries yet"} tip={language.short == "de" ? "Mache Einträge, um Statistiken zu sehen" : "Smoke something to see statistics"}/><Button title={language.short == "de" ? "Aktualisieren" : "Refresh"} color={"#484F78"} fontColor={"white"} hovercolor={"rgba(255,255,255,0.25)"} onPress={() => loadData()}/></div>
            : <StatsDashboard localData={localData} onRefresh={() => loadData()}/>
          }
        </>
      }

    </div>
  );
};

export default Stats;

const styles = {
  container: {
    width: "100%",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#1E2132"
  }
};
