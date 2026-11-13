const sheets = [...document.querySelectorAll('.sheet')];

// 25 labels matching the complete physical sequence
const labels = [
  'COVER',                      // 00
  'INDEX · CONTENTS',          // 01
  'PROFILE',                    // 02
  '01 · ABOUT ME',              // 03
  'ABOUT ME',                   // 04
  '02 · EXPERIENCE',            // 05
  'OPPIDAN INDIA',              // 06
  'PRAYAAS FOUNDATION',         // 07
  '03 · LEADERSHIP',            // 08
  'CODECRAFT X PCCOER',         // 09
  '04 · PROJECTS',              // 10
  'INVOICEFLOW',                // 11
  'SPRINTFOUNDERS',             // 12
  'WANDERLUST',                 // 13
  'STREETBITES',                // 14
  '05 · ACHIEVEMENTS',          // 15
  'ACHIEVEMENTS',               // 16
  '06 · TECHNICAL SKILLS',      // 17
  'TECHNICAL SKILLS',           // 18
  '07 · EDUCATION',             // 19
  'EDUCATION',                  // 20
  '08 · RESUME',                // 21
  'RESUME & CV',                // 22
  '09 · LET\'S CONNECT',        // 23
  'CONTACT'                     // 24
];

// Single source of truth for all sections (powers both the Dedicated Index Page and the TOC Drawer)
const SECTIONS_CONFIG = [
  {
    num: '01',
    title: 'Profile',
    desc: 'Introduction, verified credentials & contact',
    targetSelector: '.sheet.profile',
    quickKey: null
  },
  {
    num: '02',
    title: 'About Me',
    desc: 'Mindset, technical approach & focus areas',
    targetSelector: '.sheet[data-section-id="about"]',
    quickKey: null
  },
  {
    num: '03',
    title: 'Professional Experience',
    desc: 'Oppidan India & Prayaas Youth Foundation',
    targetSelector: '.sheet[data-section-id="experience"]',
    quickKey: 'experience'
  },
  {
    num: '04',
    title: 'Leadership & Community',
    desc: 'President, CodeCraft X PCCOER',
    targetSelector: '.sheet[data-section-id="leadership"]',
    quickKey: null
  },
  {
    num: '05',
    title: 'Selected Projects',
    desc: 'InvoiceFlow, SprintFounders, Wanderlust, StreetBites',
    targetSelector: '.sheet[data-section-id="projects"]',
    quickKey: 'projects'
  },
  {
    num: '06',
    title: 'Achievements & Recognition',
    desc: 'Hackathon finals, competition wins & copyright',
    targetSelector: '.sheet[data-section-id="achievements"]',
    quickKey: null
  },
  {
    num: '07',
    title: 'Technical Skills',
    desc: 'Languages, full stack, databases & Gemini AI',
    targetSelector: '.sheet[data-section-id="skills"]',
    quickKey: 'skills'
  },
  {
    num: '08',
    title: 'Education',
    desc: 'Integrated B.E. Computer Engineering (PCCOER)',
    targetSelector: '.sheet[data-section-id="education"]',
    quickKey: null
  },
  {
    num: '09',
    title: 'Resume',
    desc: 'Official CV · Google Drive & direct download',
    targetSelector: '.sheet[data-section-id="resume"]',
    quickKey: 'resume',
    isResume: true
  },
  {
    num: '10',
    title: 'Contact',
    desc: 'Email, phone, LinkedIn & opportunities',
    targetSelector: '.sheet[data-section-id="contact"]',
    quickKey: 'contact'
  }
];

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const pageLabel = document.getElementById('pageLabel');
const pageCount = document.getElementById('pageCount');
const progressBar = document.getElementById('progressBar');
const hint = document.getElementById('hint');
const soundToggle = document.getElementById('soundToggle');
const wheelToggle = document.getElementById('wheelToggle');
const book = document.getElementById('book');
const bookWrap = document.querySelector('.book-wrap');
const paperStack = document.getElementById('paperStack');
const stackLayers = [...document.querySelectorAll('.stack-layer')];
const remainingCount = document.getElementById('remainingCount');

// TOC drawer elements
const tocBtn = document.getElementById('tocBtn');
const tocCloseBtn = document.getElementById('tocCloseBtn');
const tocBackdrop = document.getElementById('tocBackdrop');
const tocDrawer = document.getElementById('tocDrawer');
const mobileResumeChip = document.querySelector('.mobile-resume-chip');

let current = 0;
let isAnimating = false;
let animTimer = null;
let soundOn = false;
let audioCtx = null;
let wheelEnabled = true;

const PROJECT_VIDEO_MANIFEST = {
  wanderlust: {
    filename: 'wanderlust-demo.mp4',
    path: 'assets/videos/wanderlust-demo.mp4',
    poster: 'assets/wanderlust-poster.jpg',
    title: 'Wanderlust project walkthrough video',
    available: true
  },
  invoiceflow: {
    filename: 'invoiceflow-demo.mp4',
    path: 'assets/videos/invoiceflow-demo.mp4',
    poster: '',
    title: 'InvoiceFlow project walkthrough video',
    available: false
  },
  sprintfounders: {
    filename: 'sprintfounders-demo.mp4',
    path: 'assets/videos/sprintfounders-demo.mp4',
    poster: '',
    title: 'SprintFounders project walkthrough video',
    available: false
  },
  staynest: {
    filename: 'staynest-demo.mp4',
    path: 'assets/videos/staynest-demo.mp4',
    poster: '',
    title: 'StayNest project walkthrough video',
    available: false
  },
  streetbites: {
    filename: 'streetbites-demo.mp4',
    path: 'assets/videos/streetbites-demo.mp4',
    poster: '',
    title: 'StreetBites project walkthrough video',
    available: false
  }
};

function applyProjectMediaConfig(manifest) {
  const projectArticles = document.querySelectorAll('.sheet.project-detail');
  projectArticles.forEach(article => {
    const projectId = article.getAttribute('data-project-id');
    const config = manifest ? manifest[projectId] : null;
    const grid = article.querySelector('.project-grid');
    if (!grid) return;

    const isAvailable = Boolean(config && config.available && config.path);

    if (isAvailable) {
      article.classList.add('has-video');
      article.classList.remove('no-video');
      grid.classList.add('has-video');
      grid.classList.remove('no-video');

      let mediaBox = grid.querySelector('.project-media');
      if (!mediaBox) {
        mediaBox = document.createElement('div');
        mediaBox.className = 'project-media has-video';
        mediaBox.setAttribute('data-video-src', config.path);

        const video = document.createElement('video');
        video.className = 'project-video';
        video.controls = true;
        video.preload = 'metadata';
        video.playsInline = true;
        if (config.poster) video.poster = config.poster;
        video.setAttribute('aria-label', config.title || `${projectId} project walkthrough video`);

        const source = document.createElement('source');
        source.src = config.path;
        source.type = 'video/mp4';
        video.appendChild(source);
        video.appendChild(document.createTextNode('Your browser does not support HTML5 video.'));

        mediaBox.appendChild(video);

        const bodyGroup = grid.querySelector('.project-body-group');
        if (bodyGroup) {
          grid.insertBefore(mediaBox, bodyGroup);
        } else {
          grid.appendChild(mediaBox);
        }
      } else {
        mediaBox.classList.add('has-video');
        const placeholder = mediaBox.querySelector('.video-placeholder');
        if (placeholder) placeholder.remove();

        const video = mediaBox.querySelector('video');
        if (video) {
          video.controls = true;
          video.preload = 'metadata';
          video.playsInline = true;
          if (config.poster && !video.getAttribute('poster')) video.poster = config.poster;
        }
      }
    } else {
      // Completely remove any video containers or placeholders
      article.classList.remove('has-video');
      article.classList.add('no-video');
      grid.classList.remove('has-video');
      grid.classList.add('no-video');

      const mediaBox = grid.querySelector('.project-media');
      if (mediaBox) {
        mediaBox.remove();
      }
    }
  });
}

function initProjectMedia() {
  // 1. Synchronous initial setup with embedded build-time manifest
  applyProjectMediaConfig(PROJECT_VIDEO_MANIFEST);

  // 2. Dynamic check if running on an HTTP/S server
  if (typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
    fetch('assets/videos/manifest.json')
      .then(res => res.ok ? res.json() : null)
      .then(liveManifest => {
        if (liveManifest) {
          applyProjectMediaConfig(liveManifest);
        }
      })
      .catch(() => {});
  }
}

function playFlipSound() {
  if (!soundOn) return;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!audioCtx) audioCtx = new Ctx();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const duration = 0.22;
    const sampleRate = audioCtx.sampleRate;
    const buffer = audioCtx.createBuffer(1, Math.floor(sampleRate * duration), sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const env = Math.sin((i / data.length) * Math.PI);
      data[i] = (Math.random() * 2 - 1) * env * 0.16;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1250, audioCtx.currentTime);
    filter.Q.setValueAtTime(1.1, audioCtx.currentTime);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.32, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start();
  } catch {
    // Ignore audio errors if blocked by browser autoplay policy
  }
}

function updatePaperStack(activeIndex) {
  const totalPages = sheets.length;
  const maxRemaining = totalPages - 1; // 24
  const remaining = Math.max(0, maxRemaining - activeIndex);
  const ratio = maxRemaining > 0 ? remaining / maxRemaining : 0;

  if (remainingCount) {
    remainingCount.textContent =
      remaining === 0
        ? '0 PAGES LEFT'
        : remaining === 1
          ? '1 PAGE LEFT'
          : `${remaining} PAGES LEFT`;
  }

  const isMobile = window.innerWidth <= 650;
  const maxReserve = isMobile ? 10 : 26;
  const reservePx = Math.round(maxReserve * ratio);
  document.documentElement.style.setProperty('--stack-reserve', `${reservePx}px`);

  if (paperStack) {
    paperStack.style.opacity = remaining === 0 ? '0' : '1';
  }

  const activeLayers = Math.ceil(ratio * stackLayers.length);
  stackLayers.forEach((layer, idx) => {
    if (idx >= activeLayers || remaining === 0) {
      layer.style.opacity = '0';
      return;
    }
    const step = idx + 1;
    const insetY = step * (isMobile ? 1.5 : 2.5);
    const offsetX = -Math.min(reservePx, (activeLayers - step) * (isMobile ? 1.4 : 3.5));
    layer.style.opacity = '1';
    layer.style.top = `${insetY}px`;
    layer.style.bottom = `${insetY}px`;
    layer.style.transform = `translateX(${offsetX}px) rotateY(-5deg)`;
    layer.style.zIndex = String(stackLayers.length - idx);
  });
}

// Dynamically compute physical page numbers and synchronize Dedicated Index Page + TOC Drawer
function initSections() {
  const indexList = document.getElementById('indexEntriesList');
  const tocList = document.getElementById('tocEntriesList');

  // Compute dynamic target sheet index and physical page number for each section
  SECTIONS_CONFIG.forEach(sec => {
    const el = document.querySelector(sec.targetSelector);
    sec.targetIndex = el ? sheets.indexOf(el) : -1;
    sec.pageNum = sec.targetIndex >= 0 ? String(sec.targetIndex + 1).padStart(2, '0') : '--';
  });

  // Render or synchronize Dedicated Index Page entries
  if (indexList) {
    indexList.innerHTML = SECTIONS_CONFIG.map((sec, idx) => `
      <li class="index-entry ${sec.isResume ? 'index-entry--resume' : ''}" data-section="${idx}" data-goto="${sec.targetIndex}">
        <button type="button" class="index-entry-btn" data-goto="${sec.targetIndex}" aria-label="Go to Section ${sec.num}: ${sec.title}, page ${sec.pageNum}">
          <span class="index-num">${sec.num}</span>
          <span class="index-title">${sec.title}</span>
          <span class="index-leader" aria-hidden="true"></span>
          <span class="index-page-num">${sec.pageNum}</span>
        </button>
      </li>
    `).join('');
  }

  // Render or synchronize TOC Drawer list
  if (tocList) {
    tocList.innerHTML = SECTIONS_CONFIG.map((sec, idx) => `
      <li class="toc-item ${sec.isResume ? 'toc-item--resume' : ''}" data-section="${idx}">
        <button type="button" class="toc-link" data-goto="${sec.targetIndex}" aria-label="Section ${sec.num}: ${sec.title}">
          <span class="toc-num">${sec.num}</span>
          <div class="toc-info">
            <span class="toc-title">${sec.title}</span>
            <span class="toc-desc">${sec.desc}</span>
          </div>
          <span class="toc-arrow" aria-hidden="true">→</span>
        </button>
      </li>
    `).join('');
  }

  // Synchronize Quick Access header buttons & TOC quick pills
  SECTIONS_CONFIG.forEach(sec => {
    if (sec.quickKey && sec.targetIndex >= 0) {
      document.querySelectorAll(`[data-section-key="${sec.quickKey}"]`).forEach(btn => {
        btn.setAttribute('data-goto', String(sec.targetIndex));
      });
    }
  });

  wireNavigationButtons();
}

function wireNavigationButtons() {
  document.querySelectorAll('[data-goto]').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const target = parseInt(btn.getAttribute('data-goto'), 10);
      if (!isNaN(target)) {
        closeTOC();
        turnTo(target);
      }
    };
  });
}

function getActiveSectionIndex(pageIndex) {
  const validSections = SECTIONS_CONFIG.filter(s => s.targetIndex >= 0);
  if (!validSections.length || pageIndex < validSections[0].targetIndex) {
    return -1; // Cover (0) or Dedicated Index (1)
  }
  for (let i = validSections.length - 1; i >= 0; i--) {
    if (pageIndex >= validSections[i].targetIndex) {
      return i;
    }
  }
  return -1;
}

function syncNavigationHighlights(pageIndex) {
  const activeSec = getActiveSectionIndex(pageIndex);

  // Sync Dedicated Index Page entries
  document.querySelectorAll('.index-entry').forEach(item => {
    const sec = parseInt(item.getAttribute('data-section'), 10);
    item.classList.toggle('active', sec === activeSec);
  });

  // Sync TOC Drawer items
  document.querySelectorAll('.toc-item').forEach(item => {
    const sec = parseInt(item.getAttribute('data-section'), 10);
    item.classList.toggle('active', sec === activeSec);
  });

  // Sync Quick Access header links & TOC pills
  const activeConfig = SECTIONS_CONFIG[activeSec];
  const activeKey = activeConfig ? activeConfig.quickKey : null;

  document.querySelectorAll('.quick-link').forEach(link => {
    const key = link.getAttribute('data-section-key');
    link.classList.toggle('active', Boolean(key && key === activeKey));
  });

  document.querySelectorAll('.toc-pill').forEach(pill => {
    const key = pill.getAttribute('data-section-key');
    pill.classList.toggle('active', Boolean(key && key === activeKey));
  });

  // Sync mobile resume chip
  if (mobileResumeChip) {
    mobileResumeChip.classList.toggle('active', activeKey === 'resume');
  }
}

function updateUI() {
  prev.disabled = current === 0;
  next.disabled = current === sheets.length - 1;
  pageLabel.textContent = labels[current] || 'PORTFOLIO';
  pageCount.textContent =
    String(current + 1).padStart(2, '0') + ' / ' + String(sheets.length).padStart(2, '0');
  progressBar.style.width = ((current + 1) / sheets.length) * 100 + '%';
  next.querySelector('span').textContent =
    current === 0 ? 'OPEN FILE' : current === sheets.length - 1 ? 'END OF FILE' : 'NEXT PAGE';
  hint.textContent =
    current === 0
      ? 'SCROLL OR USE THE ARROWS TO OPEN YOUR FILE'
      : 'SCROLL OR USE THE ARROWS TO TURN PAGES';
  updatePaperStack(current);
  syncNavigationHighlights(current);
}

function syncRestingState(activeIndex) {
  sheets.forEach((sheet, i) => {
    sheet.classList.add('no-transition');
    sheet.classList.remove('is-turning');
    if (i < activeIndex) {
      sheet.classList.add('flipped');
      sheet.style.visibility = 'hidden';
      sheet.style.zIndex = String(i + 1);
      sheet.setAttribute('aria-hidden', 'true');
    } else if (i === activeIndex) {
      sheet.classList.remove('flipped');
      sheet.style.visibility = 'visible';
      sheet.style.zIndex = '20';
      sheet.removeAttribute('aria-hidden');
    } else {
      sheet.classList.remove('flipped');
      sheet.style.visibility = 'hidden';
      sheet.style.zIndex = String(sheets.length - i);
      sheet.setAttribute('aria-hidden', 'true');
    }
    void sheet.offsetWidth;
    sheet.classList.remove('no-transition');
  });
}

function finishAnimation(targetIndex) {
  if (animTimer) {
    clearTimeout(animTimer);
    animTimer = null;
  }
  syncRestingState(targetIndex);
  isAnimating = false;
}

function turnTo(n, immediate = false) {
  n = Math.max(0, Math.min(sheets.length - 1, n));
  if (n === current) return;

  if (isAnimating) {
    finishAnimation(current);
  }

  const from = current;
  const to = n;
  current = to;
  updateUI();
  playFlipSound();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || immediate) {
    syncRestingState(to);
    return;
  }

  isAnimating = true;

  sheets.forEach((sheet, i) => {
    if (i !== from && i !== to) {
      sheet.style.visibility = 'hidden';
      sheet.style.zIndex = '1';
      sheet.setAttribute('aria-hidden', 'true');
    }
  });

  const fromSheet = sheets[from];
  const toSheet = sheets[to];
  const isMobile = window.innerWidth <= 650;
  const animDuration = isMobile ? 650 : 1380;

  if (to > from) {
    toSheet.classList.add('no-transition');
    toSheet.classList.remove('flipped', 'is-turning');
    toSheet.style.visibility = 'visible';
    toSheet.style.zIndex = '10';
    toSheet.removeAttribute('aria-hidden');
    void toSheet.offsetWidth;
    toSheet.classList.remove('no-transition');

    fromSheet.classList.add('no-transition');
    fromSheet.classList.remove('flipped');
    fromSheet.style.visibility = 'visible';
    fromSheet.style.zIndex = '20';
    void fromSheet.offsetWidth;
    fromSheet.classList.remove('no-transition');

    fromSheet.classList.add('is-turning', 'flipped');

    const onEnd = e => {
      if (e.target !== fromSheet || e.propertyName !== 'transform') return;
      fromSheet.removeEventListener('transitionend', onEnd);
      finishAnimation(to);
    };
    fromSheet.addEventListener('transitionend', onEnd);
    animTimer = setTimeout(() => {
      fromSheet.removeEventListener('transitionend', onEnd);
      finishAnimation(to);
    }, animDuration);
  } else {
    fromSheet.classList.add('no-transition');
    fromSheet.classList.remove('flipped', 'is-turning');
    fromSheet.style.visibility = 'visible';
    fromSheet.style.zIndex = '10';
    void fromSheet.offsetWidth;
    fromSheet.classList.remove('no-transition');

    toSheet.classList.add('no-transition');
    toSheet.classList.add('flipped');
    toSheet.style.visibility = 'visible';
    toSheet.style.zIndex = '20';
    toSheet.removeAttribute('aria-hidden');
    void toSheet.offsetWidth;
    toSheet.classList.remove('no-transition');

    toSheet.classList.add('is-turning');
    toSheet.classList.remove('flipped');

    const onEnd = e => {
      if (e.target !== toSheet || e.propertyName !== 'transform') return;
      toSheet.removeEventListener('transitionend', onEnd);
      finishAnimation(to);
    };
    toSheet.addEventListener('transitionend', onEnd);
    animTimer = setTimeout(() => {
      toSheet.removeEventListener('transitionend', onEnd);
      finishAnimation(to);
    }, animDuration);
  }
}

// Table of Contents Drawer Open / Close
function openTOC() {
  if (!tocDrawer) return;
  tocDrawer.classList.add('open');
  if (tocBackdrop) tocBackdrop.classList.add('open');
  if (tocBtn) tocBtn.setAttribute('aria-expanded', 'true');
  tocDrawer.setAttribute('aria-hidden', 'false');
  if (tocBackdrop) tocBackdrop.setAttribute('aria-hidden', 'false');
  if (tocCloseBtn) tocCloseBtn.focus();
}

function closeTOC() {
  if (!tocDrawer) return;
  tocDrawer.classList.remove('open');
  if (tocBackdrop) tocBackdrop.classList.remove('open');
  if (tocBtn) {
    tocBtn.setAttribute('aria-expanded', 'false');
    tocBtn.focus();
  }
  tocDrawer.setAttribute('aria-hidden', 'true');
  if (tocBackdrop) tocBackdrop.setAttribute('aria-hidden', 'true');
}

if (tocBtn) tocBtn.addEventListener('click', openTOC);
if (tocCloseBtn) tocCloseBtn.addEventListener('click', closeTOC);
if (tocBackdrop) tocBackdrop.addEventListener('click', closeTOC);

prev.addEventListener('click', () => turnTo(current - 1));
next.addEventListener('click', () => turnTo(current + 1));

// Wheel toggle control
if (wheelToggle) {
  wheelToggle.addEventListener('click', () => {
    wheelEnabled = !wheelEnabled;
    wheelToggle.setAttribute('aria-pressed', String(wheelEnabled));
    wheelToggle.title = wheelEnabled
      ? 'Toggle scroll page turning (currently ON)'
      : 'Toggle scroll page turning (currently OFF)';
  });
}

// Scoped mouse wheel navigation: ONLY on .book-wrap, never hijacking whole page or TOC drawer
let wheelLocked = false;
let wheelMinUntil = 0;
let wheelIdleTimer = null;

function releaseWheelLockWhenIdle() {
  if (wheelIdleTimer) clearTimeout(wheelIdleTimer);
  const wait = Math.max(180, wheelMinUntil - Date.now());
  wheelIdleTimer = setTimeout(() => {
    if (Date.now() >= wheelMinUntil) {
      wheelLocked = false;
    } else {
      releaseWheelLockWhenIdle();
    }
  }, wait);
}

const scrollTarget = bookWrap || book;
if (scrollTarget) {
  scrollTarget.addEventListener(
    'wheel',
    e => {
      if (!wheelEnabled) return;
      if (Math.abs(e.deltaY) < 14) return;
      e.preventDefault();
      if (!wheelLocked && !isAnimating) {
        wheelLocked = true;
        wheelMinUntil = Date.now() + 1100;
        turnTo(current + (e.deltaY > 0 ? 1 : -1));
      }
      releaseWheelLockWhenIdle();
    },
    { passive: false }
  );
}

// Mobile touch swipe navigation (horizontal left/right + vertical up/down)
let startX = 0;
let startY = 0;
let touchStartedOnInteractive = false;

if (scrollTarget) {
  scrollTarget.addEventListener(
    'touchstart',
    e => {
      if (e.touches.length !== 1) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      touchStartedOnInteractive = Boolean(e.target.closest('a, button, video, input, select'));
    },
    { passive: true }
  );

  scrollTarget.addEventListener(
    'touchend',
    e => {
      if (touchStartedOnInteractive || e.changedTouches.length !== 1) return;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 36 && Math.abs(dx) >= Math.abs(dy)) {
        turnTo(current + (dx < 0 ? 1 : -1));
      } else if (Math.abs(dy) > 42 && Math.abs(dy) > Math.abs(dx) * 1.2) {
        turnTo(current + (dy < 0 ? 1 : -1));
      }
    },
    { passive: true }
  );
}

soundToggle.addEventListener('click', () => {
  soundOn = !soundOn;
  soundToggle.style.opacity = soundOn ? '1' : '.55';
  soundToggle.textContent = soundOn ? '♫' : '♪';
});

// Comprehensive keyboard navigation
document.addEventListener('keydown', e => {
  if (e.target instanceof Element && e.target.matches('input, textarea, select, [contenteditable="true"]')) {
    return;
  }

  if (e.key === 'Escape') {
    if (tocDrawer && tocDrawer.classList.contains('open')) {
      e.preventDefault();
      closeTOC();
      return;
    }
  }

  if (e.key === 'Home') {
    e.preventDefault();
    turnTo(0);
    return;
  }

  if (e.key === 'End') {
    e.preventDefault();
    turnTo(sheets.length - 1);
    return;
  }

  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) {
    if (e.key === ' ' && e.target.closest('a, button, video')) return;
    e.preventDefault();
    turnTo(current + 1);
  } else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) {
    e.preventDefault();
    turnTo(current - 1);
  }
});

window.addEventListener('resize', () => {
  updatePaperStack(current);
});

// Initialization
initProjectMedia();
initSections();
syncRestingState(0);
updateUI();
