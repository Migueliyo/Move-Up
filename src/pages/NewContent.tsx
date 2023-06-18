import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonInput, IonPage, IonToolbar, useIonViewWillEnter } from '@ionic/react';

import { usePhotoGallery } from '../components/UploadContent';
import { useAuth } from '../auth/AuthProvider';

import firebase from '../firebase/firebase';

import './NewContent.css';

const NewContent: React.FC = () => {

  const history = useHistory();
  const { photo, setPhoto, takePhotoFromCamera, error, openError } = usePhotoGallery();
  const { user } = useAuth();
  const [titleInput, setTitleInput] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const refTitle = useRef<HTMLIonInputElement>();

  useIonViewWillEnter(()=>{
    takePhotoFromCamera();
  }, []); 

  const handlePublish = async () => {
    setEmptyError(false);
    const titleInput = refTitle.current?.value as string;
    if (titleInput === ''){
      setEmptyError(true);
      return;
    }
    const response = await firebase.addPost(photo!, user!.id!, titleInput, user!.username, user!.avatar);
    if (!response.error){
      history.push('/home');
      setPhoto(undefined);
      setTitleInput('');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <p className='div'>Publicar contenido</p>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Publicación de contenido</IonCardTitle>
            <IonCardSubtitle>Rellena todos los campos para completar la subida</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
          <img className='img' src={error ? '' : (photo ? photo.webviewPath : '')} />
              <IonInput
                ref={refTitle as any}
                placeholder="Escribe un pie de foto"
                label="Pie de foto *"
                value={titleInput}
              ></IonInput>
          </IonCardContent>
          <IonButton fill="clear" disabled={photo ? false : true} onClick={handlePublish}>Publicar</IonButton>
        </IonCard>

        <IonAlert
          isOpen={error}
          header="Error"
          message="La imagen es demasiado pequeña"
          buttons={["OK"]}
        />
        <IonAlert
          isOpen={openError}
          header="Error"
          message="Debes tomar o seleccionar una imagen"
          buttons={["OK"]}
        />
        <IonAlert
          isOpen={emptyError}
          header="Error"
          message="Los campos no pueden estar vacíos"
          buttons={["OK"]}
        />

      </IonContent>
    </IonPage>
  );
};

export default NewContent;
