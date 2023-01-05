import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

function AddListing() {
  const [listing_id, setListingID] = useState(0);
  const [date, setDate] = useState("");
  const [available, setAvailabile] = useState(true);
  const [price, setPrice] = useState(0);
  const [adjusted_price, setAdjustedPrice] = useState(0);
  const [minimum_nights, setMinimumNights] = useState(0);
  const [maximum_nights, setMaximumNights] = useState(0);
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        listing_id: listing_id,
        date: date,
        available: available,
        price: price,
        adjusted_price: adjusted_price,
        minimum_nights: minimum_nights,
        maximum_nights: maximum_nights,
      })
    );

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listing_id: listing_id,
        date: date,
        available: available,
        price: price,
        adjusted_price: adjusted_price,
        minimum_nights: minimum_nights,
        maximum_nights: maximum_nights,
      }),
    };

    // setInfo("getting");

    try {
      fetch("http://127.0.0.1:8000/dataAnalytics/addListing/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setListingID(0);
          setDate("");
          setAvailabile(true);
          setPrice(0);
          setAdjustedPrice(0);
          setMinimumNights(0);
          setMaximumNights(0);
          setMessage("Listing created successfully");
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginTop: 30, marginLeft: "28%", marginRight: "28%" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Listing ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter listing ID"
            value={listing_id}
            onChange={(e) => setListingID(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Form.Text className="text-muted">
            Enter date in YYYY-MM-DD format
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Property Availability</Form.Label>
          <br />
          <Form.Select
            aria-label="Select property availability"
            value={available}
            onChange={(e) => {
              if (e.target.value == true) {
                setAvailabile("t");
              } else {
                setAvailabile("f");
              }
            }}
          >
            <option value="True">True</option>
            <option value="False">False</option>
          </Form.Select>
        </Form.Group>

        <Form.Label htmlFor="basic-url">Price</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            type="number"
            aria-label="Amount (to the nearest dollar)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </InputGroup>

        <Form.Label htmlFor="basic-url">Adjusted Price</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            type="number"
            aria-label="Amount (to the nearest dollar)"
            value={adjusted_price}
            onChange={(e) => setAdjustedPrice(e.target.value)}
          />
        </InputGroup>

        <Form.Group className="mb-3">
          <Form.Label>Minimum Nights</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Minimum Nights"
            value={minimum_nights}
            onChange={(e) => setMinimumNights(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Maximum Nights</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Maximum Nights"
            value={maximum_nights}
            onChange={(e) => setMaximumNights(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>

        {/* <Button variant="primary" type="submit">
          Update
        </Button> */}
        {/* <Calendar /> */}
      </Form>

      <h4 style={{ marginTop: 20 }}>{message}</h4>

      {/* <form style={{ textAlign: "center", marginBottom: 20 }}>
        <label>Yexy:</label> <input type="text" />
      </form>
      
      <form style={{ textAlign: "center", marginTop: 20 }}>
        <input type="text" />
      </form>
      <button
        style={{
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 20,
        }}
      >
        Add
      </button>
      <button
        style={{
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 20,
        }}
      >
        Update
      </button> */}
    </div>
  );
}
export default AddListing;
