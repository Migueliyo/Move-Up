import { useState } from 'react';

import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonPage, IonProgressBar, IonRefresher, IonRefresherContent, IonRouterLink, IonRow, IonTitle, IonToolbar, RefresherEventDetail, useIonViewWillEnter } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';

import { useAuth } from '../auth/AuthProvider';
import { FirebaseResponse } from '../model/response';
import { User } from '../model/user';
import { Post } from '../model/post';

import firebase from '../firebase/firebase';
import Feed from '../components/Feed';

import styles from "./Friends.module.scss";


const Friends = () => {

  const { user } = useAuth();
  const [friends, setFriends] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedColIndex, setSelectedColIndex] = useState<number | null>(null);
  const [clickedSegment, setClickedSegment] = useState('');
  const [loading, setLoading] = useState(true);

  const getFriends = async (id: string) => {
    const response: FirebaseResponse = await firebase.getFriendsFromIdUser(id);
    if (!response.error) {
      setFriends([user, ...response.data]);
    } else {
      console.log(response.error);
    }
  }

  const getPostsByFriends = async (id: string) => {
    const response: FirebaseResponse = await firebase.getPostsByFriends(id);
    if (!response.error) {
      setPosts(response.data);
    } else {
      console.log(response.error);
    }
  }


  const getPostByFriend = async (id: string) => {
    const response: FirebaseResponse = await firebase.getPostsFromIdUser(id);
    if (!response.error) {
      setPosts(response.data);
    } else {
      console.log(response.error);
    }
  }

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      // Any calls to load data go here
      event.detail.complete();
      getFriends(user!.id!);
      setSelectedColIndex(null);
    }, 2000);
  }


  useIonViewWillEnter(
    () => {
      getFriends(user!.id!);
      getPostsByFriends(user!.id!);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        {(clickedSegment === 'comentarios') ?
						(
            <IonButtons slot="start">
							<IonButton color="dark" onClick={() => { setClickedSegment('') }}>
								<IonIcon icon={arrowBackOutline} />
							</IonButton>
							<p className='toolbar'>
								Comentarios
							</p>
						</IonButtons>
						)
						:
						(          
              <p className={styles.firstDiv}>Amigos</p>
						)}
        </IonToolbar>
        {loading && <IonProgressBar type="indeterminate"></IonProgressBar>}
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {(clickedSegment !== 'comentarios') ? (
        <IonRow className={styles.friends}>
          <div className={styles.friendsContainer}>
            {friends.map((friend: User, index: number) => {
              return (
                <IonCol key={index} className={`${styles.friend} ${selectedColIndex === index ? styles.selected : ''}`}
                onClick={() => {
                  if (selectedColIndex === index){
                    setSelectedColIndex(null);
                    getPostsByFriends(user!.id!);
                  } else if (index === 0) {
                    setSelectedColIndex(index);
                    getPostByFriend(user!.id!);
                  } else {
                    setSelectedColIndex(index);
                    getPostByFriend(friend.id!)
                  }

                }}>
                  <img alt="friend avatar" src={index === 0 ? user?.avatar : friend.avatar} />
                  {index === 0 && <div className={styles.friendAdd}>+</div>}

                  <p>{index === 0 ? "Tus posts" : friend.username}</p>

                </IonCol>
              );
            })}
          </div>
        </IonRow>) : (<></>)}
				<Feed posts={posts} clickedSegment={clickedSegment} setClickedSegment={setClickedSegment} />
      </IonContent>
    </IonPage>
  );
};

export default Friends;
