export interface GSK_EVENT {
  id: string;
  title: string;
  description: string;
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
