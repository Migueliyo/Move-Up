import { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';

import { IonBackButton, IonButton, IonButtons, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSegment, IonSegmentButton, IonToolbar, RefresherEventDetail, useIonViewWillEnter } from '@ionic/react';
import { arrowBackOutline, bookmarksOutline, chevronDown, ellipsisVertical, gridOutline, menuOutline } from 'ionicons/icons';

import { useAuth } from '../auth/AuthProvider';
import { Post } from '../model/post';
import { User } from '../model/user';
import { RouteParams } from '../model/routeParams';
import firebase from '../firebase/firebase';

import Follow from '../components/Follow';

import styles from './Profile.module.scss';


const Profile = () => {

    const history = useHistory();
    const { user } = useAuth();
    const [profile, setProfile] = useState<User>();
    const [posts, setPosts] = useState<Post[]>();
    const params = useParams<RouteParams>();
    const [profileID, setProfileID] = useState<string>(params.id);
    const [following, setFollowing] = useState<boolean>();
    const [activeSegment, setActiveSegment] = useState('posts');
    const [clickedSegment, setClickedSegment] = useState('');

    const getUser = async (id: string) => {
        const response = await firebase.getUser(id);
        if (!response.error)
            setProfile(response.data);
    };

    const getPostFromIdUser = async (id: string) => {
        const response = await firebase.getPostsFromIdUser(id);
        if (!response.error)
            setPosts(response.data);
    }

    const checkFollow = async (idUserLogged: string, idUserFollow: string) => {
        const response = await firebase.checkFollow(idUserLogged, idUserFollow);
        setFollowing(response);
    }

    useEffect(() => {
        setProfileID(params.id);
    }, [params.id]);

    useEffect(() => {
        if (params.id === user!.id) {
            history.replace('/myprofile');
        } else {
            checkFollow(user!.id!, profileID);
            getUser(profileID);
            getPostFromIdUser(profileID);
        }
    }, [profileID, params.id, user, history]);

    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        setTimeout(() => {
            // Any calls to load data go here
            event.detail.complete();
            getUser(profileID);
            getPostFromIdUser(profileID);
        }, 2000);
    }

    const handleSegmentChange = (segmentValue: any) => {
        setActiveSegment(segmentValue);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {(clickedSegment === 'seguidores' || clickedSegment === 'seguidos') ? (
                        <>
                            <IonButtons slot="start">
                                <IonButton color="dark" onClick={() => { setClickedSegment('') }}>
                                    <IonIcon icon={arrowBackOutline} />
                                </IonButton>
                                <p className={styles.username}>
                                    {profile?.username}
                                </p>
                            </IonButtons>
                        </>
                    )
                    :
                    (
                        <>
                            <IonButtons slot="start">
                                <IonBackButton icon={arrowBackOutline} color="dark" />
                                <p className={styles.username} style={{ marginLeft: "1.5rem" }}>
                                    {profile && profile.username}
                                </p>
                            </IonButtons>
                            <IonButtons slot="end">
                                <IonButton color="dark">
                                    <IonIcon icon={ellipsisVertical} />
                                </IonButton>
                            </IonButtons>
                        </>
                    )}
                </IonToolbar>
            </IonHeader>

            {clickedSegment === 'seguidores' || clickedSegment === 'seguidos' ? (
                <Follow clicked={clickedSegment} />
            ) : (
                <IonContent fullscreen>
                    <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                        <IonRefresherContent></IonRefresherContent>
                    </IonRefresher>
                    <IonGrid>
                        <IonRow className="ion-text-center ion-justify-content-between ion-align-self-center ion-align-items-center">
                            <IonCol size="4">
                                <img src={profile && profile.avatar} alt="profile avatar" className={styles.profileAvatar} />
                            </IonCol>

                            <IonCol>
                                <IonRow className="ion-text-center ion-justify-content-between ion-align-items-center ion-align-self-center ion-align">
                                    <IonCol size="4" className="ion-text-center">
                                        <IonCardTitle className={styles.value}>
                                            {profile && profile.posts && profile.posts.length}
                                        </IonCardTitle>
                                        <IonCardSubtitle className={styles.label}>Publicaciones</IonCardSubtitle>
                                    </IonCol>

                                    <IonCol size="4" className="ion-text-center" onClick={() => { setClickedSegment('seguidores') }}>
                                        <IonCardTitle className={styles.value}>
                                            {profile && profile.followers.length ? profile.followers.length : 0}
                                        </IonCardTitle>
                                        <IonCardSubtitle className={styles.label}>Seguidores</IonCardSubtitle>
                                    </IonCol>

                                    <IonCol size="4" className="ion-text-center" onClick={() => { setClickedSegment('seguidos') }}>
                                        <IonCardTitle className={styles.value}>
                                            {profile && profile.following.length ? profile.following.length : 0}
                                        </IonCardTitle>
                                        <IonCardSubtitle className={styles.label}>Siguiendo</IonCardSubtitle>
                                    </IonCol>
                                </IonRow>
                            </IonCol>
                        </IonRow>

                        <IonRow>
                            <IonCol size="12" className={styles.profileInfo}>

                                <p className={styles.profileUsername}>{profile && profile.firstname} {profile && profile.surname}</p>
                                <p className={styles.profileTitle}>{profile && profile.title}</p>
                                <p className={styles.profileBio}>{profile && profile.bio}</p>
                                <a className={styles.profileLink} href={profile && profile.link}>{profile && profile.link}</a>
                            </IonCol>
                        </IonRow>

                        <IonRow className={styles.profileActions}>
                            <IonCol size="5">
                                {!following && (
                                    <IonButton expand="block" color="primary" onClick={() => { firebase.follow(user!.id!, profile!.id!); setFollowing(true) }}>Seguir</IonButton>
                                )}
                                {following && (
                                    <IonButton className={styles.lightButton} fill="outline" expand="block" onClick={() => { firebase.unfollow(user!.id!, profile!.id!); setFollowing(false) }}>Siguiendo</IonButton>
                                )}
                            </IonCol>
                            <IonCol size="5">
                                <IonButton className={styles.lightButton} fill="outline" expand="block">Enviar mensaje</IonButton>
                            </IonCol>
                            <IonCol size="2">
                                <IonButton className={styles.lightButton} fill="outline">
                                    <IonIcon icon={chevronDown} />
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        
                    </IonGrid>

                    <IonRow className="ion-text-center ion-justify-content-center ion-align-items-center ion-align-self-center">
                        <IonSegment defaultValue={activeSegment} value={activeSegment} className={styles.ionSegment} onIonChange={e => handleSegmentChange(e.detail.value)}>
                            <IonSegmentButton value="posts" className={styles.customSegment} onClick={() => handleSegmentChange('posts')}>
                                <IonCol size="6" className="ion-justify-content-center ion-align-items-center ion-align-self-center" style={{ marginBottom: "2px" }}>
                                    <IonIcon style={{ fontSize: "1.5rem", color: "black" }} icon={gridOutline} />
                                </IonCol>
                            </IonSegmentButton>
                            <IonSegmentButton value="saved" className={styles.customSegment} onClick={() => handleSegmentChange('saved')}>
                                <IonCol size="6" className="ion-justify-content-center ion-align-items-center ion-align-self-center">
                                    <IonIcon style={{ fontSize: "1.5rem", color: "black" }} icon={bookmarksOutline} />
                                </IonCol>
                            </IonSegmentButton>
                        </IonSegment>
                    </IonRow>

                    {activeSegment === 'posts' &&
                        <IonRow className="ion-no-padding ion-no-margin">
                            {posts && posts.map((post, index) => {
                                return (
                                    <IonCol className={styles.postCol} key={index} size="4">
                                        <img alt="post" src={post.image} />
                                    </IonCol>
                                )
                            })}
                        </IonRow>
                    }
                    {activeSegment === 'saved' &&
                        <div></div>
                    }

                </IonContent>
            )}
        </IonPage>
    );
};

export default Profile;
