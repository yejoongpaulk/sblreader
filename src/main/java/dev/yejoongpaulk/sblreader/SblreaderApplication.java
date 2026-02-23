package dev.yejoongpaulk.sblreader;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "dev.yejoongpaulk.sblreader.verse")
@EntityScan(basePackages = "dev.yejoongpaulk.sblreader.verse")
public class SblreaderApplication {

	public static void main(String[] args) {
		SpringApplication.run(SblreaderApplication.class, args);
	}

}
