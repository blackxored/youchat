// @flow
import axios from 'axios';
import { compose, curryN, lensPath, prop, view } from 'ramda';

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
});

export const getTokenFromAuthResponse = prop('accessToken');

const getFirstItem = view(lensPath(['items', '0']));
const getVideoId = view(lensPath(['id', 'videoId']));

export const get = curryN(3, (token, url, params) => {
  return instance
    .get(url, {
      params: {
        access_token: token,
        ...(params || {}),
      },
    })
    .then(x => x.data);
});

export const post = curryN(3, (token, url, data, params) => {
  return instance
    .post(url, data, {
      params: {
        access_token: token,
        ...(params || {}),
      },
    })
    .then(x => x.data);
});

export function getSearchParams(query?: string) {
  return {
    part: 'snippet',
    eventType: 'live',
    q: query,
    maxResults: 1,
    order: 'viewCount',
    type: 'video',
  };
}

const getLiveStreamParams = videoId => {
  return {
    part: 'snippet,liveStreamingDetails',
    id: videoId,
  };
};

const getLiveChatParams = (liveChatId: string, pageToken: ?string) => {
  return {
    liveChatId,
    pageToken,
    part: 'id,snippet,authorDetails',
  };
};

const addLiveStreamDetails = curryN(2, (request, videoId: string) => {
  return request(`/videos`, getLiveStreamParams(videoId)).then(getFirstItem);
});

const addChannelDetails = curryN(2, (request, video) => {
  return request('/channels', {
    part: 'snippet',
    id: video.snippet.channelId,
  })
    .then(getFirstItem)
    .then(response => ({
      ...video,
      channelDetails: response,
    }));
});

const searchLiveStreams = request => request(`/search`, getSearchParams());

export const getTopLiveStream = (token: string) => {
  const request = get(token);

  return searchLiveStreams(request)
    .then(
      compose(
        getVideoId,
        getFirstItem,
      ),
    )
    .then(addLiveStreamDetails(request))
    .then(addChannelDetails(request));
};

export const getLiveStreamChat = (token: string, liveStreamId: string, nextPageToken: ?string) => {
  return get(token, '/liveChat/messages', getLiveChatParams(liveStreamId, nextPageToken));
};

export const getSendMessageParams = (liveChatId: string, message: string) => {
  return {
    query: {
      part: 'snippet',
    },
    data: {
      snippet: {
        liveChatId,
        type: 'textMessageEvent',
        textMessageDetails: {
          messageText: message,
        },
      },
    },
  };
};

export const sendMessage = (token: string, liveChatId: string, message: string) => {
  const request = post(token);
  const params = getSendMessageParams(liveChatId, message);

  return request('/liveChat/messages', params.data, params.query).then(response => {
    return response;
  });
};

export const getHype = (
  currentMessages: Array<LiveStreamMessage>,
  prevMessages: Array<LiveStreamMessage>,
) => {
  // TODO: this is very naive
  return currentMessages.length - (prevMessages || []).length;
};
