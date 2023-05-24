import { IonBackButton, IonButton, IonButtons, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { addCircleOutline, arrowBackOutline, bookmarksOutline, chevronDown, ellipsisVertical, gridOutline, menuOutline, personOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import firebase from '../firebase/firebase';

import styles from './Profile.module.scss';

import { useAuth } from '../auth/AuthProvider';
import { User } from '../model/user';
import { RouteParams } from '../model/routeParams';

const Profile = () => {

    const { user } = useAuth();
    const [profile, setProfile] = useState<User>();
    const params = useParams<RouteParams>();
    const [profileID, setProfileID] = useState<string>(params.id);
    
    const getUser = async (id: string) => {
      const tempProfile = await firebase.getUser(id);
      setProfile(tempProfile.data);
    };
    
    useEffect(() => {
        setProfileID(params.id);
      }, [params.id]);
      
      useEffect(() => {
        getUser(profileID);
      }, [profileID]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">

                        { profile && profile.id === user?.id ?
                            <p className={ styles.username }>
                                { profile.username }
                                <IonIcon icon={ chevronDown } />
                            </p>
                        :
                            <>
                                <IonBackButton icon={ arrowBackOutline } color="dark" text="" />
                                <p className={ styles.username } style={{ marginLeft: "1.5rem" }}>
                                    { profile && profile.username }
                                </p>
                            </>
                        }
					</IonButtons>

					<IonButtons slot="end">
						{ profile && profile.id === user?.id ?
                            <>
                                <IonButton color="dark">
                                    <IonIcon icon={ addCircleOutline } />
                                </IonButton>
                                <IonButton color="dark">
                                    <IonIcon icon={ menuOutline } />
                                </IonButton>
                            </>
                        :
                            <IonButton color="dark">
                                <IonIcon icon={ ellipsisVertical } />
                            </IonButton>
                        }
					</IonButtons>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>
                <IonGrid>
                    <IonRow className="ion-text-center ion-justify-content-between ion-align-self-center ion-align-items-center">
                        <IonCol size="4">
                            <img src={ profile && profile.avatar } alt="profile avatar" className={ styles.profileAvatar } />
                        </IonCol>

                        <IonCol>
                            <IonRow className="ion-text-center ion-justify-content-between ion-align-items-center ion-align-self-center ion-align">
                                <IonCol size="4" className="ion-text-center">
                                    <IonCardTitle className={ styles.value }>
                                        { profile && profile.posts && profile.posts.length }
                                    </IonCardTitle>
                                    <IonCardSubtitle className={ styles.label }>Posts</IonCardSubtitle>
                                </IonCol>

                                <IonCol size="4" className="ion-text-center">
                                    <IonCardTitle className={ styles.value }>
                                        { profile && profile.followers }
                                    </IonCardTitle>
                                    <IonCardSubtitle className={ styles.label }>Followers</IonCardSubtitle>
                                </IonCol>

                                <IonCol size="4" className="ion-text-center">
                                    <IonCardTitle className={ styles.value }>
                                        { profile && profile.following }
                                    </IonCardTitle>
                                    <IonCardSubtitle className={ styles.label }>Following</IonCardSubtitle>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol size="12" className={ styles.profileInfo }>
                            
                            <p className={ styles.profileUsername }>{ profile && profile.firstname } { profile && profile.surname }</p>
                            <p className={ styles.profileTitle }>{ profile && profile.title }</p>
                            <p className={ styles.profileBio }>{ profile && profile.bio }</p>
                            <a className={ styles.profileLink } href={ profile && profile.link }>{ profile && profile.link }</a>
                        </IonCol>
                    </IonRow>                    
                        
                    <IonRow className={ styles.profileActions }>
                        <IonCol size="5">
                            <IonButton expand="block" color="primary">Follow</IonButton>
                        </IonCol>

                        <IonCol size="5">
                            <IonButton className={ styles.lightButton } fill="outline" expand="block">Message</IonButton>
                        </IonCol>

                        <IonCol size="2">
                            <IonButton className={ styles.lightButton } fill="outline">
                                <IonIcon icon={ chevronDown } />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>

                <IonRow className="ion-text-center ion-justify-content-center ion-align-items-center ion-align-self-center">
                    <IonCol size="6" className="ion-justify-content-center ion-align-items-center ion-align-self-center" style={{ borderBottom: "2px solid black", marginBottom: "2px" }}>
                        <IonIcon style={{ fontSize: "1.5rem" }} icon={ gridOutline } />
                    </IonCol>

                    <IonCol size="6" className="ion-justify-content-center ion-align-items-center ion-align-self-center">
                        <IonIcon style={{ fontSize: "1.5rem" }} icon={ bookmarksOutline } />
                    </IonCol>
                </IonRow>

                <IonRow className="ion-no-padding ion-no-margin">
                    { profile && profile.posts && profile.posts.map((post, index) => {

                        return (
                            <IonCol className={ styles.postCol } key={ index } size="4">
                                <img alt="post" src={post.image} />
                            </IonCol>
                        )
                    })}
                </IonRow>
			</IonContent>
		</IonPage>
	);
};

export default Profile;
