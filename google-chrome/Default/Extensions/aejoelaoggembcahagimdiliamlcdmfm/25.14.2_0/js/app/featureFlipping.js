/*
 * Copyright (C) 2010-2022 Talend Inc. - www.talend.com
 *
 * This source code is available under agreement available at
 * https://www.talend.com/legal-terms/us-eula
 *
 * You should have received a copy of the agreement
 * along with this program; if not, write to Talend SA
 * 5 rue Salomon de Rothschild - 92150 Suresnes
 *
 */

// Mainly extracted and adapted from "@talend/featureFlipping" js library
// We decided to NOT import "@talend/featureFlipping" because it leads
// to import useless packages like react-dom, etc. (adds more than 10mo of uncompressed stuff)
import * as LDClient from 'launchdarkly-js-client-sdk';

window.talend = {};

function setFlagsFromLaunchDarkly (flags) {
  window.talend.features = { ...flags };
}

function getFeatureFlag (flag) {
  return window?.talend?.features?.[ flag ] || false;
}

async function fetchAccountInfo (bffAppUrl, accessToken) {
  const response = await fetch(`${bffAppUrl}/api/account`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}

async function fetchWebappConfiguration (bffAppUrl, accessToken) {
  const response = await fetch(`${bffAppUrl}/api/webapp-configuration`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${accessToken}` },
    referrerPolicy: 'no-referrer',
  });
  return response.json();
}

async function initializeFeatureFlippingClient (launchDarklyClientSideId, context) {
  const launchDarklyClient = LDClient.initialize(launchDarklyClientSideId, context);
  await launchDarklyClient.waitUntilReady();
  setFlagsFromLaunchDarkly(launchDarklyClient.allFlags());
}

async function initializeFeatureFlippingClientForPayingExtension (bffAppUrl, accessToken) {
  const account = await fetchAccountInfo(bffAppUrl, accessToken);
  const webappConfiguration = await fetchWebappConfiguration(bffAppUrl, accessToken);

  const launchDarklyClientSideId = webappConfiguration?.launchDarklyClientSideId;
  const context = {
    kind: 'user',
    key: account.id,
    name: account.name,
    custom: {
      'subscription-type': account.subscription.type,
      'subscription-status': account.subscription.status,
      'subscription-expiry-date': account.subscription.expiryDate,
    },
  };
  await initializeFeatureFlippingClient(launchDarklyClientSideId, context);
}

async function initializeFeatureFlippingClientForFreeExtension (launchDarklyClientSideId) {
  const context = {
    kind: 'user',
    key: 'anonymous',
    name: 'anonymous',
  };
  await initializeFeatureFlippingClient(launchDarklyClientSideId, context);
}

window.APP.featureFlipping = {
  initializeFeatureFlippingClientForPayingExtension,
  initializeFeatureFlippingClientForFreeExtension,
  getFeatureFlag,
};
