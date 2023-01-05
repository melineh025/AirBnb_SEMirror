import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Loading from "./Loading";
import Table from "react-bootstrap/Table";

export default function Top10Cheapest() {
  const [radioValue, setRadioValue] = useState("0");
  const [minimumPrice, setMinimumPrice] = useState(0);
  const [loading, setLoading] = useState(null);
  const [info, setInfo] = useState([]);

  const radios = [
    { name: "Private Room", value: "0" },
    { name: "Entire Home/Apartment", value: "1" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room_type: parseInt(radioValue),
        min_price: parseInt(minimumPrice),
      }),
    };

    try {
      fetch(
        "http://127.0.0.1:8000/dataAnalytics/cheapestListing/",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          let ar = [];
          for (let key in data) {
            ar.push(data[key]);
          }
          setInfo(ar);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const ShowDetails = () => {
    if (loading == null) {
      return <></>;
    } else if (loading) {
      return <Loading />;
    } else {
      return (
        <div style={{ width: "75%", marginTop: 20, marginBottom: 20 }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Listing Name</th>
                <th>Host Name</th>
                <th>Neighbo rhood</th>
                <th>Price</th>
                <th>Number of Reviews</th>
                <th>Minimum Nights</th>
              </tr>
            </thead>
            <tbody>
              {info.map((rowInfo, id) => {
                return (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <th>{rowInfo["name"]}</th>
                    <th>{rowInfo["host_name"]}</th>
                    <th>{rowInfo["neighbourhood"]}</th>
                    <th>{rowInfo["price"]}</th>
                    <th>{rowInfo["number_of_reviews"]}</th>
                    <th>{rowInfo["minimum_nights"]}</th>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
      }}
    >
      <h1>Top 10 Cheapest listings in Madrid</h1>
      <h5>
        Find the top 10 listings based on{" "}
        <span style={{ textDecoration: "underline" }}>room type</span> and{" "}
        <span style={{ textDecoration: "underline" }}>minimum price</span>
      </h5>

      <Form onSubmit={handleSubmit}>
        <ButtonGroup style={{ marginTop: 30 }}>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? "success" : "warning"}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
              style={{ marginRight: 10 }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <br />
        <Form.Label style={{ marginTop: 20 }}>Minimum Price</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <FormControl
            aria-label="Amount (to the nearest dollar)"
            value={minimumPrice}
            onChange={(e) => setMinimumPrice(e.target.value)}
          />
          <InputGroup.Text>.00</InputGroup.Text>
        </InputGroup>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>

      <ShowDetails />
    </div>
  );
}
