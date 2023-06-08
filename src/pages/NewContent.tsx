import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { imagesOutline } from 'ionicons/icons';

import { usePhotoGallery } from '../components/UploadContent';
import { useAuth } from '../auth/AuthProvider';

import firebase from '../firebase/firebase';

import './NewContent.css';

const NewContent: React.FC = () => {

  const history = useHistory();
  const { photo, setPhoto, takePhotoFromCamera, error, setError } = usePhotoGallery();
  const { user } = useAuth();
  const [resetFields, setResetFields] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const refTitle = useRef<HTMLIonInputElement>();

  const handleResetFields = () => {
    setResetFields(true);
    setTitleInput('');
  };

  const handlePublish = async () => {
    const titleInput = refTitle.current?.value as string;
    const response = await firebase.addPost(photo!, user!.id!, titleInput, user!.username, user!.avatar);
    if (!response.error){
      history.push('/home');
      setResetFields(true); 
      setPhoto(undefined);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <p className='div'>Publicar contenido</p>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Publicación de contenido</IonCardTitle>
            <IonCardSubtitle>Rellena todos los campos para completar la subida</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
          <img className='img' alt="Gallery Image" src={error ? 'assets/gallery.png' : (photo ? photo.webviewPath : 'assets/gallery.png')} />
            {resetFields ? (
              <>
                <IonInput
                  ref={refTitle as any}
                  placeholder="Escribe un pie de foto"
                  label="Pie de foto"
                  onIonChange={handleResetFields}
                ></IonInput>
                {setResetFields(false)}
              </>
            ) : (
              <IonInput
                ref={refTitle as any}
                placeholder="Escribe un pie de foto"
                label="Pie de foto"
                value={titleInput}
              ></IonInput>
            )}
          </IonCardContent>
          <IonButton fill="clear" disabled={photo ? false : true} onClick={handlePublish}>Publicar</IonButton>
          <IonButton fill="clear" disabled={photo ? false : true} onClick={() => {setResetFields(true); setPhoto(undefined)}}>Resetear campos</IonButton>
        </IonCard>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhotoFromCamera()}>
            <IonIcon icon={imagesOutline}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonAlert
          isOpen={error}
          header="Error"
          message="La imagen es demasiado pequeña"
          buttons={["OK"]}
        />

      </IonContent>
    </IonPage>
  );
};

export default NewContent;
