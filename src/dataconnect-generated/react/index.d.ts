import { ListPaymentsData, CreatePaymentData, CreatePaymentVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useListPayments(options?: useDataConnectQueryOptions<ListPaymentsData>): UseDataConnectQueryResult<ListPaymentsData, undefined>;
export function useListPayments(dc: DataConnect, options?: useDataConnectQueryOptions<ListPaymentsData>): UseDataConnectQueryResult<ListPaymentsData, undefined>;

export function useCreatePayment(options?: useDataConnectMutationOptions<CreatePaymentData, FirebaseError, CreatePaymentVariables>): UseDataConnectMutationResult<CreatePaymentData, CreatePaymentVariables>;
export function useCreatePayment(dc: DataConnect, options?: useDataConnectMutationOptions<CreatePaymentData, FirebaseError, CreatePaymentVariables>): UseDataConnectMutationResult<CreatePaymentData, CreatePaymentVariables>;
