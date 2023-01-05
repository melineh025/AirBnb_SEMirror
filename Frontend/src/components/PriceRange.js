import Loading from './Loading';
import React, { useEffect, useState} from "react";
import {Pie} from "react-chartjs-2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Chart as ChartJS} from "chart.js/auto";
import FormGroup from 'react-bootstrap/esm/FormGroup';

function PriceRange(){
    const [info, setInfo] = useState([]);
    const [month, setMonth] = useState("");

    const ShowData = () => {
        if(info.length === 0){
            return <Loading />
        }
        else{
            // var dict = info
            // console.log(dict)
            const pieChartData = [info["0to29"], info["30to59"], info["60to99"], info["100to199"], info["200to299"], info["300to399"], info["400to599"], info["600to799"], info["800to999"], info["1000"]]
            console.log(pieChartData)
            const data ={
                labels: ['$0-$29', 
                        '$30-$59', 
                        '$60-$99', 
                        '$100-$199',
                        '$200-$299',
                        '$300-$399',
                        '$400-$599',
                        '$600-$799',
                        '$800-$999',
                        '$1000+',],
                datasets: [
                {
                    label: 'Number of Listing',
                    data: pieChartData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)', //pink
                        'rgba(54, 162, 235, 0.2)', //blue
                        'rgba(255, 206, 86, 0.2)', //yellow
                        'rgba(75, 192, 192, 0.2)', //lightblue
                        'rgba(117, 75, 191, 0.2)', //purple
                        'rgba(255, 0, 0, 0.2)', //red
                        'rgba(255, 151, 0, 0.2)', //orange
                        'rgba(0, 173, 27, 0.2)', //green
                        'rgba(88, 88, 88, 0.2)', //gray
                        'rgba(45, 0, 255, 0.2)' //dark purple
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(117, 75, 191, 1)',
                        'rgba(255, 0, 0, 1)', 
                        'rgba(255, 151, 0, 1)', 
                        'rgba(0, 173, 27, 1)', 
                        'rgba(88, 88, 88, 1)', 
                        'rgba(45, 0, 255, 1)' 
                    ],
                    borderWidth: 1,
                },],
            };
            return (
                <div style={{width:"50%"}}>
                    <Pie style = {{marginTop: 20}} data = {data} />
                </div>

            )
        }
    };

    const handleSubmit = async (e) => {
        var selectedMonth = month
        e.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({month: selectedMonth}),
        };

        fetch("http://127.0.0.1:8000/dataAnalytics/listingPerRange/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setInfo(data);
        }); 
        
        console.log(info);
    };

    const handleChange = (e) => {
        setMonth(e.target.value);
    }

    return(
        <div style={{marginTop: 20, textAlign: 'center'}}>
            <Form>
                <FormGroup>
                    <Form.Select
                        aria-label="Select Month"
                        value={month}
                        onChange={handleChange}>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </Form.Select>
                </FormGroup>
                
                <Button style={{marginTop: 20}} variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
            
            {/* <Pie style = {{marginTop: 20}} data = {data}/> */}
            <div style={{  display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',}}>
            <ShowData />

            </div>
        </div>
    );
}
export default PriceRange;