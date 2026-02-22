import { useState, useEffect } from 'react';
import axios from 'axios';

import DropdownComponent from './DropdownComponent';


const BIBLE_BOOK_OPTIONS = [
  { label: "Matthew", value: "Matt" },
  { label: "Mark", value: "Mark" },
  { label: "Luke", value: "Luke" },
  { label: "John", value: "John" },
  { label: "Acts", value: "Acts" },
  { label: "Romans", value: "Rom" },
  { label: "1 Corinthians", value: "1Cor" },
  { label: "2 Corinthians", value: "2Cor" },
  { label: "Galatians", value: "Gal" },
  { label: "Ephesians", value: "Eph" },
  { label: "Philippians", value: "Phil" },
  { label: "Colossians", value: "Col" },
  { label: "1 Thessalonians", value: "1Thess" },
  { label: "2 Thessalonians", value: "2Thess" },
  { label: "1 Timothy", value: "1Tim" },
  { label: "2 Timothy", value: "2Tim" },
  { label: "Titus", value: "Titus" },
  { label: "Philemon", value: "Phlm" },
  { label: "Hebrews", value: "Heb" },
  { label: "James", value: "Jas" },
  { label: "1 Peter", value: "1Pet" },
  { label: "2 Peter", value: "2Pet" },
  { label: "1 John", value: "1John" },
  { label: "2 John", value: "2John" },
  { label: "3 John", value: "3John" },
  { label: "Jude", value: "Jude" },
  { label: "Revelation", value: "Rev" }
];

// constant indicating max verses possible
const MAX_VERSES = 250;



function App() {

  // state with a list of verses, initially empty
  const [verses, setVerses] = useState([]);

  // loading state variable
  const [loading, setLoading] = useState(false);

  // start and end book state, by default "Matt"
  const [startBook, setStartBook] = useState("Matt");
  const [endBook, setEndBook] = useState("Matt");

  // start and end chapter state, by default 1
  const [startChapter, setStartChapter] = useState(1);
  const [endChapter, setEndChapter] = useState(1);

  // start and end verse state, by default 1 and 25 respectively
  const [startVerse, setStartVerse] = useState(1);
  const [endVerse, setEndVerse] = useState(1);

  // fetch verses function
  const fetchVerses = async () => {
    
    // indicate that verses are loading
    setLoading(true);
    
    try {
      // await API calls
      const startRes = await axios.get(`/api/id/${startBook}/${startChapter}/${startVerse}`);
      const endRes = await axios.get(`/api/id/${endBook}/${endChapter}/${endVerse}`);

      // get start and end id
      const startId = startRes.data;
      const endId = endRes.data;
  
      // if either endpoint is invalid, do nothing
      if (!startId || !endId || (startId > endId)) return;
      
      // if somehow the ids are more than 250 verses,
      // do not allow client to make request
      if ((endId - startId + 1) > MAX_VERSES) return;
      
      // get verses
      const versesRes = await axios.get(`/api/verses/${startId}/${endId}`)
      setVerses(versesRes.data);
    } catch (err) {
      if (err.response?.status === 400) {
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  };
  
  
  
  return (
    <div className="main-container" style={{ padding: '2rem', textAlign: "center" }}>
      <div className="settings-container">
        <h1>SBL GNT Reader</h1>
        <p>Choose a verse to start from, and then choose a verse to end on. At most, you can select 250 verses.</p>

        <div>
          <DropdownComponent books={BIBLE_BOOK_OPTIONS} setBook={setStartBook} setChapter={setStartChapter} setVerseNumber={setStartVerse} ></DropdownComponent>
          <DropdownComponent books={BIBLE_BOOK_OPTIONS} setBook={setEndBook} setChapter={setEndChapter} setVerseNumber={setEndVerse} ></DropdownComponent>
          <button onClick={fetchVerses}>{loading ? "Loading..." : "Load Verses"}</button>
        </div>
      </div>
      {verses.length > 0 && (
        <div className="content-container" style={{lineHeight: "2" }}>
          {verses.map((verse) => (
            <div style={{display: "grid", gridTemplateColumns: "10% 90%"}}>
              <div>
                {verse.verseNumber === 1 ? (
                  <span class="chapter" style={{ display: "inline" }}>{ verse.chapter }  </span>
                ) : (
                  <span class="verse" style={{ display: "inline" }}>{ verse.verseNumber }  </span>
                )}
              </div>
              <div style={{ textAlign: "left" }}>
                <span style={{display: "inline"}}>{ verse.content } </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default App;