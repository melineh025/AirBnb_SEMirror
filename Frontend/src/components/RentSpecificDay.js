import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Moment from "react-moment";
import ListGroup from "react-bootstrap/ListGroup";
import Loading from "./Loading";
import "bootstrap/dist/css/bootstrap.css";

function RentSpecificDay() {
  const [date, setDate] = useState();
  const [info, setInfo] = useState(null);

  console.log("Hello Analysis1");

  const ShowDetails = ({ date }) => {
    if (info == null) {
      return <></>;
    }
    if (info == "getting") {
      return (
        <div>
          <h4 style={{ marginTop: 30, marginbottom: 10 }}>
            Rent information for <Moment format="YYYY/MM/DD">{date}</Moment>:
          </h4>
          <Loading />
        </div>
      );
    } else {
      return (
        <div style={{ display: "block", width: "50%" }}>
          <h4 style={{ marginTop: 30, marginbottom: 10 }}>
            Rent information for <Moment format="YYYY/MM/DD">{date}</Moment>:
          </h4>
          <ListGroup>
            <ListGroup.Item>
              Average Rent: ${Math.round(info.averageRent * 100) / 100}
            </ListGroup.Item>
            <ListGroup.Item>
              Maximum Rent: ${Math.round(info.maxRent * 100) / 100}
            </ListGroup.Item>
            <ListGroup.Item>
              Minimum rent: ${Math.round(info.minRent * 100) / 100}
            </ListGroup.Item>
          </ListGroup>
        </div>
      );
    }
  };

  const updateDate = (e) => {
    //current date is used for the api call
    var currentDate =
      e.getFullYear() +
      "-" +
      (e.getMonth() + 1).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      "-" +
      e.getDate().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

    setDate(e); //the state date variable is for the UI part

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: currentDate }),
    };

    console.log(currentDate);
    setInfo("getting");
    fetch(
      "http://127.0.0.1:8000/dataAnalytics/rentSpecificDay/",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setInfo(data);
      });
  };
  return (
    <div
      style={{
        marginTop: 40,
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Calendar onChange={updateDate} value={date} />

      <ShowDetails date={date} />
    </div>
  );
}

export default RentSpecificDay;
