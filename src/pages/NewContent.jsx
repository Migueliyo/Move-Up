import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './NewContent.css';

const NewContent = () => {
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
        <ExploreContainer name="Publicar contenido" />
      </IonContent>
    </IonPage>
  );
};

export default NewContent;
