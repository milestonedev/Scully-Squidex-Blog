"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.squidexPostSlugs = void 0;
const scully_1 = require("@scullyio/scully");
const environment_1 = require("../../src/environments/environment");
const fetch = require('node-fetch');
exports.squidexPostSlugs = 'squidexPostSlugs';
const squidexPostSlugsPlugin = async (route, config) => {
    const body = `grant_type=client_credentials&scope=squidex-api&client_id=${environment_1.environment.squidex.clientId}&client_secret=${environment_1.environment.squidex.secret}`;
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
    const { createPath } = scully_1.routeSplit(route);
    const response = await fetch(`${environment_1.environment.squidex.apiUrl}posts/`, {
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
scully_1.registerPlugin('router', exports.squidexPostSlugs, squidexPostSlugsPlugin, validator);
//# sourceMappingURL=plugin.js.map