================================================================================
RAJ SHINDE — ROYAL BLUE & METALLIC GOLD INTERACTIVE DIGITAL PORTFOLIO FILE
================================================================================

Designed as a physical luxury hardcover editorial portfolio file, built with modern web technologies:
- Royal blue hardcover & section dividers with metallic gold typography & borders
- Dedicated editorial Index / Contents page (Page 02) with gold dotted leader lines
- Warm cream/ivory content pages with crisp serif, sans-serif, and monospace typography
- 3D realistic page-flipping transitions with animated right-side paper stack
- Dynamic remaining-pages counter ("24 PAGES LEFT" down to "0 PAGES LEFT")
- Fully responsive from large desktop displays down to smartphones (360x800, 375x812, 390x844)

--------------------------------------------------------------------------------
QUICK START
--------------------------------------------------------------------------------
1. Open index.html directly in any modern browser (Chrome, Edge, Safari, Firefox).
2. Ensure the "images/" and "assets/" folders remain beside index.html.

--------------------------------------------------------------------------------
RECRUITER & USER NAVIGATION
--------------------------------------------------------------------------------
1. Dedicated Printed-Style Index Page (Page 02):
   - Positioned immediately following the hardcover cover.
   - Features a luxury editorial layout with the edition stamp, "CONTENTS." title, subtitle, and ornament.
   - Lists all 10 numbered sections with section titles, thin gold dotted leader lines, and dynamic physical page numbers.
   - Every entry is clickable and turns directly to the corresponding section divider/profile page with smooth 3D animation.
   - Page numbers are computed dynamically from DOM positions, remaining accurate even if pages are added or reordered.

2. Clickable Table of Contents (TOC) Overlay Drawer:
   - Click the "☰ CONTENTS" button in the top-right toolbar to open the royal blue navigation panel.
   - Synchronized with the exact same section data as the Dedicated Index page.
   - Highlights the current active section automatically.
   - Closes automatically upon section selection, via the close button (✕), backdrop click, or Escape key.

3. Recruiter Quick Access Bar:
   - Header shortcuts to the 5 most critical sections: PROJECTS, EXPERIENCE, SKILLS, RESUME, CONTACT.
   - On smartphones, an instant "CV ↗" quick chip appears in the top header for instant resume access.

4. Scoped Mouse Wheel Navigation:
   - One scroll gesture turns exactly one page.
   - Scoped strictly to the book area (.book-wrap) so it never hijacks window or TOC drawer scrolling.
   - Scroll toggle button (📜) in the header enables/disables wheel page turning at any time.

5. Keyboard Shortcuts:
   - Arrow Right / Down / Page Down / Space: Next page
   - Arrow Left / Up / Page Up: Previous page
   - Home: Jump directly to the Cover (Page 01)
   - End: Jump directly to Contact & Socials (Page 25)
   - Escape: Closes the Table of Contents drawer if open

6. Touch Swipe (Mobile & Tablet):
   - Swipe Left / Right to turn pages forward/backward.
   - Swipe Up / Down also supported for natural mobile reading.
   - Ignores taps on interactive links, buttons, and video controls.

--------------------------------------------------------------------------------
COMPLETE 25-PAGE PORTFOLIO STRUCTURE
--------------------------------------------------------------------------------
01. Sheet 00 — Hardcover Cover: THE WORK & THINKING OF RAJ SHINDE
02. Sheet 01 — Dedicated Index: CONTENTS (All 10 Sections with Dotted Leaders & Page Numbers)
03. Sheet 02 — Section 01: Profile (Portrait, Credentials, CGPA, Contact & Profiles)
04. Sheet 03 — Section 02 Divider: ABOUT ME
05. Sheet 04 — Section 02 Content: About Me (Mindset, Architecture, Full-Stack Execution)
06. Sheet 05 — Section 03 Divider: PROFESSIONAL EXPERIENCE
07. Sheet 06 — Section 03 Content: Oppidan India (Project-Based Intern — Primary Heading)
08. Sheet 07 — Section 03 Content: Prayaas Youth Foundation (Web Development Intern — Primary Heading)
09. Sheet 08 — Section 04 Divider: LEADERSHIP & COMMUNITY
10. Sheet 09 — Section 04 Content: CodeCraft X PCCOER (President — Primary Heading)
11. Sheet 10 — Section 05 Divider: SELECTED PROJECTS
12. Sheet 11 — Section 05 Content: InvoiceFlow (Automated Multi-Tenant Invoicing Platform)
13. Sheet 12 — Section 05 Content: SprintFounders (Co-Founder Matching & Equity Agreement Platform)
14. Sheet 13 — Section 05 Content: Wanderlust (Property Listing & Rental Platform · Video Walkthrough)
15. Sheet 14 — Section 05 Content: StreetBites (Live Food Delivery & Real-Time Tracking Platform)
16. Sheet 15 — Section 06 Divider: ACHIEVEMENTS & RECOGNITION
17. Sheet 16 — Section 06 Content: Achievements & Recognition (Competitions, Finals & Copyrights)
18. Sheet 17 — Section 07 Divider: TECHNICAL SKILLS
19. Sheet 18 — Section 07 Content: Technical Skills & Toolkit (MERN, SQL, TypeScript, Gemini AI)
20. Sheet 19 — Section 08 Divider: EDUCATION
21. Sheet 20 — Section 08 Content: Integrated B.E. Computer Engineering (PCCOER, Pune · 8.71 CGPA)
22. Sheet 21 — Section 09 Divider: RESUME & CURRICULUM VITAE
23. Sheet 22 — Section 09 Content: Official Resume (Drive Preview, Drive Download, Local PDF, Thumbnail)
24. Sheet 23 — Section 10 Divider: LET'S CONNECT (Closing Divider)
25. Sheet 24 — Section 10 Content: Contact & Opportunities (Email, Phone, LinkedIn, GitHub, LeetCode)

--------------------------------------------------------------------------------
RESUME INTEGRATION DETAILS
--------------------------------------------------------------------------------
The dedicated Resume section (Page 23, Sheet 22) includes:
- View Resume (Google Drive preview):
  https://drive.google.com/file/d/1e9qlWm6bp-1-j1EkLLEvM7YLEgjmaJei/view?usp=drive_link
- Download Resume (Google Drive direct download):
  https://drive.google.com/uc?export=download&id=1e9qlWm6bp-1-j1EkLLEvM7YLEgjmaJei
- Local PDF Backup Download:
  assets/resume.pdf (Single-page verified PDF)
- Document Preview Thumbnail:
  assets/resume-preview.jpg

--------------------------------------------------------------------------------
CONDITIONAL PROJECT VIDEO SYSTEM & ASSET MANIFEST
--------------------------------------------------------------------------------
Project demonstration videos render CONDITIONALLY based on actual file existence:
- Structure:
  assets/
    videos/
      wanderlust-demo.mp4       (PRESENT -> 16:9 responsive player rendered)
      invoiceflow-demo.mp4      (OPTIONAL -> rendered only when file is added)
      sprintfounders-demo.mp4   (OPTIONAL -> rendered only when file is added)
      staynest-demo.mp4         (OPTIONAL -> rendered only when file is added)
      streetbites-demo.mp4      (OPTIONAL -> rendered only when file is added)
      manifest.json             (Build-time asset manifest)

- Layout Rules:
  * When video IS available:
    Two-column layout (project details on left, natural-aspect-ratio video player on right).
    Preserves original video aspect ratio with display: block, width: 100%, height: auto,
    max-width: 100%, object-fit: contain, and container adapting to natural dimensions.
    HTML5 controls, playsinline, preload="metadata", zero autoplay with sound.
  * When video IS NOT available:
    Video container is completely omitted. No blue boxes, no placeholders,
    no dummy play icons. The project details expand across the full page width
    in a balanced editorial layout with a 2-column feature breakdown.

- Adding New Videos:
  1. Drop the new MP4 into assets/videos/ (e.g. assets/videos/invoiceflow-demo.mp4).
  2. Run: node sync_video_manifest.mjs
     (or set "available": true in assets/videos/manifest.json).
  3. The website immediately displays the video player and 2-column layout.
================================================================================
