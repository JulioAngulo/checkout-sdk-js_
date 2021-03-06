import { createAction } from '@bigcommerce/data-store';

import { CheckoutActionType } from '../checkout';
import { getCheckout } from '../checkout/checkouts.mock';
import { RequestError } from '../common/error/errors';
import { getErrorResponse } from '../common/http-request/responses.mock';

import checkoutReducer from './checkout-reducer';
import CheckoutState from './checkout-state';

describe('checkoutReducer', () => {
    let initialState: CheckoutState;

    beforeEach(() => {
        initialState = { errors: {}, statuses: {} };
    });

    it('returns loaded state', () => {
        const action = createAction(CheckoutActionType.LoadCheckoutSucceeded, getCheckout());
        const output = checkoutReducer(initialState, action);

        expect(output).toEqual({
            data: action.payload,
            errors: { loadError: undefined },
            statuses: { isLoading: false },
        });
    });

    it('returns loading state', () => {
        const action = createAction(CheckoutActionType.LoadCheckoutRequested);
        const output = checkoutReducer(initialState, action);

        expect(output).toEqual({
            errors: { loadError: undefined },
            statuses: { isLoading: true },
        });
    });

    it('returns error state', () => {
        const action = createAction(CheckoutActionType.LoadCheckoutFailed, new RequestError(getErrorResponse()));
        const output = checkoutReducer(initialState, action);

        expect(output).toEqual({
            errors: { loadError: action.payload },
            statuses: { isLoading: false },
        });
    });
});
