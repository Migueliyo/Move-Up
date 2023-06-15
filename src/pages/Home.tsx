import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonToolbar, RefresherEventDetail, useIonViewWillEnter } from '@ionic/react';
import { addCircleOutline, arrowBackOutline, heartOutline, logOutOutline, paperPlaneOutline } from 'ionicons/icons';

import { FirebaseResponse } from '../model/response';
import { AppProvider } from '../context/AppContext';

import Feed from '../components/Feed';
import firebase from '../firebase/firebase';


const Home = () => {

	const [posts, setPosts] = useState([]);
	const [clickedSegment, setClickedSegment] = useState('');
	const location = useLocation();

	const getPosts = async () => {
		const response: FirebaseResponse = await firebase.getPosts();
		if (!response.error) {
			setPosts(response.data);
		} else {
			console.log(response.error);
		}
	}

	useIonViewWillEnter(
		() => {
			getPosts();
		}, [location.key]
	)

	const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
		setTimeout(() => {
			// Any calls to load data go here
			event.detail.complete();
			getPosts();
		}, 2000);
	}

	return (
		<IonPage>

			<IonHeader>
				<IonToolbar>
					{clickedSegment === 'comentarios' &&
						<IonButtons slot="start">
							<IonButton color="dark" onClick={() => { setClickedSegment('') }}>
								<IonIcon icon={arrowBackOutline} />
							</IonButton>
							<p className='toolbar'>
								Comentarios
							</p>
						</IonButtons>
					}
					{clickedSegment === 'informacion' &&
						<IonButtons slot="start">
							<IonButton color="dark" onClick={() => { setClickedSegment('') }}>
								<IonIcon icon={arrowBackOutline} />
							</IonButton>
							<p className='toolbar'>
								Información sobre esta cuenta
							</p>
						</IonButtons>
					}

					{clickedSegment === '' &&
						<>
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
						</>
					}
				</IonToolbar>
			</IonHeader>

			<IonContent fullscreen>
				<IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
					<IonRefresherContent></IonRefresherContent>
				</IonRefresher>
				<Feed posts={posts} clickedSegment={clickedSegment} setClickedSegment={setClickedSegment} />
			</IonContent>
		</IonPage>
	);
};

export default Home;
