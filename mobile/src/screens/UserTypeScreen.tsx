import React, {useState} from 'react';
import {Text, TouchableWithoutFeedback, View, ViewProps} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Pitch from '../assets/svg/pitch.svg';
import Player from '../assets/svg/player.svg';
import {ScreenProps} from '../types/navigation';
import classMerge from '../utils/classMerge';
import trpc from '../utils/trpc';

const userTypeMapping = {
  player: {title: 'Player', Icon: Player},
  pitchOwner: {title: 'Field owner', Icon: Pitch},
};

type UserType = 'player' | 'pitchOwner';

const UserTypeCard = ({
  type,
  selected = false,
  onSelect,
  style,
}: {
  type: UserType;
  selected?: boolean;
  onSelect: (type: UserType) => void;
  style?: ViewProps['style'];
}) => {
  const {Icon} = userTypeMapping[type];
  return (
    <TouchableWithoutFeedback onPress={() => onSelect(type)}>
      <View
        style={style}
        className={classMerge(
          'p-1 w-[300px] h-[280px] border-transparent  border-[3px] rounded-lg opacity-80',
          selected && 'border-[#9acd32] opacity-100',
        )}>
        <View className="p-4 flex-1 bg-white shadow-2xl rounded-lg items-center justify-between">
          <Icon width="80%" height="80%" />
          <Text className="text-xl font-semibold">
            {userTypeMapping[type].title}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const UserTypeScreen = ({navigation}: ScreenProps<'UserType'>) => {
  const [userType, setUserType] = useState<UserType>('player');

  const {mutateAsync: updateOwnUser} = trpc.user.updateOwnUser.useMutation();

  const handleSelect = (type: UserType) => {
    setUserType(type);
  };

  const confirmUserType = async () => {
    await updateOwnUser({type: userType});
    navigation.navigate('CreateField');
  };

  return (
    <View className="bg-neutral-200 flex-1 p-4">
      <View className="items-center flex-1 justify-between p-4">
        <Text className="text-neutral-500 font-semibold text-xl">
          Choose the type of your account
        </Text>
        <View className="space-y-4">
          <UserTypeCard
            selected={userType === 'player'}
            type="player"
            onSelect={handleSelect}
          />
          <UserTypeCard
            selected={userType === 'pitchOwner'}
            type="pitchOwner"
            onSelect={handleSelect}
          />
        </View>
        <View className="w-full">
          <TouchableHighlight
            underlayColor="#6b8f22"
            className={classMerge(
              'bg-[#9acd32] justify-center items-center rounded-md py-2',
            )}
            onPress={confirmUserType}>
            <Text className="uppercase text-white font-bold">Continue</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default UserTypeScreen;
