const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

// Resolved once at build time so every surface (cards, byline, schema,
// sitemap) reports the same "today".
const BUILD_TODAY = startOfToday();

export function parseDate(value) {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function publishedDate(blog) {
  return parseDate(blog?.date) || parseDate(blog?.updatedDate) || BUILD_TODAY;
}

export function modifiedDate(blog) {
  const updated = parseDate(blog?.updatedDate);
  return updated && updated > BUILD_TODAY ? updated : BUILD_TODAY;
}

export function toIso(value) {
  const d = parseDate(value);
  return d ? d.toISOString() : undefined;
}

const formatDateValue = (value, short) => {
  const d = parseDate(value);
  if (!d) return "";
  const month = short ? MONTHS_SHORT[d.getMonth()] : MONTHS_LONG[d.getMonth()];
  return `${month} ${d.getDate()}, ${d.getFullYear()}`;
};

export function formatLong(value) {
  return formatDateValue(value, false);
}

export function formatShort(value) {
  return formatDateValue(value, true);
}

// Dates shown to visitors always reflect the latest update (build date).
export function displayDate(blog) {
  return formatShort(modifiedDate(blog));
}

export function displayDateLong(blog) {
  return formatLong(modifiedDate(blog));
}
