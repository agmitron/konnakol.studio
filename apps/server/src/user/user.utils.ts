import {
  User,
  UserDocument,
  UserDocumentLean,
  UserWithoutPassword,
} from './user.schema';

export const omitPassword = (
  user: UserDocument | User | UserDocumentLean,
): UserWithoutPassword => {
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};
