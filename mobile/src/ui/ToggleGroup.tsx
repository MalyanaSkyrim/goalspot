import {View} from 'native-base';
import React from 'react';
import {TouchableHighlight} from 'react-native';
import classMerge from '../utils/classMerge';

export type ToggleItem<T extends string = string> = {
  value: T;
  disabled?: boolean;
};

export interface ToggleGroupProps<T extends string> {
  items: ToggleItem<T>[];
  value?: T;
  onValueChange?: (value: T) => void;
  renderItem: (item: ToggleItem<T>) => JSX.Element;
}

const ToggleGroup = <T extends string>({
  items,
  value,
  renderItem,
  onValueChange,
}: ToggleGroupProps<T>) => {
  const handleSelect = (selected: T) => {
    if (typeof onValueChange === 'function') onValueChange(selected);
  };

  return (
    <View className="flex-row items-center space-x-5">
      {items.map(item => (
        <TouchableHighlight
          key={item.value}
          disabled={item.disabled}
          underlayColor="#f1f1f1"
          onPress={() => handleSelect(item.value)}
          style={{
            shadowColor: value === item.value ? '#9acd32' : 'rgb(190,190,190)',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: value === item.value ? 0.5 : 0.22,
            shadowRadius: 2.22,
            elevation: value === item.value ? 6 : 3,
            opacity: value === item.value ? 1 : 0.6,
          }}
          className={classMerge(
            'bg-white rounded-[8px] w-[70px] h-[70px]',
            value === item.value
              ? 'border-[3px] border-primary'
              : 'border border-neutral-300',
          )}>
          {renderItem(item)}
        </TouchableHighlight>
      ))}
    </View>
  );
};

export default ToggleGroup;
