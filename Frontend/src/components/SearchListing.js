import Loading from "./Loading";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Moment from "react-moment";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import ListGroup from "react-bootstrap/ListGroup";

function SearchListing() {
  const [id, setID] = useState("");
  const [date, setDate] = useState();
  const [info, setInfo] = useState(null);
  const [adjusted_price, setAdjustedPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [available, setAvailable] = useState(false);
  const [maximum_nights, setMaximumNights] = useState(0);
  const [minimum_nights, setMinimumNights] = useState(0);

  const SearchUI = ({ id, date }) => {
    if (info == null) {
      return <></>;
    }
    if (info == "getting") {
      return (
        <div>
          <h4 style={{ marginTop: 30, marginbottom: 10 }}>
            Listing information for {id} on{" "}
            <Moment format="YYYY/MM/DD">{date}</Moment>:
          </h4>
          <Loading />
        </div>
      );
    } else if (info == "No results") {
      return (
        <div>
          <h4 style={{ marginTop: 30, marginbottom: 10 }}>No results found</h4>
        </div>
      );
    } else if (info == "Error") {
      return (
        <div>
          <h4 style={{ marginTop: 30, marginbottom: 10 }}>Error in search</h4>
        </div>
      );
    } else {
      return (
        <div style={{ display: "block" }}>
          <h4 style={{ marginTop: 30, marginbottom: 10 }}>
            Listing information for ID: {id} on{" "}
            <Moment format="YYYY/MM/DD">{date}</Moment>:
          </h4>
          <ListGroup>
            <ListGroup.Item>Price: {price}</ListGroup.Item>

            <ListGroup.Item>Adjusted Price: {adjusted_price}</ListGroup.Item>

            <ListGroup.Item>Minimum Nights: {minimum_nights}</ListGroup.Item>

            <ListGroup.Item>Maximum Nights: {maximum_nights}</ListGroup.Item>

            <ListGroup.Item>Availability: {available}</ListGroup.Item>
          </ListGroup>
        </div>
      );
    }
  };

  const updateDate = (e) => {
    setDate(e); //the state date variable is for the UI part
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var currentDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      }) +
      "-" +
      date.getDate().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listing_id: id, date: currentDate }),
    };

    setInfo("getting");
    fetch("http://127.0.0.1:8000/dataAnalytics/searchListing/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data["code"] == 200) {
          setInfo(data);
          setPrice(data["price"]);
          setAdjustedPrice(data["adjusted_price"]);
          setMinimumNights(data["minimum_nights"]);
          setMaximumNights(data["maximum_nights"]);
          setAvailable(data["available"]);
        } else if (data["code"] == 204) {
          setInfo("No results");
        } else {
          setInfo("Error");
        }
      });
  };

  return (
    <div
      style={{
        marginTop: 30,
        width: "60%",
        display: "flex",
        margin: "auto",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <Form>
        <Form.Group
          className="mb-3"
          controlId="formBasicText"
          style={{ marginBottom: 20 }}
        >
          <Form.Label>Listing ID: </Form.Label>
          <Form.Control
            value={id}
            type="text"
            placeholder="Enter listing ID"
            onChange={(e) => setID(e.target.value)}
          />
        </Form.Group>
        <Calendar value={date} onChange={updateDate} />
        <Button
          type="submit"
          variatn="primary"
          style={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 20,
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
      <SearchUI id={id} date={date} />
    </div>
  );
}

export default SearchListing;
