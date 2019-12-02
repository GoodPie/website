export interface Roles {
  admin?: boolean;
}

export interface User {
  uid: string;
  email: string;
  profilePicture?: string;
  displayName?: string;
  roles?: Roles;
}
