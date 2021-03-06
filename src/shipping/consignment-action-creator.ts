import { createAction, createErrorAction, ThunkAction } from '@bigcommerce/data-store';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Address } from '../address';
import { CheckoutAction, CheckoutActionType, CheckoutClient, InternalCheckoutSelectors, ReadableCheckoutStore } from '../checkout';
import CheckoutRequestSender from '../checkout/checkout-request-sender';
import { MissingDataError } from '../common/error/errors';
import { RequestOptions } from '../common/http-request';

import { ConsignmentsRequestBody } from './consignment';
import { ConsignmentActionTypes, CreateConsignmentsAction, UpdateConsignmentAction } from './consignment-actions';

export default class ConsignmentActionCreator {
    constructor(
        private _checkoutClient: CheckoutClient,
        private _checkoutRequestSender: CheckoutRequestSender
    ) {}

    selectShippingOption(id: string, options?: RequestOptions): ThunkAction<UpdateConsignmentAction, InternalCheckoutSelectors> {
        return store => Observable.create((observer: Observer<UpdateConsignmentAction>) => {
            const state = store.getState();
            const checkout = state.checkout.getCheckout();
            const address = state.shippingAddress.getShippingAddress();

            if (!checkout || !checkout.id || !address || !address.id ) {
                throw new MissingDataError('Unable to update shipping address: "checkout.id" or "shippingAddress.id" is missing.');
            }

            observer.next(createAction(ConsignmentActionTypes.UpdateConsignmentRequested));

            const consignmentUpdateBody = {
                id: address.id,
                shippingOptionId: id,
            };

            this._checkoutClient.updateConsignment(checkout.id, consignmentUpdateBody, options)
                .then(({ body = {} }) => {
                    observer.next(createAction(ConsignmentActionTypes.UpdateConsignmentSucceeded, body));
                    observer.complete();
                })
                .catch(response => {
                    observer.error(createErrorAction(ConsignmentActionTypes.UpdateConsignmentFailed, response));
                });
        });
    }

    loadShippingOptions(options?: RequestOptions): ThunkAction<CheckoutAction, InternalCheckoutSelectors> {
        return store => Observable.create((observer: Observer<CheckoutAction>) => {
            const checkout = store.getState().checkout.getCheckout();

            if (!checkout || !checkout.id) {
                throw new MissingDataError('Unable to load shipping options: "checkout.id" is missing.');
            }

            observer.next(createAction(CheckoutActionType.LoadCheckoutRequested));

            this._checkoutRequestSender.loadCheckout(checkout.id, {
                ...options,
                params: {
                    include: ['consignments.availableShippingOptions'],
                },
            })
            .then(({ body }) => {
                observer.next(createAction(CheckoutActionType.LoadCheckoutSucceeded, body));
                observer.complete();
            })
            .catch(response => {
                observer.error(createErrorAction(CheckoutActionType.LoadCheckoutFailed, response));
            });
        });
    }

    updateAddress(address: Address, options?: RequestOptions): ThunkAction<CreateConsignmentsAction, InternalCheckoutSelectors> {
        return store => Observable.create((observer: Observer<CreateConsignmentsAction>) => {
            const consignments = this._getConsignmentsRequestBody(address, store);
            const checkout = store.getState().checkout.getCheckout();

            if (!consignments || !checkout || !checkout.id) {
                throw new MissingDataError('Unable to update shipping address: "checkout.id" is missing.');
            }

            observer.next(createAction(ConsignmentActionTypes.CreateConsignmentsRequested));

            this._checkoutClient.createConsignments(checkout.id, consignments, options)
                .then(({ body = {} }) => {
                    observer.next(createAction(ConsignmentActionTypes.CreateConsignmentsSucceeded, body));
                    observer.complete();
                })
                .catch(response => {
                    observer.error(createErrorAction(ConsignmentActionTypes.CreateConsignmentsFailed, response));
                });
        });
    }

    private _getConsignmentsRequestBody(
        shippingAddress: Address,
        store: ReadableCheckoutStore
    ): ConsignmentsRequestBody | undefined {
        const state = store.getState();
        const cart = state.cart.getCart();

        if (!cart) {
            return;
        }

        return [{
            shippingAddress,
            lineItems: (cart.lineItems && cart.lineItems.physicalItems || [])
                .map(item => ({
                    itemId: item.id,
                    quantity: item.quantity,
                })
            ),
        }];
    }
}
