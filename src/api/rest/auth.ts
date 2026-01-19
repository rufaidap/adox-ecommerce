
import restClient from '../restClient';

export const registerCustomer = async (customerData: any) => {
  const response = await restClient.post('register-customer', { customer: customerData });
  return response.data;
};

export const loginCustomer = async (credentials: any) => {
  const response = await restClient.post('login-customer', credentials);
  return response.data;
};

