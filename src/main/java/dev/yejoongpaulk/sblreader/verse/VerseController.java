package dev.yejoongpaulk.sblreader.verse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

// import dev.yejoongpaulk.sblreader.error.NonexistentVerseException;
import dev.yejoongpaulk.sblreader.error.TooManyVersesException;


@RestController
public class VerseController {
    // constant indicating the maximum number of verses allowed
    private final int VERSES_LIMIT = 250; 

    // verse repository object
    @Autowired
    private VerseRepository verseRepository;

    /**
     * Test endpoint to see that API is live.
     * @return
     */
    @GetMapping("/api/test")
    public String index() {
        return "{\"status\": \"API is live!\"}";
    }

    /**
     * Given a book, chapter, and verse, return the
     * sequential id (aka primary key) associated
     * with the parameters given.
     * @param book
     * @param chapter
     * @param verse
     * @return
     */
    @GetMapping("/api/id/{book}/{chapter}/{verse}")
    public Long getBookAndChapter(@PathVariable String book, @PathVariable int chapter, @PathVariable int verse) {
        // return the verse's sequential id (aka primary key)
        return this.verseRepository.findByBookAndChapterAndVerseNumber(book, chapter, verse).getId();
    }

    /**
     * Return the number of chapters in a book.
     * @param book
     * @return long number of chapters.
     */
    @GetMapping("/api/chapters/{book}")
    public Long getNumChaptersInBook(@PathVariable String book) {
        // return the verse's maximum number of chapters
        return this.verseRepository.findTopChapterByBookOrderByChapterDesc(book).getChapter();
    }

    /**
     * Return a lits of verses between two
     * sequential verse ids (250 verses maximum).
     * @param startId
     * @param endId
     * @return
     */
    @GetMapping("/api/verses/{startId}/{endId}")
    public List<Verse> getVerses(@PathVariable Long startId, @PathVariable Long endId) {
        // if the number of verses requested is beyond 250, return
        // a bad request error indicating that this cannot happen
        if ((endId - startId + 1) > VERSES_LIMIT) {
            throw new TooManyVersesException();
        }

        // return all verses between the two ids
        return this.verseRepository.findByIdBetween(startId, endId);
    }
}