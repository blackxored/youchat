// @flow
export type User = {};

export type Thumbnail = {
  width: number,
  height: number,
  url: string,
};

export type LiveStream = {
  etag: string,
  id: string,
  kind: 'youtube#video',
  liveStreamingDetails: {
    activeLiveChatId: string,
    actualStartTime: string, // ISO8601,
    concurrentViewers: string,
    scheduledStartTime: string, // ISO8601,
  },
  snippet: {
    categoryId: string,
    channelId: string,
    channelTitle: string,
    description: string,
    liveBroadcastContent: 'live',
    localized: {
      description: string,
      title: string,
    },
    publishedAt: string, // ISO8601,
    tags: [string],
    thumbnails: {
      default: Thumbnail,
      high: Thumbnail,
      maxres: Thumbnail,
      medium: Thumbnail,
      standard: Thumbnail,
    },
    title: string,
    // Added by us
    channelDetails: {
      etag: string,
      id: string,
      kind: 'youtube#channel',
      snippet: {
        country: string,
        customUrl: string,
        description: string,
        localized: {
          description: string,
          title: string,
        },
        publishedAt: string,
        thumbnails: {
          default: Thumbnail,
          high: Thumbnail,
          maxres: Thumbnail,
          medium: Thumbnail,
          standard: Thumbnail,
        },
        title: string,
      },
    },
  },
};
type PageInfo = {
  resultsPerPage: 68,
  totalResults: 68,
};



type AuthorDetails = {
  channelId: string,
  channelUrl: string,
  displayName: string,
  isChatModerator: boolean,
  isChatOwner: boolean,
  isChatSponsor: boolean,
  isVerified: boolean,
  profileImageUrl: string,
};

export type LiveStreamMessage = {
  authorDetails: AuthorDetails,
  etag: string,
  id: string,
  kind: 'youtube#liveChatMessage',
  snippet: {
    authorChannelId: string,
    displayMessage: string,
    hasDisplayContent: boolean,
    liveChatId: string,
    publishedAt: string,
    textMessageDetails: {
      messageText: string,
    },
    type: 'textMessageEvent',
  },
};

export type LiveStreamMessagesConnection = {
  etag: string,
  items: Array<LiveStreamMessage>,
  kind: 'youtube#liveChatMessageListResponse',
  nextPageToken: string,
  pageInfo: PageInfo,
  pollingIntervalMillis: number,
};
