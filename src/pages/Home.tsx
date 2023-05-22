import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonToolbar } from '@ionic/react';
import { addCircleOutline, heartOutline, logOutOutline, paperPlaneOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Feed from '../components/Feed';
import Stories from '../components/Stories';
import { PostStore } from './PostStore';
import { FirebaseResponse } from '../model/response';
import firebase from '../firebase/firebase';

const Home = () => {

	const [users, setUsers] = useState([]);
    const location = useLocation();

    const getUsers = async () => {
        const response: FirebaseResponse = await firebase.getUsers();
        if (!response.error) {
            setUsers(response.data);
        } else {
            console.log(response.error);
        }
    }

    useEffect(
        () => {
            getUsers()
        }, [location.key]
    )

	const posts = PostStore.useState(s => s.posts);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<img alt="main logo" src="/assets/logo.png" style={{ width: "7rem" }} />
					</IonButtons>

					<IonButtons slot="end">
						<IonButton color="dark">
							<IonIcon icon={ addCircleOutline } />
						</IonButton>
						<IonButton color="dark">
							<IonIcon icon={ heartOutline } />
						</IonButton>

						<IonButton color="dark">
							<IonIcon icon={ paperPlaneOutline } />
						</IonButton>

						<IonButton onClick={firebase.logOut}>
							<IonIcon icon={logOutOutline} />
            			</IonButton>

					</IonButtons>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>
				<Stories users={ users } />
				<Feed posts={ posts } />
			</IonContent>
		</IonPage>
	);
};

export default Home;
