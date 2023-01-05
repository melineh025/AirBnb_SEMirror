import madrid from '../madrid.jpg';
function Home(){
    return(
        <div style={{textAlign: 'center', marginTop: 20}}>
            <h3>GGHadid</h3>
            <h5>A website that uses Madrid Airbnb Dataset from Koggle to analyze pricing, availability and many more.</h5>
            <p></p>
            <img style={{width: 800, height: 400}}src={madrid}/>
            <p></p>
            <p>Presented by: Melineh Cheharmohali, Rishab Dudhia, Julie Park, Pranay Periwal, Annie Wang</p>
        </div>
    );
}
export default Home;