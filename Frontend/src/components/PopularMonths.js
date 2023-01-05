import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Loading from "./Loading";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
function PopularMonths() {
  const [info, setInfo] = useState([]);
  // console.log(typeof info);
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const options = {
    responsive: true,

    plugins: {},
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Number of bookings",
        data: info,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const ShowDetails = () => {
    if (info.length === 0) {
      return <Loading />;
    } else {
      return (
        <div style={{width:"50%"}}>
          <Bar options={options} data={data} height={200} />
        </div>
      );
    }
  };

  console.log("Hello Analsyis 2");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/dataAnalytics/popularMonths/")
      .then((response) => response.json())
      .then((data) => {
        setInfo(data["numberOfBookings"]);
        console.log(data);
      });
  }, []);

  return (
    <div style={{ marginTop: 40 }}>
      <h3 style={{ textAlign: "center" }}>
        The number of booked listings over the months are:
      </h3>
      <div style={{ display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',}}>
        <ShowDetails />
      </div>
    </div>
  );
}

export default PopularMonths;
