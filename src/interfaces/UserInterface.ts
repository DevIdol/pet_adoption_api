export interface CreateUser {
  username: String;
  email: String;
  password: String;
  profile?: String;
  favorites?: any[];
  adoptions?: any[];
  verified?: Boolean;
  isAdmin?: Boolean;
}
