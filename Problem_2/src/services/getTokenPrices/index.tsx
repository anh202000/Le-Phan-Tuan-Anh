import { URLS } from '@src/constants';
import { IpropToken } from '@src/interfaces';
import { apiClient } from '@src/services/axios-request';

export const fetchTokenPrices = async (): Promise<IpropToken[]> => {
  const response: any = await apiClient.get(URLS.TOKENPRICES);

  return response;
};