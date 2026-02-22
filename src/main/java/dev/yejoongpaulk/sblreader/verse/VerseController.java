package dev.yejoongpaulk.sblreader.verse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import dev.yejoongpaulk.sblreader.error.InvalidInputException;
import dev.yejoongpaulk.sblreader.error.NonexistentVerseException;
import dev.yejoongpaulk.sblreader.error.TooManyVersesException;


@RestController
public class VerseController {
    // constant indicating the maximum number of verses allowed
    private final int VERSES_LIMIT = 250; 

    // verse repository object
    @Autowired
    private VerseRepository verseRepository;

    /**
     * Given arguments of strings, check that strings
     * aren't null, empty, or blank.
     * @param strings
     * @return
     */
    private boolean isValidString(String... strings) {
        for (String string : strings) {
            if (string == null || string.isEmpty() || string.isBlank()) {
                return false;
            }
        }

        return true;
    }

    /**
     * Given a list of integers, check that integers are not
     * less than or equal to 0.
     * @param integers
     * @return
     */
    private boolean isValidInteger(int... integers) {
        for (int integer : integers) {
            if (integer <= 0) {
                return false;
            }
        }

        return true;
    }

    /**
     * Test endpoint to see that API is live.
     * @return
     */
    @GetMapping("/api/test")
    public String test() {
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
        // validate the parameters
        if (!isValidString(book) || !isValidInteger(chapter, verse)) {
            throw new InvalidInputException();
        }

        Long id;

        // check that the id actuall exists
        try {
            id = this.verseRepository.findByBookAndChapterAndVerseNumber(book, chapter, verse).getId();
        } catch (NullPointerException npe) {
            throw new NonexistentVerseException();
        }

        // return the verse's sequential id (aka primary key)
        return id;
    }

    /**
     * Return the number of chapters in a book.
     * @param book
     * @return long number of chapters.
     */
    @GetMapping("/api/chapters/{book}")
    public Long getNumChaptersInBook(@PathVariable String book) {
        // validate the parameters
        if (!isValidString(book)) {
            throw new InvalidInputException();
        }

        // return the verse's maximum number of chapters
        Long numChapters;

        try {
            numChapters = this.verseRepository.findTopChapterByBookOrderByChapterDesc(book).getChapter();
        } catch (NullPointerException npe) {
            throw new NonexistentVerseException();
        }

        return numChapters;
    }

    /**
     * Return the number of verses in a chapter of a book.
     * @param book
     * @param chapter
     * @return
     */
    @GetMapping("/api/versenum/{book}/{chapter}")
    public Long getNumVersesInBookChapter(@PathVariable String book, @PathVariable int chapter) {
        // validate the parameters
        if (!isValidString(book) || !isValidInteger(chapter)) {
            throw new InvalidInputException();
        }

        // return the number of verses in a chapter
        Long numVerses;

        try {
            numVerses = this.verseRepository.findTopVerseNumberByBookAndChapterOrderByVerseNumberDesc(book, chapter).getVerseNumber();
        } catch (NullPointerException npe) {
            throw new InvalidInputException();
        }

        return numVerses;
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
        // validate parameters
        if (startId <= 0 || endId <= 0 || startId > endId) {
            throw new InvalidInputException();
        }

        // if the number of verses requested is beyond 250, return
        // a bad request error indicating that this cannot happen
        if ((endId - startId + 1) > VERSES_LIMIT) {
            throw new TooManyVersesException();
        }

        // return all verses between the two ids
        return this.verseRepository.findByIdBetween(startId, endId);
    }
}