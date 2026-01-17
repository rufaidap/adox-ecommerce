import React, {useState} from 'react';
import {Alert, TouchableOpacity, View, ViewStyle, Platform} from 'react-native';

import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {t} from 'i18next';

import {uploadSingleFile} from '@/utils/uploadSingleFile';
import TextComp from '@/components/TextComp';
import {PlusIcon} from '@/assets/icons'; // Ensure this exists or use MaterialIcons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {commonColors} from '@/styles/colors';
import {moderateScale} from '@/styles/scaling';
import {ImageComp} from '@/components';

interface DocumentUploadProps {
  label: string;
  onUpload: (url: string) => void;
  containerStyle?: ViewStyle;
  error?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  onUpload,
  containerStyle,
  error,
}) => {
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, async (response: ImagePickerResponse) => {
      if (response.didCancel) return;

      if (response.errorMessage) {
        Alert.alert(t('ERROR'), response.errorMessage);
        return;
      }

      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        setUploading(true);
        // setFileUri(asset.uri || null); // Show local immediately?

        try {
          const file = {
            uri: asset.uri,
            type: asset.type || 'image/jpeg',
            name: asset.fileName || `photo_${Date.now()}.jpg`,
          };

          const uploadResult = await uploadSingleFile(file);
          if (uploadResult.uploaded && uploadResult.uploaded_url) {
            setFileUri(uploadResult.uploaded_url);
            onUpload(uploadResult.uploaded_url);
            showMessage({
              type: 'success',
              message: t('SUCCESS'),
              description: t('FILE_UPLOADED_SUCCESSFULLY'),
            });
          } else if (uploadResult.file?.uri) {
             // Fallback if needed
             setFileUri(uploadResult.file.uri);
          } else {
            Alert.alert(t('ERROR'), t('FAILED_TO_UPLOAD_FILE'));
          }
        } catch (error) {
          Alert.alert(t('ERROR'), t('FAILED_TO_UPLOAD_FILE'));
        } finally {
          setUploading(false);
        }
      }
    });
  };

  return (
    <View style={[{marginBottom: moderateScale(16)}, containerStyle]}>
      <TextComp text={label} style={{marginBottom: moderateScale(8), color: commonColors.gray500}} />
      <TouchableOpacity
        onPress={handleImagePicker}
        disabled={uploading}
        style={{
          height: moderateScale(100),
          borderWidth: 1,
          borderColor: error ? commonColors.error : commonColors.gray300,
          borderStyle: 'dashed',
          borderRadius: moderateScale(8),
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: commonColors.gray50,
        }}>
        {fileUri ? (
            <ImageComp source={{uri: fileUri}} style={{width: '100%', height: '100%', borderRadius: moderateScale(8)}} resizeMode="cover" />
        ) : (
          <View style={{alignItems: 'center'}}>
             <MaterialIcons name="cloud-upload" size={30} color={commonColors.primary} />
            <TextComp text={uploading ? "UPLOADING" : "BROWSE_FILES"} style={{marginTop: 8, color: commonColors.primary}} />
          </View>
        )}
      </TouchableOpacity>
      {error && <TextComp text={error} style={{color: commonColors.error, fontSize: 12, marginTop: 4}} />}
    </View>
  );
};

export default DocumentUpload;
