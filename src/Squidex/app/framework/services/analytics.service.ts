/*
 * Squidex Headless CMS
 *
 * @license
 * Copyright (c) Squidex UG (haftungsbeschränkt). All rights reserved.
 */

import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AnalyticsIdConfig } from '../configurations';
import { Types } from './../utils/types';
import { ResourceLoaderService } from './resource-loader.service';

// tslint:disable:only-arrow-functions

export const AnalyticsServiceFactory = (analyticsId: AnalyticsIdConfig, router: Router, resourceLoader: ResourceLoaderService) => {
    return new AnalyticsService(analyticsId, router, resourceLoader);
};

@Injectable()
export class AnalyticsService {
    private readonly gtag: any;

    constructor(analyticsId?: AnalyticsIdConfig, router?: Router, resourceLoader?: ResourceLoaderService) {
        window['dataLayer'] = window['dataLayer'] || [];

        this.gtag = function () {
            window['dataLayer'].push(arguments);
        };

        if (analyticsId && router && resourceLoader && window.location.hostname !== 'localhost') {
            this.gtag('config', analyticsId.value);

            router.events.filter(e => Types.is(e, NavigationEnd))
                .subscribe(() => {
                    this.gtag('config', analyticsId.value, { page_path: window.location.pathname });
                });

            resourceLoader.loadScript(`https://www.googletagmanager.com/gtag/js?id=${analyticsId.value}`);
        }
    }

    public trackEvent(category: string, action: string, label?: string, value?: number) {
        this.gtag('event', 'user-action', {
            event_category: category,
            event_action: action,
            event_label: label,
            value: value
        });
    }
}