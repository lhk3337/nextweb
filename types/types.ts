export interface ItemType {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

export interface CommentData {
  id?: string;
  email: string;
  name: string;
  text: string;
}
