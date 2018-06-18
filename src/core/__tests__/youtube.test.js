import { getSearchURL, getTokenFromAuthResponse } from '../youtube';
import Result from 'folktale/result';

describe('youtube', () => {
  describe('getSearchURL', () => {
    it('constructs a Youtube Search URL', () => {
      expect(getSearchURL()).toEqual(
        'https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&maxResults=1&order=viewCount&type=video',
      );
    });

    it('can accept a search query and URL encodes it', () => {
      expect(getSearchURL('funny cats')).toEqual(
        'https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&q=funny%20cats&maxResults=1&order=viewCount&type=video',
      );
    });
  });

  describe('getTokenFromAuthResponse', () => {
    it('returns a Just(token) if token exists in the response', () => {
      const result = getTokenFromAuthResponse({ accessToken: 'TOKEN' });

      expect(Result.Ok.hasInstance(result)).toBe(true);
    });

    it('returns Nothing if token does not exist in the response', () => {
      const responses = [null, undefined, {}, { id: 1 }];

      responses.forEach(response => {
        const result = getTokenFromAuthResponse(response);

        expect(Result.Error.hasInstance(result)).toBe(true);
      });
    });
  });
});
