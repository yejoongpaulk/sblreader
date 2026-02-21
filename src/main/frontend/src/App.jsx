import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  // state with a list of verses, initially empty
  const [verses, setVerses] = useState([]);

  // loading state variable
  const [loading, setLoading] = useState(false);

  // verse start id, by default set to Matthew 1:1
  const [startId, setStartId] = useState(1);

  // verse end id, by default set to Matthew 1:25
  const [endId, setEndId] = useState(25);

  // fetch verses function
  const fetchVerses = () => {
    // if either endpoint is invalid, do nothing
    if (!startId || !endId) return;

    // if somehow the ids are more than 250 verses,
    // do not allow client to make request
    if ((endId - startId + 1) > 250) return;

    // indicate that verses are loading
    setLoading(true);

    // get verses
    axios.get(`/api/verses/${startId}/${endId}`)
    .then(res => {
        setVerses(res.data);
        setLoading(false);
      }).catch(err => {
        console.error("API Error:", err);
        setLoading(false);
    });
  };
  
  
  
  return (
    <div style={{ padding: '2rem' }}>
      <h1>SBL GNT Reader</h1>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        <input
        value={startId}
        onChange={ (e) => setStartId(e.target.value) }
        placeholder="Start verse id"
        />
        <input
        value={endId}
        onChange={ (e) => setEndId(e.target.value) }
        placeholder="End verse id"
        />
        <button onClick={fetchVerses} disabled={loading}>{loading ? "Loading..." : "Load Verses"}</button>
      </div>

      {verses.length > 0 && (
        <div>
          {verses.map((verse) => (
            <p>{ verse.content }</p>
          ))}
        </div>
      )}
    </div>
  );
};


export default App;