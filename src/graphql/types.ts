/**  User **/
export type User = {
  username: string;
  id: string;
  email: string;
  token?: string;
  createdAt?: string;
}; 

/**  Post **/
export type Comment = {
  id: string;
  username: string;
  createdAt: string;
  body: string;
};

export type Like = {
  id: string;
  createdAt: string;
  username: string;
};

export type Post = {
  id: string;
  username: string;
  body: string;
  createdAt: string;
  comments: Comment[];
  commentCount: number;
  likes: Like[];
  likeCount: number;
};




