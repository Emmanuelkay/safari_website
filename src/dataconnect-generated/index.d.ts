import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreatePaymentData {
  payment_insert: Payment_Key;
}

export interface CreatePaymentVariables {
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  stripePaymentIntentId?: string | null;
  paypalOrderId?: string | null;
  mpesaReceiptNumber?: string | null;
}

export interface ListPaymentsData {
  payments: ({
    id: UUIDString;
    amount: number;
    currency: string;
    status: string;
    paymentMethod: string;
    createdAt: TimestampString;
  } & Payment_Key)[];
}

export interface Payment_Key {
  id: UUIDString;
  __typename?: 'Payment_Key';
}

interface ListPaymentsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListPaymentsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListPaymentsData, undefined>;
  operationName: string;
}
export const listPaymentsRef: ListPaymentsRef;

export function listPayments(options?: ExecuteQueryOptions): QueryPromise<ListPaymentsData, undefined>;
export function listPayments(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListPaymentsData, undefined>;

interface CreatePaymentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePaymentVariables): MutationRef<CreatePaymentData, CreatePaymentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePaymentVariables): MutationRef<CreatePaymentData, CreatePaymentVariables>;
  operationName: string;
}
export const createPaymentRef: CreatePaymentRef;

export function createPayment(vars: CreatePaymentVariables): MutationPromise<CreatePaymentData, CreatePaymentVariables>;
export function createPayment(dc: DataConnect, vars: CreatePaymentVariables): MutationPromise<CreatePaymentData, CreatePaymentVariables>;

