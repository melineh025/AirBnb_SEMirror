import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Loading from "./Loading";
import Table from "react-bootstrap/Table";

export default function Top10MostRated() {
  const [loading, setLoading] = useState(null);
  const [info, setInfo] = useState([]);
  const [neighbourhood, setNeighbourhood] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        neighbourhood: neighbourhood,
      }),
    };

    try {
      fetch("http://127.0.0.1:8000/dataAnalytics/mostRated/", requestOptions)
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
      <h1>Top 10 Most Rated listings in Madrid</h1>
      <h5>
        Find the top 10 most rated listings in a specific{" "}
        <span style={{ textDecoration: "underline" }}>neighbourhood</span>
      </h5>

      <Form onSubmit={handleSubmit} style={{ width: "25%" }}>
        <br />
        <Form.Label style={{ fontWeight: "bold", paddingLeft: 10 }}>
          Neighbourhood
        </Form.Label>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <InputGroup style={{ marginRight: 30 }}>
            <FormControl
              value={neighbourhood}
              onChange={(e) => setNeighbourhood(e.target.value)}
            />
          </InputGroup>
          <Button variant="primary" type="submit" style={{}}>
            Search
          </Button>
        </div>
      </Form>

      <ShowDetails />
    </div>
  );
}
