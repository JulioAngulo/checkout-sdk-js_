
# @bigcommerce/checkout-sdk

## Index

### Functions

* [createCheckoutService](#createcheckoutservice)
* [createLanguageService](#createlanguageservice)

---

## Functions

<a id="createcheckoutservice"></a>

###  createCheckoutService

▸ **createCheckoutService**(options?: *[CheckoutServiceOptions](interfaces/checkoutserviceoptions.md)*): [CheckoutService](classes/checkoutservice.md)

Creates an instance of `CheckoutService`.

```js
const service = createCheckoutService();

service.subscribe(state => {
    console.log(state);
});

service.loadCheckout();
```

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` options | [CheckoutServiceOptions](interfaces/checkoutserviceoptions.md) |  A set of construction options. |

**Returns:** [CheckoutService](classes/checkoutservice.md)
an instance of `CheckoutService`.

___
<a id="createlanguageservice"></a>

###  createLanguageService

▸ **createLanguageService**(config?: *`Partial`<[LanguageConfig](interfaces/languageconfig.md)>*): [LanguageService](classes/languageservice.md)

Creates an instance of `LanguageService`.

```js
const language = {{{langJson 'optimized_checkout'}}}; // `langJson` is a Handlebars helper provided by BigCommerce's Stencil template engine.
const service = createLanguageService(language);

console.log(service.translate('address.city_label'));
```

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| `Optional` config | `Partial`<[LanguageConfig](interfaces/languageconfig.md)> |  A configuration object. |

**Returns:** [LanguageService](classes/languageservice.md)
An instance of `LanguageService`.

___

