

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserFollowers
// ====================================================

export interface UserFollowers_identity_identifiable_Group {
  __typename: "Group";
}

export interface UserFollowers_identity_identifiable_User_followers {
  __typename: "User";
  id: number | null;
  name: string | null;
  href: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface UserFollowers_identity_identifiable_User {
  __typename: "User";
  id: number | null;
  followers: (UserFollowers_identity_identifiable_User_followers | null)[] | null;
}

export type UserFollowers_identity_identifiable = UserFollowers_identity_identifiable_Group | UserFollowers_identity_identifiable_User;

export interface UserFollowers_identity {
  __typename: "Identity";
  identifiable: UserFollowers_identity_identifiable;
}

export interface UserFollowers {
  identity: UserFollowers_identity | null;
}

export interface UserFollowersVariables {
  id: string;
  page: number;
  per: number;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================