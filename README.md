# Bounty Poster Generator - One Piece Theme

A React.js web app to create custom One Piece-style bounty posters with multiple frame options, photo filters, and easy download & share features.

---

## Features

-   Input character name, title/rank, bounty (for Pirate & Revolutionary frames).
-   Upload photo (jpg/jpeg/png, max 2MB) with validation.
-   Choose poster frame style: Wanted (Pirate), Marine, Revolutionary.
-   Apply photo filters: none, grayscale, sepia, invert, blur.
-   Download poster as high-resolution PNG.
-   Share poster via Web Share API (on supported devices).
-   Auto validation with visual feedback (blur effect for incomplete data).

---

## Tech Stack

-   React.js (frontend)
-   Bootstrap 5 (UI styling)
-   html2canvas (to convert poster div to downloadable image)
-   Web Share API (for sharing posters)

---

## Installation

1. Clone or download this repository.

2. Open terminal/command prompt in the project folder.

3. Install dependencies:

```bash
npm install
```

Usage
Fill in the form:

Enter character name.

Enter title or rank.

Enter bounty amount (only for Pirate and Revolutionary frames).

Upload character photo (jpg/jpeg/png, max 2MB).

Select frame type.

Choose a photo filter.

Poster preview updates automatically.

If all required fields are valid, you can:

Download poster as PNG.

Share poster via supported social media apps.
