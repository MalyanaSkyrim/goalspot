import {Spinner} from 'native-base';
import React, {useState} from 'react';
import {Image, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import ImageCropPicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import IOIcon from 'react-native-vector-icons/Ionicons';
import TextField from '../ui/Form/TextField';
import classMerge from '../utils/classMerge';

const EditFieldImagesScreen = () => {
  const [images, setImages] = useState<{index: number; data?: ImageOrVideo}[]>(
    [...Array(3)].map((_, index) => ({index})),
  );

  const isLoading = false;

  const handleSubmit = () => {};

  const handleAddImage = (index: number) => {
    ImageCropPicker.openPicker({
      multiple: false,
    }).then(data => {
      const updatedImages = [...images];
      updatedImages.splice(index, 1, {index, data});
      setImages(updatedImages);
    });
  };

  return (
    <View className="flex-1 space-y-4 p-5">
      <View className="space-y-2">
        <TextField className="text-2xl text-[#7ba428]">
          Add images to your field
        </TextField>
        <TextField className="text-base">
          Choose vibrant and clear images that showcase the football pitch from
          different angles.
        </TextField>
      </View>
      <View className="flex-1 justify-between">
        <View className="flex-1 space-y-3">
          {images.map(image => (
            <View
              key={image.index}
              className="border flex-1 rounded-md border-neutral-300 bg-neutral-200 overflow-hidden">
              {image.data ? (
                <Image
                  className="w-full h-full object-contain"
                  source={{
                    uri: image.data.path,
                  }}
                />
              ) : (
                <View className="flex-1 justify-center items-center">
                  <TouchableOpacity onPress={() => handleAddImage(image.index)}>
                    <View className="flex-row space-x-2 items-center">
                      <IOIcon
                        name="add-circle"
                        size={30}
                        style={{color: 'rgb(115,115,115)'}}
                      />
                      <TextField className="text-neutral-500 text-lg">
                        Add Photo
                      </TextField>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
        <TouchableHighlight
          disabled={isLoading}
          underlayColor="#6b8f22"
          className={classMerge(
            'bg-primary justify-center items-center rounded-md py-2 mt-6',
            isLoading && 'bg-primary/50',
          )}
          onPress={handleSubmit}>
          <View className="flex-row space-x-2">
            {isLoading && <Spinner color="white" size={18} />}
            <TextField className="uppercase text-white">Continue</TextField>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default EditFieldImagesScreen;
