// Shared regex for extracting Google Drive file ID from URLs
const DRIVE_REGEX = new RegExp('(?:drive|docs)\\.google\\.com/.*?/d/(.*?)(?:[/?]|$)');
/**
 * Extracts the file ID from a Google Drive URL.
 * @param link The Google Drive URL
 * @returns The file ID if found, otherwise the original link
 */
export const driveLinkToFileId = (link: string): string => {
  const match = link.match(DRIVE_REGEX);
  if (match && match[1]) {
    return match[1];
  }
  return link;
};

/**
 * Converts a Google Drive URL to a preview link suitable for embedding or viewing in-browser.
 * @param link The Google Drive URL
 * @returns A preview URL (e.g., https://drive.google.com/file/d/ID/preview) or the original link if invalid
 */
export const driveLinkToPreviewLink = (link: string): string => {
  const match = link.match(DRIVE_REGEX);
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return link;
};

/**
 * Converts a Google Drive URL to a direct download link.
 * @param link The Google Drive URL
 * @returns A download URL (e.g., https://drive.google.com/uc?export=download&id=ID) or the original link if invalid
 */
export const driveLinkToFileDownload = (link: string): string => {
  const match = link.match(DRIVE_REGEX);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  }
  return link;
};

/**
 * Converts a Google Drive URL to a shareable link.
 * @param link The Google Drive URL
 * @returns A shareable URL (e.g., https://drive.google.com/file/d/ID/view) or the original link if invalid
 */
export const driveLinkToFileShareLink = (link: string): string => {
  const match = link.match(DRIVE_REGEX);
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/view`;
  }
  return link;
};

/**
 * Converts a Google Drive URL to a shareable edit link.
 * @param link The Google Drive URL
 * @returns A shareable edit URL (e.g., https://drive.google.com/file/d/ID/edit) or the original link if invalid
 */
export const driveLinkToFileEditLink = (link: string): string => {
  const match = link.match(DRIVE_REGEX);
  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/edit`;
  }
  return link;
};
/**
 * Converts a Google Drive URL to a shareable link with the "open" action.
 * @param link The Google Drive URL
 * @returns A shareable URL (e.g., https://drive.google.com/open?id=ID) or the original link if invalid
 */
export const driveLinkToFileOpenLink = (link: string): string => {
  const match = link.match(DRIVE_REGEX);
  if (match && match[1]) {
    return `https://drive.google.com/open?id=${match[1]}`;
  }
  return link;
};
