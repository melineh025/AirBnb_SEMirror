import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Loading from "./Loading";

export default function HolidayPricing() {
  const [currentHoliday, setCurrentHoliday] = useState("");
  const [currentHolidayPricing, setCurrentHolidayPricing] = useState(0);
  const [currentHolidayDates, setCurrentHolidayDates] = useState("");
  const [loading, setLoading] = useState("nothing");

  const ChristmasDetails = () => {
    console.log("Christmas");
    setLoading(true);
    setCurrentHoliday("Christmas Holidays");

    fetch("http://127.0.0.1:8000/dataAnalytics/xmasRent/")
      .then((response) => response.json())
      .then((data) => {
        setCurrentHolidayPricing(data["christmas"]);
        setCurrentHolidayDates("12/18 to 12/31");
        setLoading(false);
        console.log(data);
      });
  };
  const SummmerDetails = () => {
    console.log("Summer");
    setCurrentHoliday("Summer Holidays");

    setLoading(true);
    fetch("http://127.0.0.1:8000/dataAnalytics/summerRent/")
      .then((response) => response.json())
      .then((data) => {
        setCurrentHolidayPricing(data["summer"]);
        setCurrentHolidayDates("June to Sept");
        setLoading(false);
        console.log(data);
      });
  };

  const EasterDetails = () => {
    console.log("Easter");
    setCurrentHoliday("Easter Holidays");

    setLoading(true);
    fetch("http://127.0.0.1:8000/dataAnalytics/easterRent/")
      .then((response) => response.json())
      .then((data) => {
        setCurrentHolidayPricing(data["easter"]);
        setCurrentHolidayDates("4/1 to 4/18");
        setLoading(false);
        console.log(data);
      });
  };

  const SeasonDetails = () => {
    if (loading == "nothing") {
      return <></>;
    } else if (loading) {
      return (
        <div style={{ marginTop: 20 }}>
          <h3>{currentHoliday}</h3>
          <Loading />
        </div>
      );
    } else {
      return (
        <div style={{ marginTop: 20 }}>
          <h3>{currentHoliday}</h3>
          <h5>Dates: {currentHolidayDates}</h5>
          <h5>
            Average price in the holiday: $
            {Math.round(currentHolidayPricing * 100) / 100}
          </h5>
        </div>
      );
    }
  };
  return (
    <div style={{ marginTop: 20, textAlign: "center" }}>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Holiday Season
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" onClick={ChristmasDetails}>
            Christas Holidays
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2" onClick={SummmerDetails}>
            Summer Holidays
          </Dropdown.Item>
          <Dropdown.Item href="#/action-3" onClick={EasterDetails}>
            Easter Holidays
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <SeasonDetails />
    </div>
  );
}
