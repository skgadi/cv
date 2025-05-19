export interface GSK_EVENT {
  id: string;
  title: string;
  description: string;
  searchableText: string[];
  startDate: Date;
  endDate: Date;
  lastUpdated: Date;
  createdDate: Date;
  categories: string[];
  isPublic: boolean;
  isFeatured: boolean;
  priority: number;
  content: GSK_EVENT_CONTENT[];
}

export interface GSK_EVENT_CONTENT {
  id: string;
  title: string;
  icon: string;
  description: string;
  isPublic: boolean;
  type:
    | 'markdown'
    | 'html'
    | 'rich-text'
    | 'text'
    | 'pdf'
    | 'code-snippet'
    | 'download'
    | 'google-drive-element'
    | 'google-form'
    | 'iframe'
    | 'youtube'
    | 'youtube-playlist'
    | 'image'
    | 'video'
    | 'audio'
    | 'link'
    | 'bibtex';
  content: string;
}

export const copyAndPrepareEvent = (inEvent: GSK_EVENT): GSK_EVENT => {
  const event = JSON.parse(JSON.stringify(inEvent));
  event.title = event.title || '';
  event.description = event.description || '';
  event.startDate = event.startDate ? new Date(event.startDate) : new Date();
  event.endDate = event.endDate ? new Date(event.endDate) : new Date();
  event.lastUpdated = event.lastUpdated ? new Date(event.lastUpdated) : new Date();
  event.createdDate = event.createdDate ? new Date(event.createdDate) : new Date();
  event.categories = event.categories || [];
  event.isPublic = event.isPublic || false;
  event.isFeatured = event.isFeatured || false;
  event.priority = event.priority || -1;
  event.content = copyAndPrepareEventContentList(event.content) || [];
  event.id = event.id || '';
  return event;
};
export const copyAndPrepareEventContent = (inContent: GSK_EVENT_CONTENT): GSK_EVENT_CONTENT => {
  const content = { ...inContent };
  content.id = content.id || '';
  content.title = content.title || '';
  content.icon = content.icon || '';
  content.description = content.description || '';
  content.isPublic = content.isPublic || false;
  content.type = content.type || 'markdown';
  content.content = content.content || '';
  return content;
};
export const copyAndPrepareEventContentList = (
  inContentList: GSK_EVENT_CONTENT[],
): GSK_EVENT_CONTENT[] => {
  const contentList = inContentList.map((content) => {
    return copyAndPrepareEventContent(content);
  });
  return contentList;
};
export const copyAndPrepareEventList = (inEventList: GSK_EVENT[]): GSK_EVENT[] => {
  const eventList = inEventList.map((event) => {
    return copyAndPrepareEvent(event);
  });
  return eventList;
};
