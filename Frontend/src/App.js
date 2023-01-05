import React, { useState, useEffect } from "react";
import RentSpecificDay from "./components/RentSpecificDay";
import PopularMonths from "./components/PopularMonths";
import AddListing from "./components/AddListing";
import DeleteListing from "./components/DeleteListing";
import SearchListing from "./components/SearchListing";
import HolidayPricing from "./components/HolidayPricing";
import Home from "./components/Home";
import PriceRange from "./components/PriceRange";
import TopNavbar from "./components/TopNavbar";
import Top10Cheapest from "./components/Top10Cheapest";
import Top10MostRated from "./components/Top10MostRated";
import { Route, Routes } from "react-router-dom";
import PopularNeighbor from "./components/PopularNeighbor";

// import Container from "react-bootstrap/Container";

function App() {
  const styles = {
    dropdown: {
      textAlign: "center",
      height: 30,
      width: 250,
      borderRadius: 10,
    },
  };

  const [analysis, setAnalysis] = useState("default");

  const [displayAnalysis1, setDisplayAnalysis1] = useState(false);
  const [displayAnalysis2, setDisplayAnalysis2] = useState(false);
  const [displayAnalysis3, setDisplayAnalysis3] = useState(false);
  const [displayAnalysis4, setDisplayAnalysis4] = useState(false);
  const [displayAnalysis5, setDisplayAnalysis5] = useState(false);
  const [displayAnalysis6, setDisplayAnalysis6] = useState(false);

  useEffect(() => {
    analysis === "1" ? setDisplayAnalysis1(true) : setDisplayAnalysis1(false);
    analysis === "2" ? setDisplayAnalysis2(true) : setDisplayAnalysis2(false);
    analysis === "3" ? setDisplayAnalysis3(true) : setDisplayAnalysis3(false);
    analysis === "4" ? setDisplayAnalysis4(true) : setDisplayAnalysis4(false);
    analysis === "5" ? setDisplayAnalysis5(true) : setDisplayAnalysis5(false);
    analysis === "6" ? setDisplayAnalysis6(true) : setDisplayAnalysis6(false);
  }, [analysis]);

  const handleChange = (e) => {
    setAnalysis(e.target.value);
    // alert(analysis);
  };

  return (
    <main
      className="content"
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "block",
      }}
    >
      <div>
        <TopNavbar />   
        <>
          <Routes>
            <Route path="/add" element={<AddListing />} />
            <Route path="/delete" element={<DeleteListing />} />
            <Route path="/search" element={<SearchListing />} />
            <Route path="/specific" element={<RentSpecificDay />} />
            <Route path="/month" element={<PopularMonths />} />
            <Route path="/holiday" element={<HolidayPricing />} />
            <Route path="/range" element = {<PriceRange/>}/>
            <Route path="/top10cheapest" element={<Top10Cheapest />} />
            <Route path="/popularNeighbor" element={<PopularNeighbor/>}/>
            <Route path="/top10mostRated" element={<Top10MostRated />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // textAlign: "center",
            marginTop: 20,
            margin: "auto",
            width: "1000px",
            padding: 50,
            display: "block",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <form>
              <select
                value={analysis}
                onChange={handleChange}
                style={styles.dropdown}
              >
                <option value="default">---Select---</option>
                <option value="1">Price For Specific Date</option>
                <option value="2">Most Popular Months</option>
                <option value="3">Add new listing</option>
                <option value="4">Delete listing</option>
                <option value="5">Search listing</option>
                <option value="6">Holiday pricing</option>
              </select>
            </form>
          </div>

          <div>
            {displayAnalysis1 && <RentSpecificDay />}
            {displayAnalysis2 && <PopularMonths />}
            {displayAnalysis3 && <AddListing />}
            {displayAnalysis4 && <DeleteListing />}
            {displayAnalysis5 && <SearchListing />}
            {displayAnalysis6 && <HolidayPricing />}
          </div>
        </div> */}
      </div>
    </main>
  );
}
export default App;
