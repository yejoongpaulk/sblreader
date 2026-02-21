package dev.yejoongpaulk.sblreader.verse;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Entity
@Table(name="verse")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Verse {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String book;
    private int chapter;

    @Column(name="verse_number")
    private int verseNumber;

    @Column(length=2048)
    private String content;
}
