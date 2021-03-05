export interface Post{
  id:             string;
  data:           Data;
}
export interface Data {
  title: Slug;
  body:  Slug;
  slug:  Slug;
}
export interface Slug {
  iv: string;
}
