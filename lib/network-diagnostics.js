'use client';

const DIAGNOSTIC_ENDPOINT = 'https://api.bigdatacloud.net/data';
const STORAGE_PREFIX = 'rankstack:net:v1:';
const CACHE_MAX_AGE = 15 * 60 * 1000;

const CACHE_KEYS = {
  ipAddress: `${STORAGE_PREFIX}ip-address`,
  connectionProfile: `${STORAGE_PREFIX}connection-profile`,
  locationProfile: `${STORAGE_PREFIX}location-profile`,
};

const inFlight = new Map();

const asText = (value) => {
  if (value === null || value === undefined) return '';
  return typeof value === 'string' ? value : String(value);
};

const asBoolean = (value) =>
  value === true || value === 'true' || value === 1 || value === '1';

const firstValue = (...values) =>
  values.find(
    (value) =>
      value !== null &&
      value !== undefined &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0)
  ) ?? '';

const asNumberOrNull = (value) => {
  if (value === null || value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const messageOf = (error) =>
  error instanceof Error ? error.message : asText(error) || 'Unknown error';

function ensureBrowser() {
  if (typeof window === 'undefined') {
    throw new Error('Live diagnostics can only run in the browser.');
  }
}

function httpErrorMessage(status) {
  switch (status) {
    case 400:
      return 'The lookup request was rejected (400). Please run a re-scan.';
    case 401:
      return 'The lookup service rejected this request (401). Please try again later.';
    case 402:
      return 'The lookup quota is currently unavailable (402). Please try again later.';
    case 500:
    case 502:
    case 503:
    case 504:
      return 'The lookup service is temporarily unavailable. Please try again.';
    default:
      return `The lookup failed with HTTP ${status}.`;
  }
}

async function fetchJson(path) {
  ensureBrowser();

  let response;
  try {
    response = await fetch(`${DIAGNOSTIC_ENDPOINT}${path}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
      credentials: 'omit',
    });
  } catch {
    throw new Error('Network error. Check your connection and try again.');
  }

  if (!response.ok) {
    throw new Error(httpErrorMessage(response.status));
  }

  try {
    return await response.json();
  } catch {
    throw new Error('The lookup service returned an unreadable response.');
  }
}

function readSession(key) {
  try {
    ensureBrowser();
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (
      !entry ||
      typeof entry.savedAt !== 'number' ||
      Date.now() - entry.savedAt > CACHE_MAX_AGE
    ) {
      window.sessionStorage.removeItem(key);
      return null;
    }
    return entry.value;
  } catch {
    return null;
  }
}

function writeSession(key, value) {
  try {
    ensureBrowser();
    window.sessionStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), value }));
  } catch {
    return null;
  }
}

function clearSession(key) {
  try {
    ensureBrowser();
    window.sessionStorage.removeItem(key);
  } catch {
    return null;
  }
}

function cachedFetch(key, path, force = false) {
  ensureBrowser();

  if (force) {
    clearSession(key);
  } else {
    const cached = readSession(key);
    if (cached) return Promise.resolve(cached);
  }

  const flightKey = force ? `${key}:force` : key;
  if (inFlight.has(flightKey)) return inFlight.get(flightKey);

  const promise = fetchJson(path)
    .then((value) => {
      writeSession(key, value);
      return value;
    })
    .finally(() => {
      inFlight.delete(flightKey);
    });

  inFlight.set(flightKey, promise);
  return promise;
}

export function getIpAddress(options = {}) {
  return cachedFetch(CACHE_KEYS.ipAddress, '/client-ip', options.force);
}

export function getConnectionProfile(options = {}) {
  return cachedFetch(CACHE_KEYS.connectionProfile, '/client-info', options.force);
}

export function getLocationProfile(options = {}) {
  return cachedFetch(
    CACHE_KEYS.locationProfile,
    '/reverse-geocode-client?localityLanguage=en',
    options.force
  );
}

export function isValidCoordinates(latitude, longitude) {
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

function geolocationErrorMessage(error) {
  if (!error) return 'Your browser could not share a location.';
  if (error.code === 1) {
    return 'Location permission was denied. Enable it in your browser settings to compare GPS.';
  }
  if (error.code === 2) {
    return 'Your location is currently unavailable. Try again in a moment.';
  }
  if (error.code === 3) {
    return 'Location request timed out. Please try again.';
  }
  return error.message || 'Your browser could not share a location.';
}

export function requestLivePosition() {
  ensureBrowser();

  if (!navigator.geolocation) {
    return Promise.reject(new Error('Geolocation is not supported by this browser.'));
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        if (!isValidCoordinates(latitude, longitude)) {
          reject(new Error('Your browser returned coordinates outside the valid range.'));
          return;
        }
        resolve({
          latitude,
          longitude,
          accuracy: asNumberOrNull(position.coords.accuracy),
          timestamp: position.timestamp,
        });
      },
      (error) => reject(new Error(geolocationErrorMessage(error))),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
}

export async function resolveLiveLocation(position) {
  ensureBrowser();

  if (!position || !isValidCoordinates(position.latitude, position.longitude)) {
    throw new Error('Valid live coordinates are required for GPS reverse geocoding.');
  }

  const { latitude, longitude } = position;
  const location = await fetchJson(
    `/reverse-geocode-client?latitude=${encodeURIComponent(
      latitude
    )}&longitude=${encodeURIComponent(longitude)}&localityLanguage=en`
  );

  return { ...location, latitude, longitude };
}

function normalizeLanguages(value) {
  const list = Array.isArray(value) ? value : value ? asText(value).split(',') : [];
  return list.map((item) => asText(item).trim()).filter(Boolean);
}

export function normalizeSnapshot({
  ipAddress = {},
  connectionProfile = {},
  locationProfile = {},
  ipLocation = null,
  source = 'ip',
  livePosition = null,
} = {}) {
  const ipString = firstValue(
    connectionProfile.ipString,
    ipAddress.ipString,
    locationProfile.ipString,
    ''
  );
  const countryName = firstValue(locationProfile.countryName, connectionProfile.countryName, '');
  const countryCode = firstValue(locationProfile.countryCode, connectionProfile.countryCode, '');
  const principalSubdivision = firstValue(
    locationProfile.principalSubdivision,
    connectionProfile.principalSubdivision,
    ''
  );
  const city = firstValue(locationProfile.city, locationProfile.locality, connectionProfile.city, '');
  const locality = firstValue(locationProfile.locality, locationProfile.city, connectionProfile.locality, '');
  const postcode = firstValue(locationProfile.postcode, connectionProfile.postcode, '');
  const latitude = livePosition
    ? livePosition.latitude
    : asNumberOrNull(locationProfile.latitude);
  const longitude = livePosition
    ? livePosition.longitude
    : asNumberOrNull(locationProfile.longitude);
  const userLanguages = normalizeLanguages(connectionProfile.userLanguages);
  const ipCountryCode = firstValue(ipLocation?.countryCode, locationProfile.countryCode, '');
  const ipCity = firstValue(ipLocation?.city, ipLocation?.locality, '');

  return {
    ip: ipString,
    ipString,
    ipNumeric: firstValue(connectionProfile.ipNumeric, ipAddress.ipNumeric, ''),
    ipType: firstValue(connectionProfile.ipType, ipAddress.ipType, ''),
    isBehindProxy: asBoolean(connectionProfile.isBehindProxy),
    proxyIp: firstValue(connectionProfile.proxyIp, ''),
    isSpider: asBoolean(connectionProfile.isSpider),
    isMobile: asBoolean(connectionProfile.isMobile),
    device: firstValue(connectionProfile.device, ''),
    os: firstValue(connectionProfile.os, ''),
    userAgentRaw: firstValue(connectionProfile.userAgentRaw, ''),
    userAgentDisplay: firstValue(connectionProfile.userAgentDisplay, ''),
    userAgent: firstValue(connectionProfile.userAgent, ''),
    family: firstValue(connectionProfile.family, ''),
    versionMajor: firstValue(connectionProfile.versionMajor, ''),
    versionMinor: firstValue(connectionProfile.versionMinor, ''),
    versionPatch: firstValue(connectionProfile.versionPatch, ''),
    userLanguages,
    countryName,
    countryCode,
    principalSubdivision,
    principalSubdivisionCode: firstValue(locationProfile.principalSubdivisionCode, ''),
    continent: firstValue(locationProfile.continent, ''),
    city,
    locality,
    postcode,
    plusCode: firstValue(locationProfile.plusCode, ''),
    lookupSource: source === 'gps' ? 'gps' : 'ip',
    latitude,
    longitude,
    accuracy: livePosition ? livePosition.accuracy : null,
    ipCountryCode,
    ipCity,
    timezone: firstValue(
      locationProfile?.timeZoneInfo?.timeZoneName,
      connectionProfile.timeZone,
      locationProfile.timezone,
      ''
    ),
    org: firstValue(connectionProfile.organization, connectionProfile.isp, ''),
    hostname: firstValue(connectionProfile.hostname, ''),
    region: principalSubdivision,
    country: countryName,
    postal: postcode,
    loc: latitude !== null && longitude !== null ? `${latitude},${longitude}` : null,
    raw: {
      ipAddress,
      connectionProfile,
      locationProfile,
      ipLocation: ipLocation || (source === 'gps' ? {} : locationProfile),
    },
  };
}

export async function getNetworkSnapshot(options = {}) {
  ensureBrowser();

  const [ipResult, profileResult, locationResult] = await Promise.allSettled([
    getIpAddress(options),
    getConnectionProfile(options),
    getLocationProfile(options),
  ]);

  const errors = {};
  if (ipResult.status === 'rejected') errors.ipAddress = messageOf(ipResult.reason);
  if (profileResult.status === 'rejected') errors.connectionProfile = messageOf(profileResult.reason);
  if (locationResult.status === 'rejected') errors.location = messageOf(locationResult.reason);

  const data = normalizeSnapshot({
    ipAddress: ipResult.status === 'fulfilled' ? ipResult.value : {},
    connectionProfile: profileResult.status === 'fulfilled' ? profileResult.value : {},
    locationProfile: locationResult.status === 'fulfilled' ? locationResult.value : {},
  });

  if (!data.ipString && !data.countryName) {
    throw new Error(
      Object.values(errors)[0] || 'Unable to load your network details right now.'
    );
  }

  return { data, errors };
}
