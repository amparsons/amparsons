export interface Entry {
  title: string;
  editor: string;
}
export interface GetContentResponse {
  entries: Entry[];
}

export interface CardProps {
  isFlipped?: boolean;
}
