import { useState, useEffect, useCallback } from 'react';
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

const MAX_VERSES = 250;

function App() {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startBook, setStartBook] = useState("Matt");
  const [endBook, setEndBook] = useState("Matt");
  const [startChapter, setStartChapter] = useState(1);
  const [endChapter, setEndChapter] = useState(1);
  const [startVerse, setStartVerse] = useState(1);
  const [endVerse, setEndVerse] = useState(1);

  // NEW: Settings state
  const [fontFamily, setFontFamily] = useState('Gentium');
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(16);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedFont = localStorage.getItem('readerFont') || 'serif';
    const savedTheme = localStorage.getItem('readerTheme') || 'dark';
    const savedSize = parseInt(localStorage.getItem('readerFontSize')) || 16;
    setFontFamily(savedFont);
    setTheme(savedTheme);
    setFontSize(savedSize);
  }, []);

  // Apply font family changes
  useEffect(() => {
    document.documentElement.style.setProperty('--font-family', fontFamily);
    localStorage.setItem('readerFont', fontFamily);
  }, [fontFamily]);

  // Apply theme changes  
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('readerTheme', theme);
  }, [theme]);

  // Apply font size changes
  useEffect(() => {
    const clampedSize = Math.max(12, Math.min(32, fontSize));
    document.documentElement.style.setProperty('--font-size', `${clampedSize}px`);
    localStorage.setItem('readerFontSize', clampedSize);
  }, [fontSize]);

  const changeFontSize = useCallback((delta) => {
    setFontSize(prev => Math.max(12, Math.min(32, prev + delta)));
  }, []);

  // fetch verses from the api
  const fetchVerses = async () => {
    setLoading(true);
    try {
      const startRes = await axios.get(`/api/id/${startBook}/${startChapter}/${startVerse}`);
      const endRes = await axios.get(`/api/id/${endBook}/${endChapter}/${endVerse}`);
      const startId = startRes.data;
      const endId = endRes.data;
      if (!startId || !endId || (startId > endId)) return;
      if ((endId - startId + 1) > MAX_VERSES) return;
      const versesRes = await axios.get(`/api/verses/${startId}/${endId}`);
      setVerses(versesRes.data);
    } catch (err) {
      if (err.response?.status === 400) console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container" style={{ padding: '2rem', textAlign: "center" }}>
      {/* Settings Panel */}
      <div className="settings-panel">
        <div className="header-section">
          <h1>SBL GNT Reader</h1>
          <p>Choose a verse to start from, and then choose a verse to end on. At most, you can select 250 verses.</p>
          <p>Also, there are options allowing you to choose font family, font size, and theme.</p>
          <p>When verses are loaded, they will appear below this settings panel.</p>
        </div>
        
        <div className="controls-section">
          <label>Font:
            <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
              <option value="serif">Serif</option>
              <option value="sans-serif">Sans Serif</option>
              <option value="Gentium">Gentium</option>
              <option value="Galatia SIL">Galatia SIL</option>
            </select>
          </label>
          
          <div className="font-controls">
            <button onClick={() => changeFontSize(-2)} title="Smaller">-</button>
            <span>{fontSize}px</span>
            <button onClick={() => changeFontSize(2)} title="Larger">+</button>
          </div>

          <label>Theme:
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="sepia">Sepia</option>
            </select>
          </label>
          
          <div className="dropdown-section">
            <DropdownComponent books={BIBLE_BOOK_OPTIONS} setBook={setStartBook} setChapter={setStartChapter} setVerseNumber={setStartVerse} />
            <DropdownComponent books={BIBLE_BOOK_OPTIONS} setBook={setEndBook} setChapter={setEndChapter} setVerseNumber={setEndVerse} />
            <button onClick={fetchVerses}>{loading ? "Loading..." : "Load Verses"}</button>
          </div>
        </div>
      </div>
      
      {verses.length > 0 && (
        <div className="content-container" style={{lineHeight: "2" }}>
          {verses.map((verse) => (
            <div key={`${verse.chapter}-${verse.verseNumber}`} style={{display: "grid", gridTemplateColumns: "10% 90%"}}>
              <div>
                {verse.verseNumber === 1 ? (
                  <span className="chapter">{verse.chapter}</span>
                ) : (
                  <span className="verse">{verse.verseNumber}</span>
                )}
              </div>
              <div style={{ textAlign: "left" }}>
                <span>{verse.content}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <footer style={{fontSize: '0.7rem', opacity: 0.7, padding: '1rem', textAlign: 'center'}}>
        <span>Scripture quotations marked SBLGNT are taken from the SBL Greek New Testament, copyright © 2010, Society of Biblical Literature and Logos Bible Software. Used by permission.</span>
      </footer>
    </div>
  );
}

export default App;
