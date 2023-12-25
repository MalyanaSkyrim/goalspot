import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spinner} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {Image, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import ImageCropPicker, {
  Image as ImageMedia,
} from 'react-native-image-crop-picker';
import IOIcon from 'react-native-vector-icons/Ionicons';
import MLIcon from 'react-native-vector-icons/MaterialIcons';
import TextField from '../ui/Form/TextField';
import classMerge from '../utils/classMerge';
import trpc from '../utils/trpc';

const TOTAL_IMAGES = 3;

type ImageData = {index: number; data?: ImageMedia; url?: string};

const parseImages = (images: ImageData[]) => {
  const parsedImages: {index: number; mime: string; base64: string}[] = [];

  images.forEach(image => {
    const base64 = image.data?.data;
    if (!base64) return;
    parsedImages.push({
      index: image.index,
      mime: image.data?.mime ?? 'image/jpeg',
      base64,
    });
  });

  return parsedImages;
};

const EditFieldImagesScreen = () => {
  const [fieldId, setFieldId] = useState<string | null>(null);

  const {data: fieldImages = []} = trpc.field.getFieldImages.useQuery(
    {fieldId: fieldId as string},
    {
      enabled: !!fieldId,
    },
  );

  const savedImages = useMemo(
    () =>
      fieldImages.map(image => ({
        index: image.index,
        url: image.url,
      })),
    [fieldImages],
  );

  const [images, setImages] = useState<ImageData[]>(
    [...Array(TOTAL_IMAGES)].map((_, index) => ({index})),
  );

  const isLoading = false;

  const canSubmit = !isLoading && images.length > 0;

  const {mutate: addFieldImages} = trpc.field.addFieldImages.useMutation();

  const handleSubmit = async () => {
    if (!fieldId) return;
    addFieldImages({
      fieldId,
      images: parseImages(images),
    });
  };

  const handleAddImage = (index: number) => {
    ImageCropPicker.openPicker({
      multiple: false,
      mediaType: 'photo',
      includeBase64: true,
    }).then(data => {
      const updatedImages = [...images];
      updatedImages.splice(index, 1, {index, data});
      setImages(updatedImages);
    });
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1, {index});
    setImages(updatedImages);
  };

  useEffect(() => {
    AsyncStorage.getItem('fieldId').then(id => setFieldId(id));
  }, []);

  const imagesList = useMemo(
    () =>
      images
        .map(image => {
          const savedImage = savedImages.find(img => img.index === image.index);
          return {
            ...image,
            url: savedImage?.url,
          };
        })
        .sort((a, b) => a.index - b.index),
    [images, savedImages],
  );

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
          {imagesList.map(image => (
            <View
              key={image.index}
              className="relative border flex-1 rounded-md border-neutral-300 bg-neutral-200 overflow-hidden"
              style={{
                shadowColor: 'rgb(190,190,190)',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
              }}>
              {image.data || image.url ? (
                <>
                  <Image
                    className="w-full h-full object-contain"
                    source={{
                      uri: image?.data?.path ?? image?.url,
                    }}
                  />
                  <View className="absolute flex-row space-x-2 right-0 p-2">
                    <TouchableOpacity
                      onPress={() => handleAddImage(image.index)}>
                      <View className="bg-neutral-200 rounded-full p-1 w-6 h-6 justify-center items-center">
                        <MLIcon name="edit" size={16} color="rgb(82,82,82)" />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleRemoveImage(image.index)}>
                      <View className="bg-neutral-200 rounded-full w-6 h-6 justify-center items-center">
                        <IOIcon
                          name="close-sharp"
                          size={18}
                          color="rgb(82,82,82)"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
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
          disabled={!canSubmit}
          underlayColor="#6b8f22"
          className={classMerge(
            'bg-primary justify-center items-center rounded-md py-2 mt-6',
            !canSubmit && 'bg-primary/50',
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
