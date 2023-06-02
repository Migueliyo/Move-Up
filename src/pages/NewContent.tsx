import { useState } from 'react';
import firebase from '../firebase/firebase';

import { IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { camera, cameraOutline, imageOutline, moonOutline, saveOutline } from 'ionicons/icons';

import { usePhotoGallery } from '../components/UploadContent';
import Gallery from '../components/Gallery';

import './NewContent.css';

const NewContent: React.FC = () => {

  const { photo, takePhotoFromCamera, takePhotoFromGalery } = usePhotoGallery();
  const [selectedSegment, setSelectedSegment] = useState('photo');

  const handleSegmentChange = (event: any) => {
    setSelectedSegment(event.detail.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Publicar contenido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Publicar contenido</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSegment scrollable={true} value={selectedSegment} onIonChange={handleSegmentChange}>
          <IonSegmentButton value="photo">
            <IonIcon icon={cameraOutline}></IonIcon>
          </IonSegmentButton>
          <IonSegmentButton value="gallery">
            <IonIcon icon={imageOutline}></IonIcon>
          </IonSegmentButton>
        </IonSegment>

        {selectedSegment === 'photo' ? (
          /* JSX para el componente de la foto */
          <div>
            {/* ... */}
          </div>
        ) : (
          /* JSX para el componente de la galería */
          <Gallery photos={photo!} />
        )}

        <IonFab vertical="bottom" horizontal="start" slot="fixed">
          <IonFabButton onClick={() => takePhotoFromCamera()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => takePhotoFromGalery()}>
            <IonIcon icon={imageOutline}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => firebase.addPost(photo!)}>
            <IonIcon icon={saveOutline}></IonIcon>
          </IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default NewContent;
