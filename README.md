# SBL Reader

## Overview

The goal of this project is to create a React-based "focused reader" for the SBL GNT, allowing users to select and read up to 250 verses simultaneously from the SBL GNT.

Live Link: https://sblread.yejoongpaulk.dev

## Database Setup

The hard-coded "application.properties" file is configured for an H2 in-memory database, meant primarily for debugging. This is NOT the database configuration that will be hosted in production.

## CORS Origin

By default, cross-origin is allowed for development to allow different localhost ports. This will NOT be the case in production.

## Sources

The following copyright notice is provided per the terms of the CC BY 4.0 licensing to indicate source:

```
The Greek New Testament: SBL Edition
Michael W. Holmes, General Editor
Copyright 2010 Logos Bible Software and the Society of Biblical Literature
```

* GitHub repo that provided the .txt files for data processing into the data.sql file: https://github.com/Faithlife/SBLGNT
* See SBLGNT.com for license details: https://www.sblgnt.com/license/
* The SBL GNT is licensed under the Creative Commons Attribution 4.0 International Public License (CC BY 4.0): https://creativecommons.org/licenses/by/4.0/
* The data processing repo that converted the .txt files to data.sql can be found here: https://github.com/yejoongpaulk/sblgnt-verse-extractor

# Fonts

GentiumPlus-Regular.ttf
* **Source**: SIL International
* **License**: SIL Open Font License v1.1 (OFL.txt)
* **Download**: https://software.sil.org/gentium/

GalatiaSIL-Regular.ttf  
* **Source**: SIL International
* **License**: SIL Open Font License v1.1 (OFL.txt)
* **Download**: https://software.sil.org/galatia/

Both fonts are bundled under OFL terms for use in SBL GNT Reader.

