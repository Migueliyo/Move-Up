import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';

import { IonContent, IonItem, IonList, IonSegment, IonSegmentButton, IonThumbnail } from "@ionic/react";

import { useAuth } from "../auth/AuthProvider";
import { User } from "../model/user";
import { RouteParams } from "../model/routeParams";
import firebase from "../firebase/firebase";

import './Follow.css';

const Follow = (props: { clicked: string }) => {

    const history = useHistory();
    const { clicked } = props;
    const { user } = useAuth();
    const params = useParams<RouteParams>();
    const [profile, setProfile] = useState<User>();
    const [profileID, setProfileID] = useState<string>(params.id);
    const [followers, setFollowers] = useState<User[]>([]);
    const [following, setFollowing] = useState<User[]>([]);
    const [activeSegment, setActiveSegment] = useState(clicked);

    const getUser = async (id: string) => {
        const response = await firebase.getUser(id);
        if (!response.error)
            setProfile(response.data);
    };

    const getFollowers = async (id: string) => {
        const response = await firebase.getFollowers(id);
        if (!response.error)
            setFollowers(response.data);
    }

    const getFollowing = async (id: string) => {
        const response = await firebase.getFollowing(id);
        if (!response.error)
            setFollowing(response.data);
    }

    useEffect(() => {
        setProfileID(params.id);
        setFollowers([]);
        setFollowing([]);
    }, [params.id]);

    useEffect(() => {
        if (profileID != undefined) {
            getUser(profileID);
            getFollowers(profileID);
            getFollowing(profileID);
        } else {
            getUser(user!.id!)    
            getFollowers(user!.id!);
            getFollowing(user!.id!);
        }
    }, [profileID]);

    const handleSegmentChange = (segmentValue: any) => {
        setActiveSegment(segmentValue);
    };

    return (
        <IonContent fullscreen>
            <IonSegment defaultValue={activeSegment} value={activeSegment} className='ionSegment' onIonChange={e => handleSegmentChange(e.detail.value)}>
                <IonSegmentButton value="seguidores" className='customSegment' onClick={() => handleSegmentChange('seguidores')}>
                    {profile?.followers.length ? profile?.followers.length : 0} seguidores
                </IonSegmentButton>
                <IonSegmentButton value="seguidos" className='customSegment' onClick={() => handleSegmentChange('seguidos')}>
                    {profile?.following.length ? profile?.following.length : 0} seguidos
                </IonSegmentButton>
            </IonSegment>

            {activeSegment === 'seguidores' &&
                <IonList>
                    {followers.length === 0 ?
                        user!.id === profileID || profileID === undefined ?
                            <p className="parrafo-info"> Todavía no estás siguiendo a nadie</p>
                            :
                            <p className="parrafo-info"> Todavía no está siguiendo a nadie</p>
                        :
                        followers.map((user: User) => {
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
            }
            {activeSegment === 'seguidos' &&
                <IonList>
                    {following.length === 0 ?
                        user!.id === profileID || profileID === undefined ?
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
            }
        </IonContent>

    );
}

export default Follow;