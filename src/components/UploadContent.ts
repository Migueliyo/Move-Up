import { useState } from "react";
import { useHistory } from "react-router";
import { isPlatform } from "@ionic/react";

import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Capacitor } from "@capacitor/core";

import { useAuth } from "../auth/AuthProvider";
import { UserPhoto } from "../model/userPhoto";

export const usePhotoGallery = () => {
  const history = useHistory();
  const [photo, setPhoto] = useState<UserPhoto>();
  const [error, setError] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);
  const { user } = useAuth();

  const savePicture = async (
    photo: Photo,
    fileName: string
  ): Promise<UserPhoto> => {
    const isAcceptableSize = await checkImageSize(photo);

    if (!isAcceptableSize) {
      setError(true);
      history.push('/home')
    }

    let base64Data: string;

    if (isPlatform("hybrid")) {
      const file = await Filesystem.readFile({
        path: photo.path!,
      });
      base64Data = file.data;
    } else {
      base64Data = await base64FromPath(photo.webPath!);
    }

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    if (isPlatform("hybrid")) {
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  };

  const checkImageSize = async (photo: Photo): Promise<boolean> => {
    const imageBlob = await fetch(photo.webPath!).then((r) => r.blob());
    const image = new Image();
    image.src = URL.createObjectURL(imageBlob);

    return new Promise<boolean>((resolve) => {
      image.onload = () => {
        const MIN_IMAGE_WIDTH = 200;
        const MIN_IMAGE_HEIGHT = 200;

        const width = image.naturalWidth;
        const height = image.naturalHeight;

        if (width && width < MIN_IMAGE_WIDTH) {
          resolve(false);
        } else if (height && height < MIN_IMAGE_HEIGHT) {
          resolve(false);
        } else {
          resolve(true);
        }
      };
    });
  };

  const loadImage = async (photo: UserPhoto) => {
    if (!isPlatform("hybrid")) {
      const file = await Filesystem.readFile({
        path: photo.filepath,
        directory: Directory.Data,
      });

      photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
    }
    setPhoto(photo);
  };

  const takePhotoFromCamera = async () => {
    try {
      setOpenError(false);
      const photoCamera = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      });

      setError(false);
      const fileName = user!.username + "-" + new Date().getTime() + ".jpeg";
      const savedFileImage = await savePicture(photoCamera, fileName);
      loadImage(savedFileImage);
    } catch (e) {
      setOpenError(true);
      history.push('/home')
    }
  };

  return {
    takePhotoFromCamera,
    photo,
    setPhoto,
    error,
    setError,
    openError,
    setOpenError
  };
};

export const base64FromPath = async (path: string): Promise<string> => {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("Method did not return a string");
      }
    };
    reader.readAsDataURL(blob);
  });
};
