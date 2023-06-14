import { useState } from 'react';

import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonRouterLink, IonRow, IonTitle, IonToolbar, RefresherEventDetail, useIonViewWillEnter } from '@ionic/react';
import { arrowBackOutline } from 'ionicons/icons';

import { useAuth } from '../auth/AuthProvider';
import { AppProvider } from '../context/AppContext';
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

  const getFriends = async (id: string) => {
    const response: FirebaseResponse = await firebase.getFriendsFromIdUser(id);
    if (!response.error) {
      setFriends(response.data);
    } else {
      console.log(response.error);
    }
  }

  const getPosts = async () => {
    const response: FirebaseResponse = await firebase.getPosts();
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
      getPosts();
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
                <IonCol key={index} className={`${index === 0 ? styles.friend : styles.friend} ${selectedColIndex === index ? styles.selected : ''}`}
                onClick={() => {
                  if (selectedColIndex === index){
                    setSelectedColIndex(null);
                    getPosts();
                  } else if (index === 0) {
                    setSelectedColIndex(index);
                    getPostByFriend(user!.id!);
                  }
                  else {
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
				<AppProvider>
					<Feed posts={posts} clickedSegment={clickedSegment} setClickedSegment={setClickedSegment} />
				</AppProvider>
      </IonContent>
    </IonPage>
  );
};

export default Friends;
