import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonList, IonPage, IonProgressBar, IonSearchbar, IonThumbnail, useIonViewDidLeave, useIonViewWillEnter } from '@ionic/react';

import { FirebaseResponse } from '../model/response';
import { User } from '../model/user';

import firebase from '../firebase/firebase';

import './Search.css';

const Search: React.FC = () => {

  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loadedUsers, setLoadedUsers] = useState(15);

  const getUsers = async () => {
    const response: FirebaseResponse = await firebase.getUsers();
    if (!response.error) {
      setUsers(response.data.slice(0, loadedUsers));
      setLoadedUsers(loadedUsers + 15);
    } else {
      console.log(response.error);
    }
  }

  useIonViewWillEnter(
    () => {
      getUsers();
    }, []
  )

  return (
    <IonPage>
      <IonHeader className="toolbar-background no-shadow">
        <IonSearchbar onIonChange={(e) => {
          setSearch(e.target.value ? e.target.value : '')
        }} showClearButton="always" placeholder='Buscar' className="searchbar-no-shadow"></IonSearchbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {users.sort().filter((user: User) => {
            return user.username.includes(search)
          }).map((user: User) => {
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
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            setTimeout(async () => {
              await getUsers();
              ev.target.complete();
            }, 2000);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage >
  );
};

export default Search;