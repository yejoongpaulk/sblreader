import {useState, useEffect} from 'react';
import axios from 'axios';


const DropdownComponent = ({ books, setBook, setChapter, setVerseNumber}) => {
    // state for book chapter and verse dropdowns
    // (chapter/verse dropdowns will contain
    // the MAXIMUM number of chapters/verses)
    const [bookSelection, setBookSelection] = useState("Matt");
    const [chapterSelection, setChapterSelection] = useState(1);
    const [verseNumberSelection, setVerseNumberSelection] = useState(1);

    // states for actual options
    const [chapterOptions, setChapterOptions] = useState([]);
    const [verseOptions, setVerseOptions] = useState([]);

    // chapter effect that changes when a book is selected
    useEffect(() => {
        // dynamically get the number of chapters of a book
        // and populate the second select widget
        axios.get(`/api/chapters/${bookSelection}`).then(res => {
            var resultNum = res.data;
            setChapterOptions(Array.from({length: resultNum}, (_, i) => i + 1));
        }).catch(err => {
            console.log(err);
        });
    }, [bookSelection]);
    
    // verse number effect that changes when a chapter is selected
    useEffect(() => {
        // dynamically get the number of verses of a chapter and
        // book and populate the third select widget
        axios.get(`/api/versenum/${bookSelection}/${chapterSelection}`).then(res => {
            var resultNum = res.data;
            setVerseOptions(Array.from({length: resultNum}, (_, i) => i + 1));
        }).catch(err => {
            console.log(err);
        });
    }, [bookSelection, chapterSelection]);
    
    /**
     * Set the book name.
     * @param {Event} event 
     */
    const handleBookChange = (event) => {
        // get book name
        var bookName = event.target.value;
        setBookSelection(bookName);
        setChapterSelection(1);
        setVerseNumberSelection(1);
        
        // set the parent component's book
        setBook(bookName);
        setChapter(1);
        setVerseNumber(1);
    }
    
    /**
     * Set the chapter.
     * @param {Event} event 
    */
   const handleChapterChange = (event) => {
       // get chapter number selected
       var chapterNum = event.target.value;
       setChapterSelection(chapterNum);
       setVerseNumberSelection(1);

       // set the parent component's chapter number
       setChapter(chapterNum);
       setVerseNumber(1);
    }
    
    /**
     * Set the verse number.
     * @param {Event} event 
    */
   const handleVerseNumberChange = (event) => {
       // get verse number selected
       var verseNum = event.target.value;
       setVerseNumberSelection(verseNum);
       
       // set the parent component's verse number
       setVerseNumber(verseNum);
    }
    


    return (
        <div>
            <select value={bookSelection} onChange={handleBookChange}>
                {books.map((book) => (
                    <option key={book.value} value={book.value}>{book.label}</option>
                ))}
            </select>
            <select value={chapterSelection} onChange={handleChapterChange}>
                {chapterOptions.map((chapterNum) => (
                    <option key={chapterNum} value={chapterNum}>{chapterNum}</option>
                ))}
            </select>
            <select value={verseNumberSelection} onChange={handleVerseNumberChange}>
                {verseOptions.map((verseNum) => (
                    <option key={verseNum} value={verseNum}>{verseNum}</option>
                ))}
            </select>
        </div>
    );
}


export default DropdownComponent;