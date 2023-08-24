//React
import React from "react";
import { useState, useEffect, useRef, useContext} from "react";

//Custom Components
import History from "./History/History";
import Levels from "../../../../data/Levels.json";
import DailyAveragePanel from "./DailyAveragePanel/DailyAveragePanel";
import StatsCard from './StatsCard/StatsCard'
import Donation from "../../Main/Donation/Donation";


//Service
import { calcDailyAverage, filterByType, filterByMostRecent, getEntryDates, getBreakDates, createLineChartData, createBarChartData, calcStreak } from "../../../../data/Service";
import StreakPanel from "./StreakPanel/StreakPanel";
import BreakPanel from "./BreakPanel/BreakPanel";
import { LanguageContext } from "../../../../data/LanguageContext";
import SelectorBar from "../../../common/SelectorBar";

const StatsDashboard = ({ localData, onRefresh }) => {

  //Context
  const language = useContext(LanguageContext);
  
  //State
  const [selectedType, setSelectedType] = useState("main");
  const [selectedTime, setSelectedTime] = useState(0);
  const [streakData, setStreakData] = useState(calcStreak(localData));
  const [showHistory, setShowHistory] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    
  },[selectedType]);
  
  const options_type = [
    { label: language.stats_all, value: 0 },
    { label: language.joint, value: 1 },
    { label: language.bong, value: 2 },
    { label: language.vape, value: 3 },
    { label: language.pipe, value: 4 },
    { label: language.cookie, value: 5 },
  ];

  const options_time = [
    { label: language.stats_all, value: 6 },
    { label: language.stats_week, value: 7 },
    { label: language.stats_month, value: 8 },
    { label: language.stats_year, value: 9 },
  ];

  const toggleSelection = (index) => {
    switch (index) {
      case 0:
        setSelectedType("main");
        break;
      case 1:
        setSelectedType("joint");
        break;
      case 2:
        setSelectedType("bong");
        break;
      case 3:
        setSelectedType("vape");
        break;
      case 4:
        setSelectedType("pipe");
        break;
      case 5:
        setSelectedType("cookie");
        break;
      case 6:
        setSelectedTime(0);
        break;
      case 7:
        setSelectedTime(7);
        break;
      case 8:
        setSelectedTime(30);
        break;
      case 9:
        setSelectedTime(365);
        break;
    }
  };

  return (
    <>

    {showHistory ? <History show={showHistory} onExit={() => setShowHistory(false)} history={localData}/> : null}
    {showDonation ? <Donation onexit={() => setShowDonation(false)}/> : null}

    <div style={styles.container}>
      <div style={{ opacity: 1, alignItems: "center"}}>
        <div style={{ height: 50 }}></div>
        <div style={{flexDirection: "row", width: "100%", alignItems: "center"}}>
        <p style={styles.bold_heading}>{language.stats_overview}</p>
        <div style={{flexDirection: "row",right: 10, top: -5, position: "absolute"}}>
        <div onClick={() => setShowDonation(true)}
            >
              <div style={{height: 50, backgroundColor: "#1E2132", width: 50 }}>
                {/* <EvilIcons
                  name="clock"
                  style={{
                    color: "#F2338C",
                    fontSize: 30,
                    height: "100%",
                    textAlignVertical: "center",
                    alignSelf: "center"
                  }}
                /> */}
              </div>
            </div>
            </div>
        </div>
        <div style={{ height: 20 }}></div>

        

        <div style={{ width: "90%"}}>
          
        <SelectorBar options={options_type} onPress={(value) => toggleSelection(value)} selectedType={selectedType}/>

        </div>

        <div style={{ height: 30 }}></div>

        <div style={{ alignItems: "center", flex: 1, width: "90%" }}>

          <DailyAveragePanel 
            selectedType={selectedType} 
            /* value={Math.round(calcDailyAverage(filterByType(localData, selectedType), localData) * 100) / 100} */
            value={Math.round(calcDailyAverage(filterByType(localData, selectedType), localData) * 100) / 100}
          />

          {selectedType === "main" ? (
            {/* <PieChart data={[
                {
                  name: language.joint,
                  count: filterByMostRecent(
                    filterByType(localData, "joint"),
                    selectedTime
                  ).length,
                  color: Levels[0].colors[0],
                  legendFontColor: "white",
                  legendFontSize: responsiveFontSize(1.5)
                },
                {
                  name: language.bong,
                  count: filterByMostRecent(
                    filterByType(localData, "bong"),
                    selectedTime
                  ).length,
                  color: Levels[1].colors[0],
                  legendFontColor: "white",
                  legendFontSize: responsiveFontSize(1.5)
                },
                {
                  name: language.vape,
                  count: filterByMostRecent(
                    filterByType(localData, "vape"),
                    selectedTime
                  ).length,
                  color: Levels[2].colors[0],
                  legendFontColor: "white",
                  legendFontSize: responsiveFontSize(1.5)
                },
                {
                  name: language.pipe,
                  count: filterByMostRecent(
                    filterByType(localData, "pipe"),
                    selectedTime
                  ).length,
                  color: Levels[3].colors[0],
                  legendFontColor: "white",
                  legendFontSize: responsiveFontSize(1.5)
                },
                {
                  name: language.cookie,
                  count: filterByMostRecent(
                    filterByType(localData, "cookie"),
                    selectedTime
                  ).length,
                  color: Levels[4].colors[0],
                  legendFontColor: "white",
                  legendFontSize: responsiveFontSize(1.5)
                },
              ]}
              width={Dimensions.get("window").width - 40}
              height={150}
              backgroundColor={"#1E2132"}
              chartConfig={{
                color: () =>  {return "rgba(255,255,255,0.35)"},
                labelColor: () =>  {return "rgba(255,255,255,0.5)"}
              }}
              accessor={"count"}
              paddingLeft={"15"}

            /> */}
          ) : null}

          <div style={{ height: "2rem" }}></div>
          
          <div
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between"
            }}
          >
            <StatsCard title={"Ø " + language.stats_week} value={Math.round(
                  calcDailyAverage(filterByType(localData, selectedType), localData) *
                    7 *
                    10
                ) / 10}
            />

            <StatsCard title={"Ø " + language.stats_month} value={Math.round(
                  calcDailyAverage(filterByType(localData, selectedType), localData) *
                    30.5 *
                    10
                ) / 10}
            />

            <StatsCard title={"Ø " + language.stats_year} value={Math.round(
                  calcDailyAverage(filterByType(localData, selectedType), localData) * 365
                )}
            />
          </div>

          <div style={{height: "2rem"}}></div>

          <div style={{width: "100%"}}>

          <p style={styles.card_label2}>
            {selectedType === "main" ? language.activities : null}
            {selectedType === "joint" ? language.joint : null}
            {selectedType === "bong" ? language.bong : null}
            {selectedType === "vape" ? language.vape : null}
            {selectedType === "pipe" ? language.pipe : null}
            {selectedType === "cookie" ? language.cookie : null} {language.in_the_last}
          </p>
          <div
            style={{
              flexDirection: "row",
              width: "100%",
              flex: 1,
              justifyContent: "space-evenly"
            }}
          >
            <div>
              <p
                style={styles.card_label}>
                {language.stats_24h}
              </p>
              <p style={styles.card_value}>
                {
                  filterByMostRecent(filterByType(localData, selectedType), 1)
                    .length
                }
              </p>
            </div>
            <div>
              <p style={styles.card_label}>
                {language.stats_7d}
              </p>
              <p
                style={[
                  styles.card_value,
                  {
                    borderTopColor: "#0080FF",
                    borderTopWidth: 2,
                    paddingRight: 10,
                    paddingLeft: 10,
                    marginTop: 0,
                    textAlign: "center"
                  },
                ]}
              >
                {
                  filterByMostRecent(filterByType(localData, selectedType), 7)
                    .length
                }
              </p>
            </div>
            <div>
              <p
                style={[
                  styles.card_label,
                  { marginTop: 0, textAlign: "center" },
                ]}
              >
                {language.stats_30d}
              </p>
              <p style={styles.card_value2}>
                {
                  filterByMostRecent(filterByType(localData, selectedType), 30)
                    .length
                }
              </p>
            </div>
          </div>

          </div>

          <div style={{height: "1rem"}}></div>
          
          
          {/* {selectedType === "main" ? (
            <>
              <StreakPanel
                streakData={streakData}
                currentStreak={streakData.currentStreak}
                currentStreakStart={streakData.within ? streakData.startCurrent: null}
                longestStreak={streakData.longestStreak}
                longestStreakStart={toGermanDate(streakData.rangeLongest.start)}
                longestStreakEnd={toGermanDate(streakData.rangeLongest.end)}
              />

              <div style={{ height: 10 }}></div>

              <BreakPanel
                streakData={streakData}
                currentBreak={streakData.currentBreak}
                currentBreakStart={streakData.startCurrentBreak}
                longestBreak={streakData.longestBreak}
                longestBreakStart={streakData.rangeLongestBreak == null ? null : toGermanDate(streakData.rangeLongestBreak.start)}
                longestBreakEnd={streakData.rangeLongestBreak == null ? null : toGermanDate(streakData.rangeLongestBreak.end)}
                activeLastDay={filterByMostRecent(filterByType(localData, selectedType), 1).length > 0}
              />
            </>
          ) : null} */}

          <div style={{ height: 30 }}></div>

          <SelectorBar options={options_time} onPress={(value) => toggleSelection(value)} selectedType={selectedTime}/>

          <div style={{ height: 20 }}></div>

           {/* <LineChart
            style={{
              marginVertical: 10,
              borderRadius: 10,
              transform: [{translateX: -responsiveWidth(5)}]
            }}
            data={{
              labels: createLineChartData(
                filterByMostRecent(
                  filterByType(localData, selectedType),
                  selectedTime
                ),
                7
              )[0],
              datasets: [
                {
                  data: createLineChartData(
                    filterByMostRecent(
                      filterByType(localData, selectedType),
                      selectedTime
                    ),
                    7
                  )[1],
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={350}
            yAxisInterval={1} // optional, defaults to 1
            verticalLabelRotation={Dimensions.get("screen").width < 300 ? 20 : 0}
            chartConfig={{
              backgroundGradientFrom: "#1E2132",
              backgroundGradientTo: "#1E2132",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: () =>  {return "rgba(255,255,255,0.5)"},
              labelColor: () =>  {return "rgba(255,255,255,0.5)"},
              propsForLabels: {
                fontSize: 8
              },
              propsForDots: {
                r: "1",
                strokeWidth: "5",
                stroke: "#0080FF",
              },
              
            }}
            bezier
          /> */}

          {/* <BarChart
            style={{
              marginVertical: 10
            }}
            data={{
              labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
              datasets: [
                {
                  data: createBarChartData(
                    filterByMostRecent(
                      filterByType(localData, selectedType),
                      selectedTime
                    )
                  ),
                },
              ],
            }}
            width={Dimensions.get("window").width - 40}
            height={250}
            chartConfig={{
              backgroundGradientFrom: "#1E2132",
              backgroundGradientTo: "#1E2132",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: () =>  {return "rgba(255,255,255,0.35)"},
              labelColor: () =>  {return "rgba(255,255,255,0.5)"},
            }}
          /> */}

        </div> 
      </div>
      <div style={{height: "5rem"}}></div>
    </div>
    </>
  );
};

export default StatsDashboard;

const styles = {
  container: {
    backgroundColor: "#1E2132",
    width: "100%",
  },
  heading: {
    fontFamily: "PoppinsBlack",
    color: "#c4c4c4",
    fontSize: 20,
    marginLeft: 10,
  },
  card_label: {
    color: "white",
    fontFamily: "PoppinsLight",
    fontSize: 14,
    marginTop: 5,
    textAlign: "left",
    marginTop: 0, 
    textAlign: "center" 
  },
  card_label2: {
    color: "white",
    fontFamily: "PoppinsLight",
    fontSize: 14,
    marginTop: 5,
    textAlign: "left",
    marginTop: 0, 
    textAlign: "center",
    alignSelf: "center", 
    fontSize: "1rem", 
    color: "white", 
    fontFamily: "Poppins", 
    marginBottom: 10
  },
  card_value: {
    color: "white",
    fontFamily: "PoppinsBlack",
    fontSize: 30,
    marginTop: -10,
    textAlign: "left",
  },
  card_value2: {
    color: "white",
    fontFamily: "PoppinsBlack",
    fontSize: 30,
    marginTop: -10,
    textAlign: "left",
    borderTopColor: "#0080FF",
    borderTopWidth: 2,
    paddingRight: 10,
    paddingLeft: 10,
    marginTop: 0,
    textAlign: "center"
  },
  switch_item: {
    backgroundColor: "#171717",
    margin: 3,
    padding: 3,
    paddingLeft: 20,
    paddingRight: 20,
    paddingRight: 20,
    borderRadius: 20,
    flex: 1,
    paddingTop: 5,
    borderColor: "#171717",
    borderWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
  },
  bold_heading: {
    color: "white",
    fontFamily: "PoppinsBlack",
    fontSize: "2rem",
    marginLeft: "2rem"
  }
};
