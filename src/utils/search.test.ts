import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSearchText, matchesQuery, filterServices } from './search';
import { services } from '../data/directoryData';

test('normalizeSearchText trims and downcases properly', () => {
  assert.equal(normalizeSearchText('   NID Card Correction  '), 'nid card correction');
  assert.equal(normalizeSearchText(''), '');
  assert.equal(normalizeSearchText(null), '');
});

test('matchesQuery finds service by English and Bangla terms', () => {
  const nationalPortal = services.find((s) => s.id === 'SVC-0001');
  assert.ok(nationalPortal, 'SVC-0001 must exist in dataset');

  // English search
  assert.equal(matchesQuery(nationalPortal, 'bangladesh national portal'), true);
  assert.equal(matchesQuery(nationalPortal, 'portal'), true);

  // Bangla search
  assert.equal(matchesQuery(nationalPortal, 'জাতীয় তথ্য বাতায়ন'), true);

  // Non-matching query
  assert.equal(matchesQuery(nationalPortal, 'aeroplane international ticket query 999xyz'), false);
});

test('filterServices filters by sector properly', () => {
  const govResults = filterServices(services, { sector: 'government-or-public' });
  assert.ok(govResults.length > 0);

  const privateResults = filterServices(services, { sector: 'private-or-community' });
  assert.ok(privateResults.length > 0);
});

test('filterServices filters by verification status and featured flag', () => {
  const confirmed = filterServices(services, { verificationStatus: 'official-source-confirmed' });
  assert.ok(confirmed.length > 0);
  assert.ok(confirmed.every((s) => s.verification?.status === 'official-source-confirmed'));

  const featured = filterServices(services, { featuredOnly: true });
  assert.ok(featured.length >= 6, 'Master dataset has at least 6 featured services');
  assert.ok(featured.every((s) => s.isFeatured === true));
});

test('Prottoyon citizen certificate service exists and is searchable', () => {
  const prottoyon = services.find((s) => s.id === 'SVC-0301');
  assert.ok(prottoyon, 'Prottoyon service SVC-0301 must exist');
  assert.equal(prottoyon.officialUrl, 'https://prottoyon.gov.bd/');
  assert.equal(matchesQuery(prottoyon, 'prottoyon'), true);
  assert.equal(matchesQuery(prottoyon, 'প্রত্যয়ন'), true);
  assert.equal(matchesQuery(prottoyon, 'চারিত্রিক সনদ'), true);
});
