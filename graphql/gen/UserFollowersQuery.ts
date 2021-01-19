

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserFollowersQuery
// ====================================================

export interface UserFollowersQuery_identity_identifiable_Group {
  __typename: "Group";
}

export interface UserFollowersQuery_identity_identifiable_User_followers {
  __typename: "User";
  id: number | null;
  name: string | null;
  slug: string | null;
  initials: string | null;
  avatar: string | null;
}

export interface UserFollowersQuery_identity_identifiable_User {
  __typename: "User";
  id: number | null;
  followers: (UserFollowersQuery_identity_identifiable_User_followers | null)[] | null;
}

export type UserFollowersQuery_identity_identifiable = UserFollowersQuery_identity_identifiable_Group | UserFollowersQuery_identity_identifiable_User;

export interface UserFollowersQuery_identity {
  __typename: "Identity";
  identifiable: UserFollowersQuery_identity_identifiable;
}

export interface UserFollowersQuery {
  identity: UserFollowersQuery_identity | null;
}

export interface UserFollowersQueryVariables {
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