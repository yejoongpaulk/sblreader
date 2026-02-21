package dev.yejoongpaulk.sblreader.verse;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerseRepository extends JpaRepository<Verse, Long> {
    /**
     * Find a NT book's content by book and chapter.
     * @param book
     * @param chapter
     * @return
     */
    public List<Verse> findByBookAndChapter(String book, int chapter);

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