package dev.yejoongpaulk.sblreader.verse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import dev.yejoongpaulk.sblreader.error.TooManyVersesException;


@RestController
public class VerseController {
    @Autowired
    private VerseRepository verseRepository;

    @GetMapping("/api/test")
    public String index() {
        return "{\"status\": \"Spring Boot live!\"}";
    }

    @GetMapping("/api/{book}/{chapter}")
    public List<Verse> getBookAndChapter(@PathVariable String book, @PathVariable int chapter) {
        // return verses by a book and chapter
        return this.verseRepository.findByBookAndChapter(book, chapter);
    }

    @GetMapping("/api/verses/{startId}/{endId}")
    public List<Verse> getVerses(@PathVariable Long startId, @PathVariable Long endId) {
        // if the number of verses requested is beyond 250, return
        // a bad request error indicating that this cannot happen
        if ((endId - startId + 1) > 250) {
            throw new TooManyVersesException();
        }

        return this.verseRepository.findByIdBetween(startId, endId);
    }
}