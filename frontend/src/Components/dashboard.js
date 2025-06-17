import { useState, useEffect } from 'react';
import './dashboard.css'; 
import Urls from './urls.js';

const baseUrl = process.env.REACT_APP_API_URL;

export default function Dashboard() {
  const [redirectUrl, setUrl] = useState('');
  const [days, setDays] = useState('');
  const [urls, setUrls] = useState([]);

  async function generateUrl(event) {
    event.preventDefault();

    try {

    const token = localStorage.getItem("token");
     console.log(token);
      const res = await fetch(`${baseUrl}/url/create`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ redirectUrl, days })
      });

      // console.log("res:",res);

      const data = await res.json();

      // console.log("data:",data);

      if (res.ok) {
        alert(`Shortened URL: ${baseUrl}/url/${data.shortId}`); 
      } else{
        alert("Url cant be alive for more than 100 days");
      } 
    } catch (error) {
      console.error(error);
    }
  }

 useEffect(() => {
    content();
  }, []);

 async function content() {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${baseUrl}/user/dashboard`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (res.ok) {
        setUrls(data.urls);
        console.log(urls);
      } else {
        console.log("Error fetching dashboard content:", data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }


  return (
    <div className="dashboard-container">
      <h1>Shortify: Shorten your URLs</h1>
      <form className="dashboard-form" onSubmit={generateUrl}>
        <input
          placeholder="Enter the URL"
          name="url"
          value={redirectUrl}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          placeholder="Enter days to be alive"
          name="days"
          value={days}
          type="number"
          onChange={(e) => setDays(e.target.value)}
        />
        <button type="submit">GO</button>
      </form>

      <Urls urls={urls}/>
    </div>
  );
}
