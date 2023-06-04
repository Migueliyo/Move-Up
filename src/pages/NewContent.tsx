import { useState } from 'react';
import firebase from '../firebase/firebase';

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonImg, IonPage, IonRow, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { addCircle, addCircleOutline, addOutline, camera, cameraOutline, imageOutline, moonOutline, saveOutline } from 'ionicons/icons';

import { usePhotoGallery } from '../components/UploadContent';

import './NewContent.css';
import ExploreContainer from '../components/ExploreContainer';

const NewContent: React.FC = () => {

  const { photo, takePhotoFromCamera } = usePhotoGallery();

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

        <ExploreContainer />

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhotoFromCamera()}>
            <IonIcon icon={addOutline}></IonIcon>
          </IonFabButton>
        </IonFab>

        {/* <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => firebase.addPost(photo!)}>
            <IonIcon icon={saveOutline}></IonIcon>
          </IonFabButton>
        </IonFab> */}

      </IonContent>
    </IonPage>
  );
};

export default NewContent;
