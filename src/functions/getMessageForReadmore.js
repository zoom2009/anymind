import * as R from 'ramda';

const getMessageForReadmore = ({isOld, messages: messagesIn}) => {
  const messages = isOld ? R.reverse(messagesIn) : messagesIn;
  for (const message of messages) {
    const isFail = R.propOr(false, 'isFail', message);
    if (!isFail) return message;
  }
  return undefined;
};

export default getMessageForReadmore;
