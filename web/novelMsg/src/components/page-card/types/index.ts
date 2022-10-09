export interface INovel {
  _id: string;
  book_url: string;
  book_id: string;
  image: string;
  title: string;
  author: string;
  type: string;
  subType: string;
  status: string;
  intro: string;
  bookDetail: any;
}

export interface ICard {
  name: string;
  novel: INovel;
}
