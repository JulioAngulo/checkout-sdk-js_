export default interface InternalLineItem {
    amount: number;
    amountAfterDiscount: number;
    attributes: Array<{ name: string, value: string }>;
    discount: number;
    integerAmount: number;
    integerAmountAfterDiscount: number;
    integerDiscount: number;
    id: string | number;
    imageUrl: string;
    name?: string;
    quantity: number;
    type: string;
    variantId: number | null;
    sender?: {
        name: string;
        email: string;
    };
    recipient?: {
        name: string;
        email: string;
    };
}
