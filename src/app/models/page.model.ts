import { ContentField } from './content-field.model';
export interface Post{
  id:             string;
  data:           Data;
}
export interface Data {
  title: ContentField;
  body:  ContentField;
  slug:  ContentField;
}
