import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Table from "react-bootstrap/Table";

function PopularNeighbor() {
    const [info, setInfo] = useState([]);
    const ShowData = () => {
        if (info.length === 0){
            return <Loading />
        }
        else{
            return (
                <div style={{ width: "50%", marginTop: 20, marginBottom: 20 }}>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Neighborhood Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {info.map((rowInfo, id) => {
                            return (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{rowInfo}</td>
                            </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                </div>
            );
        }
    };

    useEffect(() => {
        fetch("http://127.0.0.1:8000/dataAnalytics/popularNeighborhoods/")
        .then((response) => response.json())
        .then((data) =>{
            setInfo(data["popular neighborhoods"]);
            // console.log(data);
            console.log(info);
        });
    },[]);

    return(
        <div style={{marginTop: 20, textAlign: 'center'}}>
            <h3>The top 10 popular neighborhood are: </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',}}>
                <ShowData />
            </div>
            
        </div>
    );
}

export default PopularNeighbor;