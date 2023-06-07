import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';

import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonList, IonPage, IonThumbnail, IonToolbar } from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";

import { useAuth } from "../auth/AuthProvider";
import { User } from "../model/user";
import { RouteParams } from "../model/routeParams";
import firebase from "../firebase/firebase";

import styles from './Profile.module.scss';

import './Search.css';


const Followers = () => {

    const history = useHistory();
    const { user } = useAuth();
    const params = useParams<RouteParams>();
    const [profile, setProfile] = useState<User>();
    const [profileID, setProfileID] = useState<string>(params.id);
    const [following, setFollowing] = useState<User[]>([]);

    const getUser = async (id: string) => {
        const response = await firebase.getUser(id);
        if (!response.error)
            setProfile(response.data);
    };

    const getFollowers = async (id: string) => {
        const response = await firebase.getFollowing(id);
        if (!response.error)
            setFollowing(response.data);
    }

    useEffect(() => {
        setProfileID(params.id);
        setFollowing([]);
    }, [params.id]);

    useEffect(() => {
        getUser(profileID);
        getFollowers(profileID);
    }, [profileID]);

    return (
        <IonPage>
            <IonHeader className="toolbar-background no-shadow">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton icon={arrowBackOutline} color="dark" text="" />
                        <p className={styles.username} style={{ marginLeft: "1.5rem" }}>
                            {profile && profile.username}
                        </p>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {following.length === 0 ? 
                        user!.id === profileID ? 
                        <p className="parrafo-info"> Todavía no estás siguiendo a nadie</p> 
                        : 
                        <p className="parrafo-info"> Todavía no está siguiendo a nadie</p> 
                    : 
                    following.map((user: User) => {
                        // console.log(user.id);
                        return (
                            <IonItem key={user.id} onClick={() => { history.push("/profile/" + user.id) }}>
                                <IonThumbnail slot="start">
                                    <img className="searchImage" alt="Foto de perfil" src={user.avatar} />
                                </IonThumbnail>
                                <div className="containerSearch">
                                    <strong>{user.username}</strong>
                                    <p>{user.firstname} {user.surname}</p>
                                </div>
                                
                            </IonItem>
                        );
                    })}
                </IonList>
            </IonContent>
        </IonPage >
    );
}

export default Followers;