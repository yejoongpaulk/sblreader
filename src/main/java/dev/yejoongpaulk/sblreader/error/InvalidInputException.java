package dev.yejoongpaulk.sblreader.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.BAD_REQUEST, reason="Parameter is invalid!")
public class InvalidInputException extends RuntimeException {}