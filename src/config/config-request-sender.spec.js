import { createTimeout } from '@bigcommerce/request-sender';
import { getConfig } from './configs.mock';
import { ContentType } from '../common/http-request';
import { getResponse } from '../common/http-request/responses.mock';
import ConfigRequestSender from './config-request-sender';

describe('ConfigRequestSender', () => {
    let configRequestSender;
    let requestSender;

    beforeEach(() => {
        requestSender = {
            get: jest.fn(() => Promise.resolve()),
        };

        configRequestSender = new ConfigRequestSender(requestSender);
    });

    describe('#loadConfig()', () => {
        let response;

        beforeEach(() => {
            response = getResponse(getConfig());

            requestSender.get.mockReturnValue(Promise.resolve(response));
        });

        it('loads config', async () => {
            const output = await configRequestSender.loadConfig();

            expect(output).toEqual(response);
            expect(requestSender.get).toHaveBeenCalledWith('/api/storefront/checkout-settings', {
                headers: {
                    'Accept': ContentType.JsonV1,
                    'X-API-INTERNAL': 'This API endpoint is for internal use only and may change in the future',
                },
            });
        });

        it('loads config with timeout', async () => {
            const options = { timeout: createTimeout() };
            const output = await configRequestSender.loadConfig(options);

            expect(output).toEqual(response);
            expect(requestSender.get).toHaveBeenCalledWith('/api/storefront/checkout-settings', {
                ...options,
                headers: {
                    'Accept': ContentType.JsonV1,
                    'X-API-INTERNAL': 'This API endpoint is for internal use only and may change in the future',
                },
            });
        });
    });
});
