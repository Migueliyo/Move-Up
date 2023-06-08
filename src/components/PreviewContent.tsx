import { IonBackButton, IonButtons, IonContent, IonHeader, IonList, IonPage, IonToolbar } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

import { Post } from "../model/post";

const PreviewContent = (props: { posts: any }) => {

    const { posts } = props;

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton icon={arrowBackOutline} color="dark" />
                        <p className='toolbar'>
                            Comentarios
                        </p>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {posts.map((post: Post) => {
                        return (
                            <IonList>
                                
                            </IonList>
                        );
                    })}
                </IonList>
            </IonContent>
        </IonPage >
    );
}

export default PreviewContent;