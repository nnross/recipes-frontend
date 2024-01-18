import * as axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import personalService from '../../services/personalService';
import { personal } from '../testData/personal.json';

const mock = jest.fn();

jest.mock('axios');

beforeEach(() => {
  axios.get.mockImplementation((url, config) => {
    mock(url, config);
    return Promise.resolve({ data: personal });
  });
});

describe('personalService tests', () => {
  test('getPersonal calls correctly', async () => {
    const res = await personalService.getPersonal(0, 'token');
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(personal);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe('https://recipes-backend-wxel.onrender.com/pages/get/personal?accountId=0');
      expect(mock.mock.calls[0][1]).toStrictEqual(config);
    });
  });
});
