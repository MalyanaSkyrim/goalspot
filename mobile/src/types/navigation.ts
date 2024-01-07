import type {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  UserType: undefined;
  Auth: undefined;
  OTP: {phoneNumber: string};
  PhoneEdit: {phoneNumber: string};
  CreateField: undefined;
  Loading: undefined;
  AddFieldImages: {fieldId: string};
  ManageFieldsScreen: undefined;
};

export type ScreenProps<Route extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Route>;
