import {
  registerPlugin,
  getPluginConfig,
  httpGetJson,
  routeSplit,
} from '@scullyio/scully';

import {environment } from '../../src/environments/environment';
const fetch = require('node-fetch');

export const squidexPostSlugs = 'squidexPostSlugs';

const squidexPostSlugsPlugin = async (route, config) => {
  const body = `grant_type=client_credentials&scope=squidex-api&client_id=${environment.squidex.clientId}&client_secret=${environment.squidex.secret}`;
  const tokenUrl = `https://cloud.squidex.io/identity-server/connect/token`;
  const token = await fetch(tokenUrl, {
    method: 'POST',
    body: body,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((tokenResponse) => tokenResponse.access_token);

  const { createPath } = routeSplit(route);

  const response = await fetch(`${environment.squidex.apiUrl}posts/`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response 2 was not ok');
      }
      return response.json();
    })
    .then((result) => {
      const handledRoutes = [];
      for (var i = 0; i < result.items.length; i++) {
        console.log(result.items[i].data.slug.iv);
        handledRoutes.push({ route: createPath(result.items[i].data.slug.iv) });
      }
      console.log(handledRoutes);
      return handledRoutes;
    });

  return response;
};

const validator = async () => [];

registerPlugin('router', squidexPostSlugs, squidexPostSlugsPlugin, validator);
