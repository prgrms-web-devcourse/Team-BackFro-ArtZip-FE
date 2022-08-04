import ReviewHandlers from './handlers/review';
import ExhibitionHandlers from './handlers/exhibition';
const handlers = [...ReviewHandlers, ...ExhibitionHandlers];

export default handlers;
