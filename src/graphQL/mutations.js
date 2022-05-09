import {gql} from '@apollo/client';

export const POST_MESSAGE = ({channelId, text, userId}) => ({
  mutation: gql`
    mutation {
      postMessage(channelId: "${channelId}", text: "${text}", userId: "${userId}") {
        text
        userId
        messageId
        datetime
      }
    }
  `,
});
