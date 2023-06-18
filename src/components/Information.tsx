import { useState, useEffect } from "react";
import { IonAvatar, IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonThumbnail, useIonViewWillEnter } from "@ionic/react";
import firebase from "../firebase/firebase";
import { User } from "../model/user";
import { useAuth } from "../auth/AuthProvider";
import { calendarOutline, locationOutline, personCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router";

import './Information.css'

const Information = (props: any) => {

    const { postId, setClickedSegment, commonFollowers, setCommonFollowers } = props;
    const history = useHistory();
    const { user } = useAuth();
    const [account, setAccount] = useState<User>();

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

    useEffect(() => {
        const download = async () => {
            await getUserFromPostId(postId);
        };
        download();
    }, []);

    useEffect(() => {
        if (account) {
            getCommonFollowers(user!.id!, account.id!);
        }
    }, [account]);


    return (
        <IonContent>
            <div className="avatarInfo">
                <IonAvatar>
                    <img src={account?.avatar}></img>
                </IonAvatar>
                <IonLabel>{account?.username}</IonLabel>
            </div>
            <IonList>
                <IonItem>
                    <IonIcon style={{ marginRight: 10 }} icon={calendarOutline}></IonIcon>
                    <IonLabel>
                        <h2>Fecha en la que se unió a Instagram</h2>
                        <p>{account?.creation}</p>
                    </IonLabel>
                </IonItem>
                <IonItem>
                    <IonIcon style={{ marginRight: 10 }} icon={locationOutline}></IonIcon>
                    <IonLabel>
                        <h2>Cuenta ubicada en</h2>
                        <p>España</p>
                    </IonLabel>
                </IonItem>
                <IonItem onClick={() => { setClickedSegment('personas') }}>
                    <IonIcon style={{ marginRight: 10 }} icon={personCircleOutline}></IonIcon>
                    <IonLabel>
                        <h2>Personas en común</h2>
                        <p>{commonFollowers.length}</p>
                    </IonLabel>
                </IonItem>
            </IonList>
            <IonButton className="infoButton" onClick={() => history.push('/profile/' + account?.id)}>Visitar perfil</IonButton>
        </IonContent>
    );
}

export default Information;