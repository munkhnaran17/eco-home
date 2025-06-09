import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const useImagePicker = () => {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const { showActionSheetWithOptions } = useActionSheet();

  const handleImageSelection = () => {
    const options = ['Take Photo', 'Choose from Library', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          await takePhoto();
        } else if (buttonIndex === 1) {
          await pickImageFromLibrary();
        }
      }
    );
  };

  const pickImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log('image result: ', result);
      setImage(result.assets[0]);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log('image result: ', result);
      setImage(result.assets[0]);
    }
  };

  return {
    image,
    setImage,
    handleImageSelection,
    pickImageFromLibrary,
    takePhoto,
  };
};

export default useImagePicker;
