import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";

const Challenge: React.FC = () => {
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Desafíos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Desafíos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Desafíos" />
      </IonContent>
    </IonPage>
    );
}

export default Challenge;