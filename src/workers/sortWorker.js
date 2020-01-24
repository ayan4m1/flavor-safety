import sortWorker from './sort.worker';
import { WebWorker } from '~utils';

export default new WebWorker(sortWorker);
