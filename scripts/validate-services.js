#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const registryPath = path.join(root, 'data', 'services.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const services = registry.services;
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

assert(registry.schemaVersion === '1.8.0', 'schemaVersion must be 1.8.0');
assert(registry.lastReviewed === '2026-08-05', 'lastReviewed must record this migration review');
assert(Array.isArray(services), 'services must be an array');

const ids = new Set();
for (const service of services || []) {
  for (const field of [
    'id',
    'title',
    'category',
    'categoryId',
    'description',
    'keywords',
    'fee',
    'processingTime',
    'office',
    'url',
  ]) {
    assert(service[field] !== undefined, `${service.id || 'unknown'} is missing ${field}`);
  }

  assert(!ids.has(service.id), `duplicate service id: ${service.id}`);
  ids.add(service.id);

  const serialized = JSON.stringify(service);
  assert(!/solano|nueva vizcaya|seedo/i.test(serialized), `${service.id} contains legacy LGU data`);

  if (!/^https?:\/\//i.test(service.url)) {
    const localPath = service.url.startsWith('../')
      ? path.resolve(root, 'services', service.url)
      : path.resolve(root, 'services', service.url);
    assert(fs.existsSync(localPath), `${service.id} points to missing local page: ${service.url}`);
  }
}

const searchableText = (service) =>
  [service.title, service.description, service.office, ...(service.keywords || [])]
    .join(' ')
    .toLowerCase();

for (const query of ['kasal', 'business permit', 'buwis']) {
  assert(
    services.some((service) =>
      query.split(/\s+/).every((term) => searchableText(service).includes(term.toLowerCase()))
    ),
    `search registry has no result for "${query}"`
  );
}

const onlineServices = services.filter((service) => service.categoryId === 'online');
assert(
  onlineServices.length === 11,
  `expected 11 verified online routes, found ${onlineServices.length}`
);
for (const service of onlineServices) {
  assert(
    service.url.startsWith('https://agoolaunion.gov.ph/'),
    `${service.id} is not an Agoo eLGU BPLS online route`
  );
}

async function checkOnlineRoutes() {
  for (const service of onlineServices) {
    try {
      const response = await fetch(service.url, {
        signal: AbortSignal.timeout(20_000),
        headers: { 'user-agent': 'BetterAgoo-Service-Validator/1.7' },
      });
      assert(response.ok, `${service.id} returned HTTP ${response.status}`);
    } catch (error) {
      errors.push(`${service.id} could not be reached: ${error.message}`);
    }
  }
}

(async () => {
  if (process.argv.includes('--check-online')) await checkOnlineRoutes();

  if (errors.length) {
    console.error(`Service validation failed (${errors.length}):`);
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(
    `Service validation passed: ${services.length} entries, ${onlineServices.length} verified Agoo eLGU BPLS routes, 3 search queries.`
  );
})();
