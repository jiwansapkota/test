import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import LineChart from './LineChart'





function App() {
  const [choice, setchoice] = useState("NABIL");
  const [data, setdata] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [tickerlist, settickerlist] = useState("");
  const [lable, setlable] = useState("");

//componentDidMount from useEffect
  useEffect(() => {
    // var payload={
    //   "Ticker":choice
    // }
    console.log("fetch clicked");
    axios.get("http://localhost:5000/getallticker").then(function (response) {
      // handle success
      console.log("Here are rows");
      console.log(response.data.rows);
      var tempdata = JSON.parse(response.data.rows)
      console.log(tempdata)
     var names = tempdata.map(function (a) { return a.Ticker; });
     console.log("here are names");
     console.log(names);
     settickerlist(names);
console.log("here are ticker lists_________________")
     console.log(tickerlist);
    })
    var payload={
      "Ticker":choice
    }
    axios.post("http://localhost:5000/gettickerdata",payload).then(function (response) {
      // handle success
      console.log("Here are initaial rows");
      console.log(response.data.rows);
      var tempdata = JSON.parse(response.data.rows)
      console.log(tempdata)
      var Income = tempdata.map(function (a) { return a.Income; });
      var date = tempdata.map(function (a) { return a.Date; });
      setdata(Income.reverse());
      console.log("incomes---------");
      console.log(Income);
      console.log(date);
      setlable(date.reverse());
      setShowChart(true);
    })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        console.log(data)
        console.log(showChart);
      });

  }, []
  );

  const onOptionChangeHandler = (event) => {
    console.log("onchangeHandler called");
    setchoice(event.target.value);
    event.preventDefault();
    var payload={
      "Ticker":choice
    }
    axios.post("http://localhost:5000/gettickerdata",payload).then(function (response) {
      // handle success
      console.log("Here are initaial rows");
      console.log(response.data.rows);
      var tempdata = JSON.parse(response.data.rows)
      console.log(tempdata)
      var Income = tempdata.map(function (a) { return a.Income; });
      var date = tempdata.map(function (a) { return a.Date; });
      setdata(Income.reverse());
      console.log("incomes---------");
      console.log(Income);
      console.log(date);
      setlable(date.reverse());
      setShowChart(true);
    })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        console.log(data)
        console.log(showChart);
      });


  }

  const renderOptions=()=>{
    console.log("render option called");
    tickerlist.forEach(element => {
      return <option value={element}>{element}</option>
    });
  }

 
  return (
    <div className="App">
      <LineChart data={data} lable={lable} />
      <div style={{ margin: "10 auto 10 auto" }}>
        <label>
          Pick Ticker your choice:
          <select value={choice} onChange={onOptionChangeHandler}>
           {renderOptions}
          </select>
        </label>
      </div>
    </div>
  );
}

export default App;
