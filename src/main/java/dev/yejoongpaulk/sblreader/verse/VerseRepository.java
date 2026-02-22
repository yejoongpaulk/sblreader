package dev.yejoongpaulk.sblreader.verse;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerseRepository extends JpaRepository<Verse, Long> {
    /**
     * Find a NT book's verse by book, chapter, and verse.
     * @param book
     * @param chapter
     * @param verseNumber
     * @return the sequential id corresponding to the book, chapter, and verse.
     */
    public VerseView findByBookAndChapterAndVerseNumber(String book, int chapter, int verseNumber);

    /**
     * Obtain the maximum chapter by book (i.e. Matt -> 28, Mark -> 16, etc.).
     * @param book
     * @return
     */
    public VerseView findTopChapterByBookOrderByChapterDesc(String book);

    /**
     * Obtain the maximum verse by book and chapter (i.e. Matt 1 -> 25).
     * @param book
     * @param chapter
     * @return
     */
    public VerseView findTopVerseNumberByBookAndChapterOrderByVerseNumberDesc(String book, int chapter);

    /**
     * Find all verses between two verse primary key ids.
     * By the way the ids are constructed, the ids are sequential,
     * meaning that you can select up to 250 verses per book.
     * @param startId
     * @param endId
     * @return
     */
    public List<Verse> findByIdBetween(Long startId, Long endId);
}