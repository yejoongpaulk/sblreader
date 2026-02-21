package dev.yejoongpaulk.sblreader.error;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.BAD_REQUEST, reason="Too many verses requested!")
public class TooManyVersesException extends RuntimeException {}