import { InternalOrderMeta, InternalOrderPayment } from './internal-order';
import Order from './order';

export default interface OrderState {
    data?: Order;
    meta?: OrderMetaState;
    errors: OrderErrorsState;
    statuses: OrderStatusesState;
}

export interface OrderMetaState extends InternalOrderMeta {
    token?: string;
    payment?: InternalOrderPayment;
}

export interface OrderErrorsState {
    loadError?: Error;
    submitError?: Error;
    finalizeError?: Error;
}

export interface OrderStatusesState {
    isLoading?: boolean;
    isSubmitting?: boolean;
    isFinalizing?: boolean;
}
