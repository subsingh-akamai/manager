import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { queryFactory } from './queries';

import type {
  APIError,
  JWEToken,
  JWETokenPayLoad,
  MetricDefinition,
  ResourcePage,
  ServiceTypesList,
} from '@linode/api-v4';

export const useGetCloudPulseMetricDefinitionsByServiceType = (
  serviceType: string | undefined,
  enabled: boolean
) => {
  return useQuery<ResourcePage<MetricDefinition>, APIError[]>({
    ...queryFactory.metricsDefinitons(serviceType),
    enabled,
  });
};

export const useCloudPulseJWEtokenQuery = (
  serviceType: string | undefined,
  request: JWETokenPayLoad,
  runQuery: boolean
) => {
  return useQuery<JWEToken, APIError[]>({
    ...queryFactory.token(serviceType, request),
    enabled: runQuery,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });
};

export const useCloudPulseServiceTypes = (enabled: boolean) => {
  return useQuery<ServiceTypesList, APIError[]>({
    ...queryFactory.lists._ctx.serviceTypes,
    enabled,
  });
};
