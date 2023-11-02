import {useAtom} from 'jotai';
import React, {useState} from 'react';
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import Carousel from 'react-native-reanimated-carousel';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import IOIcon from 'react-native-vector-icons/Ionicons';
import {userAtom} from '../jotai/atoms';

type ImageSlide = {
  image?: ImageOrVideo;
};

const HomeScreen = () => {
  const [user] = useAtom(userAtom);
  const [images, setImages] = useState<ImageSlide[]>(Array(5).fill({}));

  const {width: screenWidth} = useWindowDimensions();
  const [slideIndex, setSlideIndex] = useState(0);

  const handleAddImage = (index: number) => {
    ImagePicker.openPicker({
      multiple: false,
    }).then(image => {
      const updatedImages = [...images];
      updatedImages.splice(index, 1, {image});
      setImages(updatedImages);
    });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    updatedImages.push({});
    setImages(updatedImages);
  };

  const handleSnapToItem = (index: number) => {
    setSlideIndex(index);
  };

  return (
    <View className="flex-1 m-4 space-y-4 overflow-hidden">
      <View className="items-center">
        <Text className="text-xl text-neutral-700 font-semibold">
          Fill the information of your
        </Text>
        <Text className="text-xl text-neutral-700 font-semibold">
          football field
        </Text>
      </View>
      <View>
        <View className="h-[200px] justify-center items-center relative rounded">
          <Carousel
            pagingEnabled={true}
            defaultIndex={0}
            loop={false}
            width={screenWidth - 16}
            height={200}
            data={images}
            onSnapToItem={handleSnapToItem}
            scrollAnimationDuration={1000}
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
                          <FA5Icon
                            name="edit"
                            size={18}
                            style={{color: '#fff'}}
                          />
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
                        <Text className="text-neutral-600 text-lg">
                          Add Photo
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
