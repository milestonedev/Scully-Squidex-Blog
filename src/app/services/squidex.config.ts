import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class SquidexConfig {
    constructor(
        public readonly url: string,
        public readonly appName: string,
        public readonly clientId: string,
        public readonly clientSecret: string
    ) {
    }

    public buildUrl(url: string) {
        if (url.length > 0 && url.startsWith('/')) {
            url = url.substr(1);
        }

        const result = `${this.url}/${url}`.replace('{app}', this.appName);

        return result;
    }
}

export const DefaultSquidexConfig = new SquidexConfig(
    'https://cloud.squidex.io',
    `${environment.squidex.appName}`,
    `${environment.squidex.clientId}`,
    `${environment.squidex.secret}`
);
