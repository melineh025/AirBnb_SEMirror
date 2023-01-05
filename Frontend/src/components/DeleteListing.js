import Loading from "./Loading";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Moment from "react-moment";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Spinner from "react-bootstrap/Spinner";

function DeleteListing() {
  const [id, setID] = useState("");
  const [date, setDate] = useState();
  const [info, setInfo] = useState(null);

  const RemoveMsg = ({ id, date }) => {
    if (info == null) {
      return <></>;
    }
    if (info === "getting") {
      return (
        <div>
          <p style={{ marginTop: 20 }}>
            Removing listing id: {id} for{" "}
            <Moment format="YYYY/MM/DD">{date}</Moment>...
          </p>
          <Loading />
        </div>
      );
    } else {
      return (
        <div>
          <p style={{ marginTop: 20 }}>
            Listing id: {id} for <Moment format="YYYY/MM/DD">{date}</Moment> has
            been removed.
          </p>
        </div>
      );
    }
  };

  // const handleID = (e) => {
  //     setID(e.target.value)
  // };

  // const handleDate = (e) => {
  //     setDate(e);
  // };
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

    console.log(id);
    console.log(currentDate);
    setInfo("getting");
    fetch("http://127.0.0.1:8000/dataAnalytics/deleteListing/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setInfo(data);
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
            onChange={(e) => {
              setID(e.target.value);
            }}
          />
        </Form.Group>
        <Calendar
          value={date}
          onChange={(e) => {
            setDate(e);
          }}
        />
        <Button
          type="submit"
          variant="primary"
          style={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 20,
          }}
          onClick={handleSubmit}
        >
          Remove
        </Button>
      </Form>
      <RemoveMsg id={id} date={date} />
    </div>
  );
}
export default DeleteListing;
