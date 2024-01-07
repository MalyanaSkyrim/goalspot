import React from 'react';
import {Image, View} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FA6Icon from 'react-native-vector-icons/FontAwesome6';
import IOIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import {Pitch, PitchImage} from 'server/prisma';
import TextField from '../ui/Form/TextField';

type Props = {field: Pitch & {images: PitchImage[]}};

const formatFieldSize = (teamSize: number) => {
  return `${teamSize} vs ${teamSize}`;
};

const FieldItem = ({field}: Props) => {
  const image = field.images.sort((a, b) => a.index - b.index)[0];
  return (
    <View
      className="rounded overflow-hidden h-24 flex-row space-x-1"
      style={{
        backgroundColor: '#fff',
        shadowColor: 'rgb(190,190,190)',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      }}>
      <View className="w-28">
        <Image
          className="w-full h-full object-cover"
          source={{
            uri: image?.url,
          }}
        />
      </View>
      <View className="flex-1 px-2 py-1 space-y-1">
        <TextField className="text-lg font-bold text-neutral-600">
          {field.name}
        </TextField>
        <View className="space-y-2">
          <View className="flex-row space-x-1 items-center">
            <MIcons name="people-alt" size={18} />
            <TextField className="font-semibold text-base">
              {formatFieldSize(field.maxTeamPlayers)}
            </TextField>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row space-x-2">
              {field.hasBall && <FAIcon name="soccer-ball-o" size={16} />}
              {field.hasShower && <FA6Icon name="shower" size={16} />}
              {field.hasShirts && <IOIcon name="shirt-outline" size={16} />}
              {field.hasReferee && <MCIcon name="whistle-outline" size={16} />}
            </View>
            <View>
              <TextField>{field.pricePerHour} per hour</TextField>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FieldItem;
