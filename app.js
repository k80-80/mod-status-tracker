const $ = id => document.getElementById(id);
let board;
function node(tag, text, cls) {
  const el = document.createElement(tag);

  if (text !== undefined) el.textContent = text;
  if (cls) el.className = cls;

  return el;
}
function link(label, url) {
  try {
    const u = new URL(url);

    if (!['https:', 'http:'].includes(u.protocol)) {
      return node('span', label);
    }

    const a = node('a', label);
    a.href = u.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    return a;
  } catch {
    return node('span', label);
  }
}
function date(value) {
  if (!value) return 'Not Specified';

  const d = new Date(value);

  return isNaN(d)
    ? value
    : d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC'
      });
}
function description(text) {
  const el = node('p', undefined, 'description');
  const re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)(?:\s+[^)]*)?\)|(https?:\/\/[^\s<>]+)/g;
  let last = 0;

  for (const m of text.matchAll(re)) {
    el.append(document.createTextNode(text.slice(last, m.index)));
    el.append(link(m[1] || m[3], m[2] || m[3]));
    last = m.index + m[0].length;
  }

  el.append(document.createTextNode(text.slice(last)));
  return el;
}
function card(mod) {
  const el = node('details', undefined, 'card'),
    summary = node('summary');

  summary.append(
    node(
      'span',
      mod.status === 'Compatible' ? '✓ Compatible' : 'Retired',
      'badge' + (mod.status === 'Retired' ? ' fix' : '')
    )
  );

  if (mod.recent) {
    summary.append(node('span', 'Recently Updated/New', 'badge recent'));
  }

  const heading = node('div', undefined, 'card-heading');

  if (mod.icon) {
    const icon = document.createElement('img');
    icon.className = 'card-icon';
    icon.src = mod.icon;
    icon.alt = '';
    icon.loading = 'lazy';
    heading.append(icon);
  }

  heading.append(node('strong', mod.name, 'title notranslate'));
  summary.append(heading);

  const metadata = [
    mod.fields['Mod Type'],
    mod.fields['Mod Status']
  ].filter(Boolean).join(' · ');

  if (metadata) {
    summary.append(node('span', metadata, 'meta'));
  }

  const body = node('div', undefined, 'details');
  body.append(
    description(mod.description || '')
  );

  const dl = node('dl', undefined, 'fields');

  for (const field of board.customFields) {
    if (['Mod Type', 'Mod Status'].includes(field.name) && !mod.fields[field.name]) continue;

    const row = node('div');

    row.append(
      node('dt', field.name),
      node(
        'dd',
        field.type === 'date'
          ? date(mod.fields[field.name])
          : mod.fields[field.name] ?? 'Not Specified'
      )
    );

    dl.append(row);
  }

  body.append(dl);

  el.append(summary, body);

  return el;
}
function render() {
  const q = $('search').value.toLowerCase().trim();
  const status = $('status').value;

  let mods = board.mods.filter(
    m =>
      (!q ||
        [
          m.name,
          m.description,
          ...Object.values(m.fields)
        ]
          .join(' ')
          .toLowerCase()
          .includes(q)) &&
      (!status || (status === 'recent' ? m.recent : m.status === status)) &&
      (!$('type').value || m.fields['Mod Type'] === $('type').value) &&
      (!$('access').value || m.fields['Mod Status'] === $('access').value)
  );

  mods.sort(
    $('sort').value === 'updated'
      ? (a, b) =>
          (b.fields['Last Updated'] || '').localeCompare(
            a.fields['Last Updated'] || ''
          ) || a.name.localeCompare(b.name)
      : (a, b) => a.name.localeCompare(b.name)
  );

  $('result').textContent = `Showing ${mods.length} of ${board.mods.length} Mods`;
  $('mods').replaceChildren(...mods.map(card));

  if (!mods.length) {
    $('mods').append(
      node(
        'p',
        'No mods match. Try another search or reset the filters.',
        'empty'
      )
    );
  }
}
function init() {
  try {
    board = window.MOD_TRACKER_DATA;

    if (!board || !Array.isArray(board.mods)) {
      throw Error('Bundled data missing');
    }
    $('patch').textContent = date(board.patchDate);

    const stats = [
      ['All Mods', board.mods.length],
      ['Compatible', board.mods.filter(m => m.status === 'Compatible').length],
      ['Retired', board.mods.filter(m => m.status === 'Retired').length]
    ];

    for (const [label, count] of stats) {
      const el = node('div', undefined, 'stat');
      el.append(node('strong', String(count)), node('span', label));
      $('stats').append(el);
    }

    for (const [id, field] of [
      ['type', 'Mod Type'],
      ['access', 'Mod Status']
    ]) {
      for (const value of [
        ...new Set(board.mods.map(m => m.fields[field]).filter(Boolean))
      ].sort()) {
        const o = node('option', value);
        o.value = value;
        $(id).append(o);
      }
    }

    for (const item of board.information) {
      const d = node('details'),
        s = node('summary', item.name);

      d.append(s, description(item.description || 'No additional notes.'));
      $('information').append(d);
    }

    render();
  } catch (error) {
    $('result').textContent =
      'The bundled mod data is missing. Extract the full ZIP, including the data folder, and open index.html again.';
    $('result').className = 'error';
    console.error(error);
  }
}
$('filters').addEventListener('submit', e => e.preventDefault());
$('filters').addEventListener('input', () => board && render());
$('filters').addEventListener('reset', () =>
  setTimeout(() => board && render(), 0)
);

init();
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  let dark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  try {
    const savedTheme = localStorage.getItem('mt-theme');

    if (savedTheme !== null) {
      dark = savedTheme === 'dark';
    }
  } catch {}

  function applyTheme() {
    document.body.classList.toggle('dark', dark);
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.textContent = dark ? '☀ Light Mode' : '◐ Dark Mode';
  }

  themeToggle.addEventListener('click', () => {
    dark = !dark;
    applyTheme();

    try {
      localStorage.setItem('mt-theme', dark ? 'dark' : 'light');
    } catch {}
  });

  applyTheme();
}

const translateToggle = document.getElementById('translate-toggle');
const translateHelp = document.getElementById('translate-help');

if (translateToggle && translateHelp) {
  function closeTranslateHelp() {
    translateHelp.hidden = true;
    translateToggle.setAttribute('aria-expanded', 'false');
  }

  translateToggle.addEventListener('click', event => {
    event.stopPropagation();
    translateHelp.hidden = !translateHelp.hidden;
    translateToggle.setAttribute('aria-expanded', String(!translateHelp.hidden));
  });

  document.addEventListener('click', event => {
    if (!translateHelp.hidden && !translateHelp.contains(event.target)) {
      closeTranslateHelp();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !translateHelp.hidden) {
      closeTranslateHelp();
      translateToggle.focus();
    }
  });
}

document.querySelectorAll('code, .site-logo').forEach(element => {
  element.setAttribute('translate', 'no');
  element.classList.add('notranslate');
});
