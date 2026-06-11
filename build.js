import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { join, dirname, relative, extname, basename } from 'path';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = ROOT;
const DEST = join(ROOT, '_site');
const WIKI_NAME = 'Cloudflare Curriculum Wiki';

const CATEGORY_LABELS = {
  concepts: 'Concepts',
  entities: 'Entities',
  skills: 'Skills',
  references: 'References',
  synthesis: 'Synthesis',
  journal: 'Journal',
  projects: 'Projects',
};

const CATEGORY_ICONS = {
  concepts: '&#128196;',
  entities: '&#127970;',
  skills: '&#128736;',
  references: '&#128214;',
  synthesis: '&#129518;',
  journal: '&#128340;',
  projects: '&#128187;',
};

function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: text };
  const frontmatter = {};
  for (const line of match[1].split('\n')) {
    const sep = line.indexOf(':');
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    let val = line.slice(sep + 1).trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
    }
    frontmatter[key] = val;
  }
  return { frontmatter, body: match[2] };
}

function resolveWikilinks(body, filePath) {
  const fileDir = dirname(filePath);
  return body.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, display) => {
    let href;
    if (target.includes('/')) {
      href = '/' + target + '.html';
    } else {
      const catDir = basename(dirname(filePath));
      href = '/' + catDir + '/' + target + '.html';
    }
    const label = display || target.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return `<a href="${href}">${label}</a>`;
  });
}

const SKIP_DIRS = new Set(['node_modules', '_site', '.git']);
function collectPages(dir) {
  const pages = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name) || entry.name.startsWith('.')) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      pages.push(...collectPages(full));
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md' && entry.name !== 'log.md') {
      const rel = relative(SRC, full);
      const categories = rel.split('/');
      const category = categories.length > 1 ? categories[0] : 'uncategorized';
      pages.push({ path: full, rel, category, name: entry.name.replace(/\.md$/, '') });
    }
  }
  return pages;
}

function buildSidebar(pages) {
  const grouped = {};
  for (const p of pages) {
    const cat = p.category;
    if (['_site', '.git', 'node_modules'].includes(cat) || cat.startsWith('.')) continue;
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(p);
  }
  const order = ['concepts', 'entities', 'skills', 'references', 'synthesis', 'journal', 'projects'];
  let html = '';
  for (const cat of order) {
    const items = grouped[cat];
    if (!items) continue;
    const label = CATEGORY_LABELS[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
    const icon = CATEGORY_ICONS[cat] || '';
    html += `<li class="cat"><span class="cat-label">${icon} ${label}</span><ul>`;
    for (const p of items) {
      const title = p.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
      const href = '/' + p.rel.replace(/\.md$/, '.html');
      html += `<li><a href="${href}">${title}</a></li>`;
    }
    html += `</ul></li>`;
  }
  return '<ul class="nav-tree">' + html + '</ul>';
}

function renderPage(title, content, sidebar, currentPath) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} — ${WIKI_NAME}</title>
<link rel="stylesheet" href="/style.css">
</head>
<body>
<header class="topbar">
  <a href="/" class="logo">&#128218; ${WIKI_NAME}</a>
  <input type="text" id="search" placeholder="Search wiki..." oninput="searchWiki(this.value)">
</header>
<div class="layout">
  <nav class="sidebar" id="sidebar">${sidebar}</nav>
  <main class="content">${content}</main>
</div>
<script>
const pages = ${JSON.stringify(buildPageIndex())};
function searchWiki(query) {
  const sidebar = document.getElementById('sidebar');
  if (!query.trim()) { sidebar.innerHTML = ${JSON.stringify(sidebar)}; return; }
  const q = query.toLowerCase();
  const links = sidebar.querySelectorAll('a');
  // handled by full page JS below
}
document.addEventListener('DOMContentLoaded', () => {
  const current = location.pathname;
  document.querySelectorAll('.sidebar a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
});
</script>
</body>
</html>`;
}

function buildPageIndex() {
  const all = collectPages(SRC);
  return all.map(p => ({
    title: p.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    href: '/' + p.rel.replace(/\.md$/, '.html'),
    category: CATEGORY_LABELS[p.category] || p.category,
    path: p.rel,
  }));
}

// ---------- BUILD ----------
console.log('Building wiki site...');

// Clean and create dest
try { mkdirSync(DEST, { recursive: true }); } catch {}

const pages = collectPages(SRC);
const sidebar = buildSidebar(pages);

// Track all generated paths for index
const allPaths = [];

for (const p of pages) {
  const text = readFileSync(p.path, 'utf-8');
  const { frontmatter, body } = parseFrontmatter(text);
  const resolvedBody = resolveWikilinks(body, p.path);
  const htmlContent = marked.parse(resolvedBody);

  const title = frontmatter.title || p.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const fullHtml = renderPage(title, htmlContent, sidebar, p.rel);

  const outPath = join(DEST, p.rel.replace(/\.md$/, '.html'));
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, fullHtml, 'utf-8');

  const link = '/' + p.rel.replace(/\.md$/, '.html');
  allPaths.push({ title, link, category: CATEGORY_LABELS[p.category] || p.category, name: p.name });
  console.log(`  ${link}`);
}

// Build index page
const indexMd = readFileSync(join(SRC, 'index.md'), 'utf-8');
const { frontmatter: idxFm, body: idxBody } = parseFrontmatter(indexMd);
const resolvedIdx = resolveWikilinks(idxBody, join(SRC, 'index.md'));

let indexContent = marked.parse(resolvedIdx);
indexContent += '<h2>All Pages</h2><ul class="page-list">';
const order = ['concepts', 'entities', 'skills', 'references', 'synthesis', 'journal', 'projects'];
for (const cat of order) {
  const label = CATEGORY_LABELS[cat];
  const items = allPaths.filter(p => p.category === label);
  if (items.length === 0) continue;
  indexContent += `<li><strong>${CATEGORY_ICONS[cat]} ${label}</strong><ul>`;
  for (const item of items) {
    indexContent += `<li><a href="${item.link}">${item.title}</a></li>`;
  }
  indexContent += '</ul></li>';
}
indexContent += '</ul>';

const indexHtml = renderPage('Home', indexContent, sidebar, 'index.md');
writeFileSync(join(DEST, 'index.html'), indexHtml, 'utf-8');
allPaths.unshift({ title: 'Home', link: '/', category: '' });

// Also build log page
const logPath = join(SRC, 'log.md');
if (existsSync(logPath)) {
  const logText = readFileSync(logPath, 'utf-8');
  const logHtml = marked.parse(logText);
  const logPage = renderPage('Change Log', logHtml, sidebar, 'log.md');
  writeFileSync(join(DEST, 'log.html'), logPage, 'utf-8');
}

// CSS
writeFileSync(join(DEST, 'style.css'), `/* ---- Reset ---- */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-size:16px;scroll-behavior:smooth}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,sans-serif;background:#0d1117;color:#e6edf3;display:flex;flex-direction:column;min-height:100vh}

/* ---- Top Bar ---- */
.topbar{position:sticky;top:0;z-index:100;display:flex;align-items:center;gap:1rem;padding:.75rem 1.5rem;background:#161b22;border-bottom:1px solid #30363d;height:56px}
.logo{font-size:1.1rem;font-weight:600;color:#f0f6fc;text-decoration:none;white-space:nowrap}
#search{flex:1;max-width:400px;padding:.5rem .75rem;border:1px solid #30363d;border-radius:6px;background:#0d1117;color:#e6edf3;font-size:.875rem;outline:none}
#search:focus{border-color:#58a6ff}

/* ---- Layout ---- */
.layout{display:flex;flex:1}
.sidebar{width:260px;min-width:260px;background:#161b22;border-right:1px solid #30363d;padding:1rem 0;overflow-y:auto;height:calc(100vh - 56px);position:sticky;top:56px;font-size:.875rem}
.content{flex:1;padding:2rem 3rem;max-width:960px;line-height:1.7}

/* ---- Sidebar ---- */
.nav-tree{list-style:none;padding:0}
.nav-tree .cat{margin-bottom:.25rem}
.nav-tree .cat-label{display:block;padding:.4rem 1rem;font-weight:600;color:#8b949e;text-transform:uppercase;font-size:.75rem;letter-spacing:.05em}
.nav-tree ul{list-style:none;padding:0}
.nav-tree ul li a{display:block;padding:.3rem 1rem .3rem 2rem;color:#c9d1d9;text-decoration:none;border-left:2px solid transparent;transition:all .15s}
.nav-tree ul li a:hover{background:#1c2128;color:#58a6ff}
.nav-tree ul li a.active{border-left-color:#58a6ff;color:#58a6ff;background:#1c2128}

/* ---- Content ---- */
.content h1{border-bottom:1px solid #30363d;padding-bottom:.5rem;margin-bottom:1.5rem;font-size:2rem;font-weight:600}
.content h2{margin-top:2rem;margin-bottom:.75rem;font-size:1.5rem;font-weight:600}
.content h3{margin-top:1.5rem;margin-bottom:.5rem;font-size:1.25rem;font-weight:600}
.content p{margin-bottom:1rem}
.content a{color:#58a6ff;text-decoration:none}
.content a:hover{text-decoration:underline}
.content ul,.content ol{margin-bottom:1rem;padding-left:1.5rem}
.content li{margin-bottom:.25rem}
.content code{background:#1c2128;padding:.15em .4em;border-radius:4px;font-size:.875em;font-family:'SF Mono','Fira Code','Monaco',monospace}
.content pre{background:#1c2128;padding:1rem;border-radius:8px;overflow-x:auto;margin-bottom:1rem;border:1px solid #30363d}
.content pre code{background:none;padding:0;font-size:.875rem;line-height:1.5}
.content blockquote{border-left:3px solid #30363d;padding:.5rem 1rem;margin:0 0 1rem;color:#8b949e}
.content table{width:100%;border-collapse:collapse;margin-bottom:1rem}
.content th,.content td{padding:.5rem .75rem;border:1px solid #30363d;text-align:left}
.content th{background:#1c2128;font-weight:600}
.content img{max-width:100%;border-radius:6px}

/* ---- Page List ---- */
.page-list{list-style:none;padding:0}
.page-list>li{margin-bottom:1rem}
.page-list>li>ul{list-style:none;padding:0;margin-top:.25rem}
.page-list>li>ul li{padding:.15rem 0}
.page-list a{color:#58a6ff;text-decoration:none}
.page-list a:hover{text-decoration:underline}
.page-list strong{color:#f0f6fc}

/* ---- Responsive ---- */
@media(max-width:768px){
  .sidebar{display:none}
  .content{padding:1.5rem}
}
`);

console.log('\nDone!  Site generated in _site/');
console.log(`  Pages: ${allPaths.length}`);
console.log('  Open _site/index.html in your browser or run: npm run serve');
