import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonToolbar, RefresherEventDetail } from '@ionic/react';
import { addCircleOutline, heartOutline, logOutOutline, paperPlaneOutline } from 'ionicons/icons';

import { FirebaseResponse } from '../model/response';
import { LikedProvider } from '../context/LikedContext';

import Feed from '../components/Feed';
import Stories from '../components/Stories';
import firebase from '../firebase/firebase';

const Home = () => {

	const [users, setUsers] = useState([]);
	const [posts, setPosts] = useState([]);
	const location = useLocation();

	const getUsers = async () => {
		const response: FirebaseResponse = await firebase.getUsers();
		if (!response.error) {
			setUsers(response.data);
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

	useEffect(
		() => {
			getUsers();
			getPosts();
		}, [location.key]
	)

	const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
		setTimeout(() => {
			// Any calls to load data go here
			event.detail.complete();
			getUsers();
			getPosts();
		}, 2000);
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<img alt="main logo" src="/assets/logo.png" style={{ width: "7rem" }} />
					</IonButtons>

					<IonButtons slot="end">
						<IonButton color="dark">
							<IonIcon icon={addCircleOutline} />
						</IonButton>
						<IonButton color="dark">
							<IonIcon icon={heartOutline} />
						</IonButton>

						<IonButton color="dark">
							<IonIcon icon={paperPlaneOutline} />
						</IonButton>

						<IonButton onClick={firebase.logOut}>
							<IonIcon icon={logOutOutline} />
						</IonButton>

					</IonButtons>
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>
				<IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
					<IonRefresherContent></IonRefresherContent>
				</IonRefresher>
				<Stories users={users} />
				<LikedProvider>
					<Feed posts={posts} />
				</LikedProvider>

			</IonContent>
		</IonPage>
	);
};

export default Home;
