import {zodResolver} from '@hookform/resolvers/zod';

import React from 'react';
import {useForm} from 'react-hook-form';
import {Image, StyleProp, TouchableHighlight, View} from 'react-native';

import {Spinner} from 'native-base';
import {ViewStyle} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FA6Icon from 'react-native-vector-icons/FontAwesome6';
import IOIcon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {SurfaceTypeEnum} from 'server/prisma';
import {
  CreateFieldInput,
  createFieldSchema,
} from 'server/src/modules/field/field.schema';
import FormInput from '../ui/Form/FormInput';
import FormSelect from '../ui/Form/FormSelect';
import FormSwitch from '../ui/Form/FormSwitch';
import FormToggleGroup from '../ui/Form/FormToggleGroup';
import TextField from '../ui/Form/TextField';
import {ToggleItem} from '../ui/ToggleGroup';
import classMerge from '../utils/classMerge';

const fieldSizes = [5, 7, 8, 9, 10, 11] as const;

const surfaceTypeLabelMapping: Record<SurfaceTypeEnum, string> = {
  naturalGrass: 'Natural',
  syntheticGrass: 'Synthetic',
  asphalt: 'Asphalt',
};

const surfaceTypeImageMapping = {
  naturalGrass: require('../assets/images/grass.jpg'),
  syntheticGrass: require('../assets/images/synthetic.jpg'),
  asphalt: require('../assets/images/asphalt.jpg'),
};

interface Props {
  onSubmit: (values: CreateFieldInput) => void;
  style?: StyleProp<ViewStyle>;
}

const FieldForm = ({onSubmit, style}: Props) => {
  const {control, handleSubmit, formState} = useForm<CreateFieldInput>({
    resolver: zodResolver(createFieldSchema),
    defaultValues: {
      hasBall: false,
      hasReferee: false,
      hasShower: false,
      hasShirts: false,
      maxTeamPlayers: 5,
      surfaceType: 'syntheticGrass',
    },
  });

  const maxTeamPlayersOptions = fieldSizes.map(size => ({
    value: size,
    label: `${size} vs ${size}`,
  }));

  const renderToggleGroupItem = (item: ToggleItem<SurfaceTypeEnum>) => {
    return (
      <View className="relative overflow-hidden p-[2px] justify-center items-center">
        <Image
          source={surfaceTypeImageMapping[item.value]}
          width={200}
          height={200}
          className="w-full h-full rounded-md"
        />
        <TextField className="absolute text-white">
          {surfaceTypeLabelMapping[item.value]}
        </TextField>
      </View>
    );
  };

  const surfaceTypeOptions = Object.keys(SurfaceTypeEnum).map(key => ({
    value: key as SurfaceTypeEnum,
  }));

  return (
    <View className="flex-1 justify-between" style={style}>
      <View
        className={classMerge('space-y-3', !formState.isValid && 'space-y-2')}>
        <FormInput
          control={control}
          name="name"
          label="Field name*"
          placeholder="Enter your club name"
          inputClassName="border-[0.5px] border-neutral-400 rounded-lg py-2 px-3 focus:border-[#6b8f22] focus:shadow-lg shadow-primary"
        />
        <FormInput
          control={control}
          keyboardType="numeric"
          name="pricePerHour"
          label="Price per hour*"
          placeholder="Enter the price per hour"
          inputClassName="border-[0.5px] border-neutral-400 rounded-lg py-2 px-3 focus:border-[#6b8f22] focus:shadow-lg shadow-primary"
        />

        <FormSelect
          name="maxTeamPlayers"
          label="Field size*"
          control={control}
          options={maxTeamPlayersOptions}
        />

        <View className="space-y-4">
          <TextField className="text-base text-neutral-800 font-semibold">
            Field options
          </TextField>

          <View className="px-1">
            <FormSwitch
              icon={<FA6Icon name="shower" size={18} />}
              name="hasShower"
              control={control}
              label="Has shower"
              labelClassName="text-neutral-600"
            />

            <FormSwitch
              icon={<FAIcon name="soccer-ball-o" size={18} />}
              name="hasBall"
              control={control}
              label="Has ball"
              labelClassName="text-neutral-600"
            />

            <FormSwitch
              icon={<IOIcon name="shirt-outline" size={18} />}
              name="hasShirts"
              control={control}
              label="Has shirts"
              labelClassName="text-neutral-600"
            />

            <FormSwitch
              icon={<MCIcon name="whistle-outline" size={18} />}
              name="hasReferee"
              control={control}
              label="Has referee"
              labelClassName="text-neutral-600"
            />
          </View>
        </View>
        <View className="space-y-4">
          <TextField className="text-base text-neutral-800 font-semibold">
            Surface type
          </TextField>
          <View className="px-1">
            <View className="flex-row items-center space-x-2">
              <FormToggleGroup
                name="surfaceType"
                control={control}
                items={surfaceTypeOptions}
                renderItem={renderToggleGroupItem}
              />
            </View>
          </View>
        </View>
      </View>
      <TouchableHighlight
        disabled={formState.isSubmitting}
        underlayColor="#6b8f22"
        className={classMerge(
          'bg-primary justify-center items-center rounded-md py-2 mt-6',
          formState.isSubmitting && 'bg-primary/50',
        )}
        onPress={handleSubmit(onSubmit)}>
        <View className="flex-row space-x-2">
          {formState.isSubmitting && <Spinner color="white" size={18} />}
          <TextField className="uppercase text-white">Continue</TextField>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default FieldForm;
