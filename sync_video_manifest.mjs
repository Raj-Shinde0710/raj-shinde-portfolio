/**
 * sync_video_manifest.mjs
 * 
 * Scans assets/videos/ on disk to check which project demo videos actually exist.
 * Updates assets/videos/manifest.json with available: true/false.
 * 
 * Usage: node sync_video_manifest.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VIDEOS_DIR = path.join(__dirname, 'assets', 'videos');
const MANIFEST_PATH = path.join(VIDEOS_DIR, 'manifest.json');

const PROJECT_CONFIG = {
  wanderlust: {
    filename: 'wanderlust-demo.mp4',
    poster: 'assets/wanderlust-poster.jpg',
    title: 'Wanderlust project walkthrough video'
  },
  invoiceflow: {
    filename: 'invoiceflow-demo.mp4',
    poster: '',
    title: 'InvoiceFlow project walkthrough video'
  },
  sprintfounders: {
    filename: 'sprintfounders-demo.mp4',
    poster: '',
    title: 'SprintFounders project walkthrough video'
  },
  staynest: {
    filename: 'staynest-demo.mp4',
    poster: '',
    title: 'StayNest project walkthrough video'
  },
  streetbites: {
    filename: 'streetbites-demo.mp4',
    poster: '',
    title: 'StreetBites project walkthrough video'
  }
};

const manifest = {};

for (const [projectId, cfg] of Object.entries(PROJECT_CONFIG)) {
  const filePath = path.join(VIDEOS_DIR, cfg.filename);
  const exists = fs.existsSync(filePath);
  
  manifest[projectId] = {
    filename: cfg.filename,
    path: `assets/videos/${cfg.filename}`,
    poster: cfg.poster,
    title: cfg.title,
    available: exists
  };

  console.log(`[${projectId}] ${cfg.filename} => ${exists ? '✓ AVAILABLE' : '✗ NOT FOUND (Video omitted)'}`);
}

fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8');
console.log(`\nUpdated manifest written to: ${MANIFEST_PATH}`);

