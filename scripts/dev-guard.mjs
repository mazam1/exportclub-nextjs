import fs from 'node:fs';
import path from 'node:path';

const log = (msg) => console.log(`[dev-guard] ${msg}`);
const warn = (msg) => console.warn(`[dev-guard] ${msg}`);
const err = (msg) => console.error(`[dev-guard] ${msg}`);

const projectRoot = process.cwd();
const lockPath = path.join(projectRoot, '.next', 'dev', 'lock');

const parsePid = (content) => {
  if (!content) return null;
  const m = content.match(/pid\s*[:=]\s*(\d+)/i) || content.match(/\b(\d{2,})\b/);
  return m ? parseInt(m[1], 10) : null;
};

const processAlive = (pid) => {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (_) {
    return false;
  }
};

const removeLock = () => {
  try {
    fs.rmSync(lockPath, { force: true });
    return true;
  } catch (_) {
    return false;
  }
};

try {
  if (!fs.existsSync(lockPath)) {
    log('No dev lock present');
    process.exit(0);
  }
  let content = '';
  try {
    content = fs.readFileSync(lockPath, 'utf8');
  } catch (_) {}
  const pid = parsePid(content);
  if (processAlive(pid)) {
    err(`Another dev instance appears active (pid ${pid}).`);
    err('Terminate the other process, then re-run dev.');
    process.exit(1);
  }
  const removed = removeLock();
  if (removed) {
    log('Removed stale dev lock');
    process.exit(0);
  } else {
    warn('Could not remove stale dev lock; continuing');
    process.exit(0);
  }
} catch (e) {
  err(`Guard failed: ${e && e.message ? e.message : e}`);
  process.exit(0);
}