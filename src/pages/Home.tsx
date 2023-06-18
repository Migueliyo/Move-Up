import { useEffect, useState } from 'react';

import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonToolbar, RefresherEventDetail, useIonViewWillEnter } from '@ionic/react';
import { arrowBackOutline, logOutOutline } from 'ionicons/icons';

import { FirebaseResponse } from '../model/response';

import Feed from '../components/Feed';
import firebase from '../firebase/firebase';


const Home = () => {

	const [posts, setPosts] = useState([]);
	const [clickedSegment, setClickedSegment] = useState('');
	const [refresh, setRefresh] = useState(false);

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
			getPosts();
		}, [refresh]
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

					{clickedSegment === 'personas' &&
						<IonButtons slot="start">
							<IonButton color="dark" onClick={() => { setClickedSegment('informacion') }}>
								<IonIcon icon={arrowBackOutline} />
							</IonButton>
							<p className='toolbar'>
								Personas en común
							</p>
						</IonButtons>
					}

					{clickedSegment === '' &&
						<>
							<IonButtons slot="start">
								<img alt="main logo" src="/assets/logo.png" style={{ width: "7rem" }} />
							</IonButtons>

							<IonButtons slot="end">
								<IonButton color="dark" onClick={firebase.logOut}>
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
				<Feed posts={posts} clickedSegment={clickedSegment} setClickedSegment={setClickedSegment} refresh={refresh} setRefresh={setRefresh} />
			</IonContent>
		</IonPage>
	);
};

export default Home;
