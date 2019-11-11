export interface IWish {
  id: string;
  name: string;
  link?: string;
  userEmail: string;
  userName: string;
  userPhotoURL?: string;
}

export interface IWishToPerform {
  id: string;
  wish: string;
  userEmail: string;
}
