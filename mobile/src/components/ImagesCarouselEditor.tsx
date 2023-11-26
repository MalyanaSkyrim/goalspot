import React, {useRef, useState} from 'react';
import {
  Animated,
  Image,
  StyleProp,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';

import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';

import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import IOIcon from 'react-native-vector-icons/Ionicons';

export type ImageSlide = {
  image?: ImageOrVideo;
  index: number;
};

interface Props {
  slides: ImageSlide[];
  style?: StyleProp<ViewStyle>;
  onChange: (images: ImageSlide[]) => void;
}

const ImagesCarouselEditor = ({slides, style, onChange}: Props) => {
  const carouselRef = useRef<ICarouselInstance>(null);

  const {width: screenWidth} = useWindowDimensions();
  const [slideIndex, setSlideIndex] = useState(0);

  const fadeBorders = useRef<Animated.Value[]>(
    [...Array(5)].map(
      (_, index) => new Animated.Value(slideIndex === index ? 1 : 0),
    ),
  ).current;

  const handleAddImage = (index: number) => {
    ImagePicker.openPicker({
      multiple: false,
    }).then(image => {
      const updatedSlides = [...slides];
      updatedSlides.splice(index, 1, {image, index});
      onChange(updatedSlides);
    });
  };

  const handleRemoveImage = (index: number) => {
    const updatedSlides = [...slides];
    updatedSlides.splice(index, 1);
    updatedSlides.push({index});
    onChange(updatedSlides);
  };

  const handleSnapToItem = (index: number) => {
    const prevFadeBorder = fadeBorders[slideIndex];
    const fadeBorder = fadeBorders[index];

    Animated.timing(prevFadeBorder, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setSlideIndex(index);
      Animated.timing(fadeBorder, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View
      style={style}
      className="justify-center items-center relative rounded">
      <Carousel
        ref={carouselRef}
        pagingEnabled={true}
        defaultIndex={0}
        loop={false}
        width={screenWidth - 16}
        height={200}
        data={slides}
        onSnapToItem={handleSnapToItem}
        scrollAnimationDuration={300}
        mode="parallax"
        renderItem={({item: slide, index}) => (
          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
              elevation: 7,
            }}
            className="relative flex-1 items-center overflow-hidden justify-center border rounded border-neutral-400 bg-neutral-200"
            key={index}>
            {slide.image ? (
              <View className="relative w-full h-full">
                <Image
                  className="w-full h-full"
                  source={{
                    uri: slide.image.path,
                  }}
                />
                <View className="absolute bottom-0 rounded w-full flex-row items-center space-x-[1px]">
                  <TouchableHighlight
                    onPress={() => handleRemoveImage(index)}
                    className="bg-black/30 flex-1"
                    underlayColor="rgba(0,0,0,0.2)">
                    <View className="flex-row items-center justify-center space-x-2  py-1">
                      <FA5Icon
                        name="trash"
                        size={18}
                        style={{color: '#DA2E2E'}}
                      />
                      <Text className="text-lg text-gray-300">Remove</Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => handleAddImage(index)}
                    className="bg-black/30 flex-1"
                    underlayColor="rgba(0,0,0,0.2)">
                    <View className="flex-row items-center justify-center space-x-2  py-1">
                      <FA5Icon name="edit" size={18} style={{color: '#fff'}} />
                      <Text className="text-lg text-gray-300">Edit</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            ) : (
              <View className="absolute">
                <TouchableOpacity onPress={() => handleAddImage(index)}>
                  <View className="flex-row space-x-2 items-center">
                    <IOIcon
                      name="add-circle"
                      size={30}
                      style={{color: 'rgb(102,102,102)'}}
                    />
                    <Text className="text-neutral-600 text-lg">Add Photo</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
      <View className="flex-row space-x-5">
        {slides.map(({image}, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSlideIndex(index);
              carouselRef.current?.scrollTo({
                index,
                animated: true,
              });
            }}>
            <Animated.View
              className="w-9 h-7 overflow-hidden border p-[2px] rounded-sm"
              style={{
                borderWidth: 1,
                borderColor:
                  slideIndex !== index
                    ? 'transparent'
                    : fadeBorders[index]?.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['transparent', 'rgb(22,101,52)'],
                      }),
              }}>
              {image?.path ? (
                <Image
                  className="w-full h-full"
                  source={{
                    uri: image.path,
                  }}
                />
              ) : (
                <View className="w-full h-full bg-neutral-200 border border-neutral-300 rounded-sm"></View>
              )}
            </Animated.View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default ImagesCarouselEditor;
