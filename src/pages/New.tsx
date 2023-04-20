import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";


const New: React.FC = () => {
    return (
        <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Publicar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Publicar</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Publicar contenido" />
      </IonContent>
    </IonPage>
    );
}

export default New;