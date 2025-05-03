export interface GSK_EVENT {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  lastUpdated: Date;
  createdDate: Date;
  categories: string[];
  content: GSK_EVENT_CONTENT[];
}

export interface GSK_EVENT_CONTENT {
  id: string;
  title: string;
  description: string;
  type:
    | 'md'
    | 'html'
    | 'pdf'
    | 'code-snippet'
    | 'download'
    | 'google-drive-element'
    | 'google-form'
    | 'google-map'
    | 'geoJSON'
    | 'youtube'
    | 'youtube-playlist'
    | 'image'
    | 'video'
    | 'audio'
    | 'link'
    | 'text'
    | 'bibtex-one'
    | 'bibtex-multiple'
    | 'markdown'
    | 'latex';
  content: string;
}
