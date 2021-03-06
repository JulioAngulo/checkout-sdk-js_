import { InternalAddress } from '../address';
import { BillingAddressSelector } from '../billing';
import { mapToInternalCart, InternalCart } from '../cart';
import { selector } from '../common/selector';
import { ConfigSelector } from '../config';
import { StoreConfig } from '../config/config';
import { CustomerSelector, InternalCustomer } from '../customer';
import { FormField, FormSelector } from '../form';
import { Country, CountrySelector } from '../geography';
import { mapToInternalOrder, InternalOrder, OrderSelector } from '../order';
import { PaymentMethod, PaymentMethodSelector, PaymentSelector } from '../payment';
import { Instrument, InstrumentSelector } from '../payment/instrument';
import { InternalQuote, QuoteSelector } from '../quote';
import {
    InternalShippingOption,
    InternalShippingOptionList,
    ShippingAddressSelector,
    ShippingCountrySelector,
    ShippingOptionSelector,
} from '../shipping';

import Checkout from './checkout';
import CheckoutSelector from './checkout-selector';
import InternalCheckoutSelectors from './internal-checkout-selectors';

/**
 * Responsible for getting the state of the current checkout.
 *
 * This object has a set of methods that allow you to get a specific piece of
 * checkout information, such as shipping and billing details.
 */
@selector
export default class CheckoutStoreSelector {
    private _billingAddress: BillingAddressSelector;
    private _checkout: CheckoutSelector;
    private _config: ConfigSelector;
    private _countries: CountrySelector;
    private _customer: CustomerSelector;
    private _form: FormSelector;
    private _instruments: InstrumentSelector;
    private _order: OrderSelector;
    private _payment: PaymentSelector;
    private _paymentMethods: PaymentMethodSelector;
    private _quote: QuoteSelector;
    private _shippingAddress: ShippingAddressSelector;
    private _shippingCountries: ShippingCountrySelector;
    private _shippingOptions: ShippingOptionSelector;

    /**
     * @internal
     */
    constructor(selectors: InternalCheckoutSelectors) {
        this._billingAddress = selectors.billingAddress;
        this._checkout = selectors.checkout;
        this._config = selectors.config;
        this._countries = selectors.countries;
        this._customer = selectors.customer;
        this._form = selectors.form;
        this._instruments = selectors.instruments;
        this._order = selectors.order;
        this._payment = selectors.payment;
        this._paymentMethods = selectors.paymentMethods;
        this._quote = selectors.quote;
        this._shippingAddress = selectors.shippingAddress;
        this._shippingCountries = selectors.shippingCountries;
        this._shippingOptions = selectors.shippingOptions;
    }

    /**
     * Gets the current checkout.
     *
     * @returns The current checkout if it is loaded, otherwise undefined.
     */
    getCheckout(): Checkout | undefined {
        return this._checkout.getCheckout();
    }

    /**
     * Gets the current quote.
     *
     * @deprecated This method will be replaced in the future.
     * @returns The current quote if it is loaded, otherwise undefined.
     */
    getQuote(): InternalQuote | undefined {
        return this._quote.getQuote();
    }

    /**
     * Gets the current order.
     *
     * @returns The current order if it is loaded, otherwise undefined.
     */
    getOrder(): InternalOrder | undefined {
        const order = this._order.getOrder();

        return order ? mapToInternalOrder(order) : undefined;
    }

    /**
     * Gets the checkout configuration of a store.
     *
     * @returns The configuration object if it is loaded, otherwise undefined.
     */
    getConfig(): StoreConfig | undefined {
        return this._config.getStoreConfig();
    }

    /**
     * Gets the shipping address of the current checkout.
     *
     * If the address is partially complete, it may not have shipping options
     * associated with it.
     *
     * @returns The shipping address object if it is loaded, otherwise
     * undefined.
     */
    getShippingAddress(): InternalAddress | undefined {
        return this._shippingAddress.getShippingAddress();
    }

    /**
     * Gets a list of shipping options available for each shipping address.
     *
     * If there is no shipping address assigned to the current checkout, the
     * list of shipping options will be empty.
     *
     * @returns The list of shipping options per address if loaded, otherwise
     * undefined.
     */
    getShippingOptions(): InternalShippingOptionList | undefined {
        return this._shippingOptions.getShippingOptions();
    }

    /**
     * Gets the selected shipping option for the current checkout.
     *
     * @returns The shipping option object if there is a selected option,
     * otherwise undefined.
     */
    getSelectedShippingOption(): InternalShippingOption | undefined {
        return this._shippingOptions.getSelectedShippingOption();
    }

    /**
     * Gets a list of countries available for shipping.
     *
     * @returns The list of countries if it is loaded, otherwise undefined.
     */
    getShippingCountries(): Country[] | undefined {
        return this._shippingCountries.getShippingCountries();
    }

    /**
     * Gets the billing address of an order.
     *
     * @returns The billing address object if it is loaded, otherwise undefined.
     */
    getBillingAddress(): InternalAddress | undefined {
        return this._billingAddress.getBillingAddress();
    }

    /**
     * Gets a list of countries available for billing.
     *
     * @returns The list of countries if it is loaded, otherwise undefined.
     */
    getBillingCountries(): Country[] | undefined {
        return this._countries.getCountries();
    }

    /**
     * Gets a list of payment methods available for checkout.
     *
     * @returns The list of payment methods if it is loaded, otherwise undefined.
     */
    getPaymentMethods(): PaymentMethod[] | undefined {
        return this._paymentMethods.getPaymentMethods();
    }

    /**
     * Gets a payment method by an id.
     *
     * The method returns undefined if unable to find a payment method with the
     * specified id, either because it is not available for the customer, or it
     * is not loaded.
     *
     * @param methodId - The identifier of the payment method.
     * @param gatewayId - The identifier of a payment provider providing the
     * payment method.
     * @returns The payment method object if loaded and available, otherwise,
     * undefined.
     */
    getPaymentMethod(methodId: string, gatewayId?: string): PaymentMethod | undefined {
        return this._paymentMethods.getPaymentMethod(methodId, gatewayId);
    }

    /**
     * Gets the payment method that is selected for checkout.
     *
     * @returns The payment method object if there is a selected method;
     * undefined if otherwise.
     */
    getSelectedPaymentMethod(): PaymentMethod | undefined {
        const payment = this._payment.getPaymentId();

        return payment && this._paymentMethods.getPaymentMethod(payment.providerId, payment.gatewayId);
    }

    /**
     * Gets the current cart.
     *
     * @returns The current cart object if it is loaded, otherwise undefined.
     */
    getCart(): InternalCart | undefined {
        const checkout = this._checkout.getCheckout();

        return checkout ? mapToInternalCart(checkout) : undefined;
    }

    /**
     * Gets the current customer.
     *
     * @returns The current customer object if it is loaded, otherwise
     * undefined.
     */
    getCustomer(): InternalCustomer | undefined {
        return this._customer.getCustomer();
    }

    /**
     * Checks if payment data is required or not.
     *
     * If payment data is required, customers should be prompted to enter their
     * payment details.
     *
     * ```js
     * if (state.checkout.isPaymentDataRequired()) {
     *     // Render payment form
     * } else {
     *     // Render "Payment is not required for this order" message
     * }
     * ```
     *
     * @param useStoreCredit - If true, check whether payment data is required
     * with store credit applied; otherwise, check without store credit.
     * @returns True if payment data is required, otherwise false.
     */
    isPaymentDataRequired(useStoreCredit?: boolean): boolean {
        return this._payment.isPaymentDataRequired(useStoreCredit);
    }

    /**
     * Checks if payment data is submitted or not.
     *
     * If payment data is already submitted using a payment method, customers
     * should not be prompted to enter their payment details again.
     *
     * @param methodId - The identifier of the payment method.
     * @param gatewayId - The identifier of a payment provider providing the
     * payment method.
     * @returns True if payment data is submitted, otherwise false.
     */
    isPaymentDataSubmitted(methodId: string, gatewayId?: string): boolean {
        return this._payment.isPaymentDataSubmitted(this.getPaymentMethod(methodId, gatewayId));
    }

    /**
     * Gets a list of payment instruments associated with the current customer.
     *
     * @returns The list of payment instruments if it is loaded, otherwise undefined.
     */
    getInstruments(): Instrument[] | undefined {
        return this._instruments.getInstruments();
    }

    /**
     * Gets a set of form fields that should be presented to customers in order
     * to capture their billing address for a specific country.
     *
     * @param countryCode - A 2-letter country code (ISO 3166-1 alpha-2).
     * @returns The set of billing address form fields if it is loaded,
     * otherwise undefined.
     */
    getBillingAddressFields(countryCode: string): FormField[] {
        return this._form.getBillingAddressFields(this.getBillingCountries(), countryCode);
    }

    /**
     * Gets a set of form fields that should be presented to customers in order
     * to capture their shipping address for a specific country.
     *
     * @param countryCode - A 2-letter country code (ISO 3166-1 alpha-2).
     * @returns The set of shipping address form fields if it is loaded,
     * otherwise undefined.
     */
    getShippingAddressFields(countryCode: string): FormField[] {
        return this._form.getShippingAddressFields(this.getShippingCountries(), countryCode);
    }
}
