import { config } from '../../utils/constants';
import Api from './api';

export const api = new Api({ baseUrl: config.baseUrl, headers: config.headers });
