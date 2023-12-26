import * as axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import { waitFor } from '@testing-library/react';
import { getPersonal } from '../../services/personalService';
import { personal } from '../testData/personal.json';

const mockPost = jest.fn();

jest.mock('axios');

beforeEach(() => {
  axios.get.mockImplementation((url, config) => {
    mockPost(url, config);
    Promise.resolve(personal);
  });
});

describe('personal tests', () => {
  test('getPersonal calls correctly', async () => {
    const res = getPersonal(0, 'token');
    const config = {
      headers: { Authorization: 'Bearer token' },
    };

    await waitFor(() => {
      expect(res).toBe(personal);

      expect(mockPost.mock.calls).toHaveLength(1);
      expect(mockPost.mock.calls[0][0]).toBe('URL');
      expect(mockPost.mock.calls[0][1]).toBe(config);
    });
  });
});
