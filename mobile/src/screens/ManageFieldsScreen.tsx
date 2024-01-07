import {useAtom} from 'jotai';
import React from 'react';
import {View} from 'react-native';
import FieldItem from '../components/FieldItem';
import {userAtom} from '../jotai/atoms';
import TextField from '../ui/Form/TextField';

const ManageFieldsScreen = () => {
  const [user] = useAtom(userAtom);
  const fields = user?.pitches ?? [];
  return (
    <View className="flex-1 space-y-4 p-5">
      <TextField className="text-2xl text-[#7ba428]">My fields</TextField>
      <View>
        {fields.map(field => (
          <FieldItem key={field.id} field={field} />
        ))}
      </View>
    </View>
  );
};

export default ManageFieldsScreen;
