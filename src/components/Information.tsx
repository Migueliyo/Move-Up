import { useState, useEffect } from "react";
import { IonAvatar, IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, useIonViewWillEnter } from "@ionic/react";
import firebase from "../firebase/firebase";
import { User } from "../model/user";
import { useAuth } from "../auth/AuthProvider";
import { calendarOutline, locationOutline, personCircleOutline } from "ionicons/icons";


const Information = (props: { postId: string }) => {

    const { postId } = props;
    const { user } = useAuth();
    const [account, setAccount] = useState<User>();
    const [commonFollowers, setCommonFollowers] = useState<User[]>([]);

    const getUserFromPostId = async (id: string) => {
        const response = await firebase.getUserFromPostId(id);
        if (!response.error)
            setAccount(response.data);
    }

    const getCommonFollowers = async (userId1: string, userId2: string) => {
        const response = await firebase.getCommonFollowers(userId1, userId2);
        if (!response.error)
            setCommonFollowers(response.data);
    }

    useIonViewWillEnter(() => {
        const downloand = async () => {
            await getUserFromPostId(postId);
        }
        downloand();
        getCommonFollowers(user!.id!, account!.id!)
    }, [])

    return (
        <IonContent fullscreen>
            <IonAvatar>
                <img src={account?.avatar}></img>
            </IonAvatar>
            <IonLabel>{account?.username}</IonLabel>
            <IonList>
                <IonItem>
                    <IonIcon icon={calendarOutline}></IonIcon>
                    <p>Fecha en la que se unió a Instagram</p>
                </IonItem>
                <IonItem>
                    <IonIcon icon={locationOutline}></IonIcon>
                    <p>Cuenta ubicada en</p>
                    <p>España</p>
                </IonItem>
                <IonItem>
                    <IonIcon icon={personCircleOutline}></IonIcon>
                    <p>Personas en común {commonFollowers.length}</p>
                </IonItem>
            </IonList>
            <IonButton></IonButton>
        </IonContent>
    );
}

export default Information;