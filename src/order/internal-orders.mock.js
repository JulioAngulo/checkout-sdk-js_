import { getGuestCustomer } from '../customer/internal-customers.mock';
import { getPayment } from '../payment/payments.mock';

export function getOrderRequestBody() {
    return {
        customerMessage: '',
        useStoreCredit: false,
        payment: getPayment(),
    };
}

export function getInternalOrderRequestBody() {
    const payment = getPayment();

    return {
        customerMessage: '',
        useStoreCredit: false,
        payment: {
            name: payment.methodId,
            gateway: payment.gatewayId,
            paymentData: payment.paymentData,
        },
    };
}

export function getIncompleteOrder() {
    return {
        orderId: null,
        payment: {},
        socialData: null,
        status: 'ORDER_STATUS_INCOMPLETE',
        hasDigitalItems: false,
        isDownloadable: false,
        isComplete: false,
    };
}

export function getIncompleteOrderState() {
    return {
        data: getIncompleteOrder(),
        errors: {},
        meta: {},
        statuses: {},
    };
}

export function getCompleteOrder() {
    return {
        ...getIncompleteOrder(),
        id: 295,
        items: [
            {
                id: 103,
                type: 'ItemPhysicalEntity',
                name: 'Canvas Laundry Cart',
                imageUrl: '/images/canvas-laundry-cart.jpg',
                quantity: 1,
                amount: 200,
                discount: 0,
                amountAfterDiscount: 200,
                integerAmount: 20000,
                integerDiscount: 0,
                integerAmountAfterDiscount: 20000,
                variantId: 71,
                attributes: [
                    {
                        name: 'n',
                        value: 'v',
                    },
                ],
            },
            {
                id: 'bd391ead-8c58-4105-b00e-d75d233b429a',
                type: 'ItemGiftCertificateEntity',
                name: '$100 Gift Certificate',
                sender: {
                    name: 'pablo',
                    email: 'pa@blo.com',
                },
                recipient: {
                    name: 'luis',
                    email: 'lu@is.com',
                },
                imageUrl: '',
                quantity: 1,
                amount: 100,
                discount: 0,
                amountAfterDiscount: 100,
                attributes: [],
                integerAmount: 10000,
                integerDiscount: 0,
                integerAmountAfterDiscount: 10000,
                variantId: null,
            },
        ],
        currency: 'USD',
        subtotal: {
            amount: 200,
            integerAmount: 20000,
        },
        coupon: {
            discountedAmount: 10,
            coupons: [
                {
                    code: 'savebig2015',
                    discount: '20% off each item',
                    discountType: 1,
                },
                {
                    code: '279F507D817E3E7',
                    discount: '$5.00 off the shipping total',
                    discountType: 3,
                },
            ],
        },
        discount: {
            amount: 10,
            integerAmount: 1000,
        },
        discountNotifications: [],
        giftCertificate: {
            totalDiscountedAmount: 7,
            appliedGiftCertificates: {
                gc: {
                    code: 'gc',
                    discountedAmount: 7,
                    remainingBalance: 3,
                    giftCertificate: {
                        code: 'gc',
                        balance: 10,
                        purchaseDate: '',
                    },
                },
            },
        },
        shipping: {
            amount: 15,
            integerAmount: 1500,
            amountBeforeDiscount: 20,
            integerAmountBeforeDiscount: 2000,
        },
        storeCredit: {
            amount: 0,
        },
        taxes: [
            {
                name: 'Tax',
                amount: 3,
            },
        ],
        handling: {
            amount: 8,
            integerAmount: 800,
        },
        grandTotal: {
            amount: 190,
            integerAmount: 19000,
        },
        orderId: 295,
        payment: {
            id: 'authorizenet',
            status: 'PAYMENT_STATUS_FINALIZE',
            helpText: '%%OrderID%% text %%OrderID%%',
        },
        isDownloadable: false,
        customerCanBeCreated: true,
        isComplete: true,
        socialData: {
            5: {
                fb: {
                    name: 'Canvas Laundry Cart',
                    description: 'Canvas Laundry Cart',
                    image: '/images/canvas-laundry-cart.jpg',
                    url: 'http:\/\/www.facebook.com\/sharer\/sharer.php?s=100&p[title]=I+just+bought+%27%5BSample%5D+Sodling%2C+black+leather+duffle+bag%27+on+s1446156961&p[summary]=How+to+write+product+descriptions+that+sellOne+of+the+best+things+you+can+do+to+make+your+store+successful+is+invest+some+time+in+writing+great+product+descriptions.+You+want+to+provide+detailed+ye...&p[url]=http%3A%2F%2Fs1446156961.bcapp.dev%2Fsample-sodling-black-leather-duffle-bag%2F&p[images][0]=http%3A%2F%2Fcdn.bcapp.dev%2Fbcapp%2Fuvn6bltx%2Fproducts%2F68%2Fimages%2F253%2FHERO_mensstyle_034__54484.1348466546.190.285.jpg%3Fc%3D1',
                    shareText: "I just bought '[Sample] Sodling, black leather duffle bag' on s1446156961",
                    sharingLink: 'http:\/\/www.facebook.com\/sharer\/sharer.php?s=100&p[title]=I+just+bought+%27%5BSample%5D+Sodling%2C+black+leather+duffle+bag%27+on+s1446156961&p[summary]=How+to+write+product+descriptions+that+sellOne+of+the+best+things+you+can+do+to+make+your+store+successful+is+invest+some+time+in+writing+great+product+descriptions.+You+want+to+provide+detailed+ye...&p[url]=http%3A%2F%2Fs1446156961.bcapp.dev%2Fsample-sodling-black-leather-duffle-bag%2F&p[images][0]=http%3A%2F%2Fcdn.bcapp.dev%2Fbcapp%2Fuvn6bltx%2Fproducts%2F68%2Fimages%2F253%2FHERO_mensstyle_034__54484.1348466546.190.285.jpg%3Fc%3D1',
                    channelName: 'Facebook',
                    channelCode: 'fb',
                },
                tw: {
                    name: 'Canvas Laundry Cart',
                    description: 'Canvas Laundry Cart',
                    image: '/images/canvas-laundry-cart.jpg',
                    url: 'https:\/\/twitter.com\/intent\/tweet?url=http%3A%2F%2Fs1446156961.bcapp.dev%2Fsample-sodling-black-leather-duffle-bag%2F&text=I+just+bought+%27%5BSample%5D+Sodling%2C+black+leather+duffle+bag%27+on+s1446156961',
                    shareText: "I just bought '[Sample] Sodling, black leather duffle bag' on s1446156961",
                    sharingLink: 'https:\/\/twitter.com\/intent\/tweet?url=http%3A%2F%2Fs1446156961.bcapp.dev%2Fsample-sodling-black-leather-duffle-bag%2F&text=I+just+bought+%27%5BSample%5D+Sodling%2C+black+leather+duffle+bag%27+on+s1446156961',
                    channelName: 'Twitter',
                    channelCode: 'tw',
                },
                gp: {
                    name: 'Canvas Laundry Cart',
                    description: 'Canvas Laundry Cart',
                    image: '/images/canvas-laundry-cart.jpg',
                    url: 'https:\/\/plus.google.com\/share?url=http:\/\/s1446156961.bcapp.dev\/sample-sodling-black-leather-duffle-bag\/',
                    shareText: "I just bought '[Sample] Sodling, black leather duffle bag' on s1446156961",
                    sharingLink: 'https:\/\/plus.google.com\/share?url=http:\/\/s1446156961.bcapp.dev\/sample-sodling-black-leather-duffle-bag\/',
                    channelName: 'Google Plus',
                    channelCode: 'gp',
                },
            },
        },
    };
}

export function getCompleteOrderResponseBody() {
    return {
        meta: {},
        data: {
            customer: getGuestCustomer(),
            order: getCompleteOrder(),
        },
    };
}

export function getCompleteOrderState() {
    return {
        meta: {},
        data: getCompleteOrder(),
        errors: {},
        statuses: {},
    };
}

export function getSubmitOrderResponseHeaders() {
    return {
        token: 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDcxODcxMzMsIm5iZiI6MTUwNzE4MzUzMywiaXNzIjoicGF5bWVudHMuYmlnY29tbWVyY2UuY29tIiwic3ViIjoiMTUwNDA5ODgyMSIsImp0aSI6IjNkOTA4ZDE5LTY4OTMtNGQzYi1iMWEwLWJjNWYzMjRhM2ZiZCIsImlhdCI6MTUwNzE4MzUzMywiZGF0YSI6eyJzdG9yZV9pZCI6IjE1MDQwOTg4MjEiLCJvcmRlcl9pZCI6IjExOSIsImFtb3VudCI6MjAwMDAsImN1cnJlbmN5IjoiVVNEIn19.FSfZpI98l3_p5rbQdlHNeCfKR5Dwwk8_fvPZvtb64-Q',
    };
}

export function getSubmitOrderResponseBody() {
    return {
        data: {
            customer: getGuestCustomer(),
            order: getSubmittedOrder(),
        },
        meta: {
            deviceFingerprint: 'a084205e-1b1f-487d-9087-e072d20747e5',
        },
    };
}

export function getSubmittedOrder() {
    const order = getCompleteOrder();

    return {
        ...order,
        payment: {
            ...order.payment,
            status: '',
        },
    };
}

export function getSubmittedOrderState() {
    return {
        meta: {
            ...getSubmitOrderResponseBody().meta,
            ...getSubmitOrderResponseHeaders(),
        },
        data: getSubmittedOrder(),
        errors: {},
        statuses: {},
    };
}
