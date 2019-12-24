import pubsub from 'sweet-pubsub';
import { get } from 'lodash';

const show = toast => pubsub.emit('toast', toast);

const success = title => show({ title });

const error = err => {
  show({
    type: 'danger',
    title: 'Error',
    message: get(err, 'message', err),
    duration: 0,
  });
};

export default { show, error, success };
