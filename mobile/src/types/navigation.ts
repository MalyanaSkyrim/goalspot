import type {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  UserType: undefined;
  Home: undefined;
  Auth: undefined;
  OTP: {phoneNumber: string};
  PhoneEdit: {phoneNumber: string};
};

export type ScreenProps<Route extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, Route>;
