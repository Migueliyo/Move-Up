import { useEffect, useState } from 'react';

import { IonButton, IonButtons, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonLabel, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSegment, IonSegmentButton, IonToolbar, RefresherEventDetail, useIonViewWillEnter } from '@ionic/react';
import { addCircleOutline, bookmarksOutline, chevronDown, gridOutline, menuOutline } from 'ionicons/icons';

import { useAuth } from '../auth/AuthProvider';
import { User } from '../model/user';
import { Post } from '../model/post';
import firebase from '../firebase/firebase';

import styles from './Profile.module.scss';

const MyProfile = () => {

    const { user } = useAuth();
    const [profile, setProfile] = useState<User>();
    const [posts, setPosts] = useState<Post[]>();

    const getPostFromIdUser = async (id: string) => {
        const response = await firebase.getPostsFromIdUser(id);
        if (!response.error)
            setPosts(response.data);
    }

    useEffect(
        () => {
            if (user != null) {
                setProfile(user);
                getPostFromIdUser(user.id!);
            }

        }, []
    )

    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        setTimeout(() => {
            // Any calls to load data go here
            event.detail.complete();
            getPostFromIdUser(user!.id!);
        }, 2000);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">

                        <p className={styles.username}>
                            {profile && profile.username}
                            <IonIcon icon={chevronDown} />
                        </p>
                    </IonButtons>

                    <IonButtons slot="end">
                        <IonButton color="dark">
                            <IonIcon icon={addCircleOutline} />
                        </IonButton>
                        <IonButton color="dark">
                            <IonIcon icon={menuOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <IonGrid>
                    <IonRow className="ion-text-center ion-justify-content-between ion-align-self-center ion-align-items-center">
                        <IonCol size="4">
                            <img src={profile?.avatar ?? ''} alt="profile avatar" className={styles.profileAvatar} />
                        </IonCol>

                        <IonCol>
                            <IonRow className="ion-text-center ion-justify-content-between ion-align-items-center ion-align-self-center ion-align">
                                <IonCol size="4" className="ion-text-center">
                                    <IonCardTitle className={styles.value}>
                                        {profile && profile.posts && profile.posts.length}
                                    </IonCardTitle>
                                    <IonCardSubtitle className={styles.label}>Posts</IonCardSubtitle>
                                </IonCol>

                                <IonCol size="4" className="ion-text-center">
                                    <IonCardTitle className={styles.value}>
                                        {profile && profile.followers}
                                    </IonCardTitle>
                                    <IonCardSubtitle className={styles.label}>Followers</IonCardSubtitle>
                                </IonCol>

                                <IonCol size="4" className="ion-text-center">
                                    <IonCardTitle className={styles.value}>
                                        {profile && profile.following}
                                    </IonCardTitle>
                                    <IonCardSubtitle className={styles.label}>Following</IonCardSubtitle>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12" className={styles.profileInfo}>

                            <p className={styles.profileUsername}>{profile && profile.firstname} {profile && profile.surname}</p>
                            <p className={styles.profileTitle}>{profile && profile.title}</p>
                            <p className={styles.profileBio}>{profile && profile.bio}</p>
                            <a className={styles.profileLink} href={profile?.link ?? ''}>{profile?.link ?? ''}</a>
                        </IonCol>
                    </IonRow>

                    <IonRow className={styles.profileActions}>
                        <IonCol size="4">
                            <IonButton className={styles.lightButton} expand="block" fill="outline">Edit Profile</IonButton>
                        </IonCol>

                        <IonCol size="4">
                            <IonButton className={styles.lightButton} fill="outline" expand="block">Promotions</IonButton>
                        </IonCol>

                        <IonCol size="4">
                            <IonButton className={styles.lightButton} fill="outline" expand="block">
                                Insights
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonRow className="ion-text-center ion-justify-content-center ion-align-items-center ion-align-self-center">
                    <IonSegment value="default" className={styles.ionSegment}>
                        <IonSegmentButton value="posts" className={styles.customSegment}>
                            <IonCol size="6" className="ion-justify-content-center ion-align-items-center ion-align-self-center" style={{ marginBottom: "2px" }}>
                                <IonIcon style={{ fontSize: "1.5rem", color: "black" }} icon={gridOutline} />
                            </IonCol>
                        </IonSegmentButton>
                        <IonSegmentButton value="saved" className={styles.customSegment}>
                            <IonCol size="6" className="ion-justify-content-center ion-align-items-center ion-align-self-center">
                                <IonIcon style={{ fontSize: "1.5rem", color: "black" }} icon={bookmarksOutline} />
                            </IonCol>
                        </IonSegmentButton>
                    </IonSegment>
                </IonRow>

                <IonRow className={"ion-no-padding ion-no-margin"}>
                    {posts && posts.map((post, index) => {
                        return (
                            <IonCol className={styles.postCol} key={index} size="4">
                                <img alt="post" src={post.image} />
                            </IonCol>
                        )
                    })}
                </IonRow>
            </IonContent>
        </IonPage>
    );
};

export default MyProfile;
