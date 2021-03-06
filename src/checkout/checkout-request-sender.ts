import { RequestSender, Response } from '@bigcommerce/request-sender';

import { ContentType, RequestOptions } from '../common/http-request';

import Checkout from './checkout';
import CheckoutDefaultIncludes from './checkout-default-includes';
import CheckoutParams from './checkout-params';

export default class CheckoutRequestSender {
    constructor(
        private _requestSender: RequestSender
    ) {}

    loadCheckout(id: string, { params, timeout }: RequestOptions<CheckoutParams> = {}): Promise<Response<Checkout>> {
        const url = `/api/storefront/checkout/${id}`;
        const headers = { Accept: ContentType.JsonV1 };

        return this._requestSender.get(url, {
            params: {
                include: CheckoutDefaultIncludes.concat(params && params.include || []).join(','),
            },
            headers,
            timeout,
        });
    }
}
