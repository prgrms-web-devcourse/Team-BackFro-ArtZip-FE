import ReviewHandlers from './handlers/review';
import ExhibitionHandlers from './handlers/exhibition';
import CommentHandlers from './handlers/comment';

const handlers = [...ReviewHandlers, ...ExhibitionHandlers, ...CommentHandlers];

export default handlers;
