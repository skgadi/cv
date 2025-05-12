/**
 * extract video id from any kind of youtube link
 * @param link the youtube link
 * @returns the video id
 * @example
 * ```ts
 * const videoId = extractYoutubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
 * console.log(videoId); // dQw4w9WgXcQ
 * ```
 * @example
 * ```ts
 * const videoId = extractYoutubeId('https://youtu.be/dQw4w9WgXcQ');
 * console.log(videoId); // dQw4w9WgXcQ
 * ```
 * @example
 * ```ts
 * const videoId = extractYoutubeId('https://www.youtube.com/embed/dQw4w9WgXcQ');
 * console.log(videoId); // dQw4w9WgXcQ
 * ```
 * @example
 * ```ts
 * const videoId = extractYoutubeId('https://www.youtube.com/v/dQw4w9WgXcQ');
 * console.log(videoId); // dQw4w9WgXcQ
 * ```
 * @example
 * ```ts
 * const videoId = extractYoutubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be');
 * console.log(videoId); // dQw4w9WgXcQ
 * ```
 * @example
 * ```ts
 * const videoId = extractYoutubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be&t=10s');
 * console.log(videoId); // dQw4w9WgXcQ
 * ```
 * @example
 * ```ts
 * const videoId = extractYoutubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be&t=10m30s');
 * console.log(videoId); // dQw4w9WgXcQ
 * ```
 */
export const extractYoutubeId = (link: string): string => {
  const patterns = [
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/s]{11})/i,
  ];
  for (const pattern of patterns) {
    const match = link.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return '';
};
/**
 * Converts a YouTube URL to an embeddable link.
 * @param link The YouTube URL
 * @returns An embeddable URL (e.g., https://www.youtube.com/embed/ID) or the original link if invalid
 */
export const youtubeLinkToEmbedLink = (link: string): string => {
  const videoId = extractYoutubeId(link);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return link;
};
/**
 * Converts a YouTube URL to a shareable link.
 * @param link The YouTube URL
 * @returns A shareable URL (e.g., https://www.youtube.com/watch?v=ID) or the original link if invalid
 */
export const youtubeLinkToShareLink = (link: string): string => {
  const videoId = extractYoutubeId(link);
  if (videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
  return link;
};
/**
 * Converts a YouTube playlist URL to a embeddable link.
 * @param link The YouTube playlist URL
 * @returns An embeddable URL (e.g., https://www.youtube.com/embed/videoseries?list=ID) or the original link if invalid
 * @example
 * ```ts
 * const playlistLink = youtubePlaylistLinkToEmbedLink('https://www.youtube.com/playlist?list=PLx0g1j2v3z4');
 * console.log(playlistLink); // https://www.youtube.com/embed/videoseries?list=PLx0g1j2v3z4
 * ```
 * @example
 * ```ts
 * const playlistLink = youtubePlaylistLinkToEmbedLink('https://www.youtube.com/playlist?list=PLx0g1j2v3z4&feature=youtu.be');
 * console.log(playlistLink); // https://www.youtube.com/embed/videoseries?list=PLx0g1j2v3z4
 * ```
 * @example
 * ```ts
 * const playlistLink = youtubePlaylistLinkToEmbedLink('https://www.youtube.com/playlist?list=PLx0g1j2v3z4&t=10s');
 * console.log(playlistLink); // https://www.youtube.com/embed/videoseries?list=PLx0g1j2v3z4
 * ```
 * @example
 * ```ts
 * const playlistLink = youtubePlaylistLinkToEmbedLink('https://www.youtube.com/playlist?list=PLx0g1j2v3z4&t=10m30s');
 * console.log(playlistLink); // https://www.youtube.com/embed/videoseries?list=PLx0g1j2v3z4
 * ```
 * @example
 * ```ts
 * const playlistLink = youtubePlaylistLinkToEmbedLink('https://www.youtube.com/playlist?list=PLx0g1j2v3z4&feature=youtu.be&t=10s');
 * console.log(playlistLink); // https://www.youtube.com/embed/videoseries?list=PLx0g1j2v3z4
 * ```
 */

export const youtubePlaylistLinkToEmbedLink = (link: string): string => {
  const playlistId = extractYoutubePlaylistId(link);
  if (playlistId) {
    return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
  }
  return link;
};

/**
 * Extract playlist ID from any kind of YouTube playlist link
 * @param link The YouTube playlist link
 * @returns The playlist ID
 * @example
 * ```ts
 * const playlistId = extractYoutubePlaylistId('https://www.youtube.com/playlist?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj');
 * console.log(playlistId); // PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj
 * ```
 * @example
 * ```ts
 * const playlistId = extractYoutubePlaylistId('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj');
 * console.log(playlistId); // PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj
 * ```
 * @example
 * ```ts
 * const playlistId = extractYoutubePlaylistId('https://youtu.be/dQw4w9WgXcQ?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj');
 * console.log(playlistId); // PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj
 * ```
 */
export const extractYoutubePlaylistId = (link: string): string => {
  const patterns = [
    /(?:youtube\.com\/(?:playlist\?list=|watch\?.*list=)|youtu\.be\/.*\?list=)([^"&?/s]{34})/i,
  ];
  for (const pattern of patterns) {
    const match = link.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return '';
};
