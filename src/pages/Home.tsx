import React from 'react';
import SeasonGrid from "../components/SeasonGrid";


export default function Home() {
 

  return (
    <div style={{ textAlign: 'center', marginTop: '10vh' }}>
     <h1 className="strangerTitle" >Stranger<br></br>Things</h1>
      <p>Welcome to Hawkins...</p>
       <div style={{marginBlock:"8vh"}}>
        <SeasonGrid />
      </div>
    </div>
  );
}
