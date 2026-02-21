package dev.yejoongpaulk.sblreader.verse;


/**
 * Interface projection intended to only get id, chapter, and book.
 */
public interface VerseView {
    /**
     * Get the id of the verse.
     * @return
     */
    Long getId();

    /**
     * Get chapter of the verse.
     * @return
     */
    Long getChapter();

    /**
     * Get abbreviated book name that verse
     * belongs to.
     * @return
     */
    String getBook();
}