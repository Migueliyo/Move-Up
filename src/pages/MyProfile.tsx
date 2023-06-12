import { useEffect, useState } from 'react';

import { IonButton, IonButtons, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonRow, IonSegment, IonSegmentButton, IonToolbar, RefresherEventDetail } from '@ionic/react';
import { addCircleOutline, arrowBackOutline, bookmarksOutline, chevronDown, gridOutline, menuOutline } from 'ionicons/icons';

import { useAuth } from '../auth/AuthProvider';
import { User } from '../model/user';
import { Post } from '../model/post';
import firebase from '../firebase/firebase';
import Feed from '../components/Feed';

import Follow from '../components/Follow';

import styles from './Profile.module.scss';


const MyProfile = () => {

    const { user, setUser } = useAuth();
    const [profile, setProfile] = useState<User>();
    const [posts, setPosts] = useState<Post[]>();
    const [activeSegment, setActiveSegment] = useState('posts');
    const [clickedSegment, setClickedSegment] = useState('');
    const [clickedImage, setClickedImage] = useState('');

    const getPostFromIdUser = async (id: string) => {
        const response = await firebase.getPostsFromIdUser(id);
        if (!response.error)
            setPosts(response.data);
    };

    const getUser = async (id: string) => {
        const response = await firebase.getUser(id);
        if (!response.error) {
            setProfile(response.data);
            setUser(response.data!);
        }
    };

    useEffect(() => {
        if (user != null) {
            getUser(user!.id!);
            getPostFromIdUser(user.id!);
        }
    }, []);

    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        setTimeout(() => {
            // Any calls to load data go here
            event.detail.complete();
            getUser(user!.id!);
            getPostFromIdUser(user!.id!);
        }, 2000);
    };

    const handleSegmentChange = (segmentValue: any) => {
        setActiveSegment(segmentValue);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {clickedSegment === 'seguidores' || clickedSegment === 'seguidos' &&
                        <>
                            <IonButtons slot="start">
                                <IonButton color="dark" onClick={() => { setClickedSegment('') }}>
                                    <IonIcon icon={arrowBackOutline} />
                                </IonButton>
                                <p className={styles.username}>
                                    {user?.username}
                                </p>
                            </IonButtons>
                        </>
                    }
                    {clickedSegment === 'publicaciones' &&
                        <>
                            <IonButtons slot="start">
                                <IonButton color="dark" onClick={() => { setClickedSegment('') }}>
                                    <IonIcon icon={arrowBackOutline} />
                                </IonButton>
                                <p className={styles.username}>
                                    Publicaciones
                                </p>
                            </IonButtons>
                        </>
                    }
                    {clickedSegment === '' &&
                        <>
                            <IonButtons slot="start">
                                <p className={styles.username}>
                                    {user?.username}
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
                        </>
                    }
                </IonToolbar>
            </IonHeader>

            {clickedSegment === 'seguidores' || clickedSegment === 'seguidos' &&
                <Follow clicked={clickedSegment} />
            }
            {clickedSegment === 'publicaciones' &&
                <IonContent fullscreen>
                    <Feed posts={posts} clickedImage={clickedImage} />
                </IonContent>
            }
            {clickedSegment === '' &&
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
                                <IonButton className={styles.lightButton} fill="outline" expand="block">Insights</IonButton>
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

                    {activeSegment === 'posts' && (
                        <IonRow className="ion-no-padding ion-no-margin">
                            {posts && posts.map((post, index) => {
                                return (
                                    <IonCol className={styles.postCol} key={index} size="4">
                                        <img key={index} alt="post" src={post.image} onClick={() => { setClickedSegment('publicaciones'); setClickedImage(`post-${index}`) }} />
                                    </IonCol>
                                );
                            })}
                        </IonRow>
                    )}
                    {activeSegment === 'saved' && <div></div>}
                </IonContent>
            }
        </IonPage>
    );
};

export default MyProfile;
