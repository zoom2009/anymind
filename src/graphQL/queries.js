import {gql} from '@apollo/client';

export const GET_LASTEST_MESSAGES = channelId => ({
  query: gql`
    query {
      fetchLatestMessages(channelId: "${channelId}") {
        messageId
        text
        datetime
        userId
      }
    }
  `,
});

export const GET_READ_MORE_MESSAAGES = ({channelId, messageId, old}) => ({
  query: gql`
    query {
      fetchMoreMessages(channelId: "${channelId}", messageId: "${messageId}", old: ${old}) {
        messageId
        text
        datetime
        userId
      }
    }
  `,
});
