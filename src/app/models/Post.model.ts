import { ContentField } from './content-field.model';

export interface Post{
  id:             string;
  data:           Data;
}
export interface Data {
  title: ContentField;
  text:  ContentField;
  slug:  ContentField;
}
