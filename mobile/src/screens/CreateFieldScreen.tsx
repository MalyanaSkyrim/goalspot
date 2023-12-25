import React from 'react';
import {View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import type {CreateFieldInput} from 'server/src/modules/field/field.schema';
import FieldForm from '../components/FieldForm';
import {ScreenProps} from '../types/navigation';
import TextField from '../ui/Form/TextField';
import trpc from '../utils/trpc';

// const currencies = ['USD', 'EUR', 'MAD'] as const;

// type CurrencyCode = (typeof currencies)[number];

// const currencyOptions = currencies.map(currency => ({
//   value: currency,
//   label: currency,
// }));

const CreateFieldScreen = ({navigation}: ScreenProps<'CreateField'>) => {
  const {mutateAsync: createField} = trpc.field.createField.useMutation();

  const onSubmit = async (values: CreateFieldInput) => {
    const field = await createField(values);
    AsyncStorage.setItem('fieldId', field.id);
    navigation.navigate('EditFieldImages');
  };

  return (
    <View className="relative flex-1 p-5 overflow-hidden bg-white space-y-3">
      <TextField className="text-2xl text-[#7ba428]">
        Create your football field
      </TextField>
      {/* <ImagesCarouselEditor slides={slides} onChange={handleSlidesChange} /> */}
      <FieldForm onSubmit={onSubmit} />
    </View>
  );
};

export default CreateFieldScreen;
