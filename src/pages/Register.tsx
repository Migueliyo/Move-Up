import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonItemGroup, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useRef } from 'react';
import firebase from '../firebase/firebase';
import { Props } from '../model/props';

const Register = ({history} : Props) => {
    const refName = useRef<HTMLIonInputElement>();
    const refEmail = useRef<HTMLIonInputElement>();
    const refPassword = useRef<HTMLIonInputElement>();

    const onRegister = async () => {
        const name = refName.current?.value as string;
        const email = refEmail.current?.value as string;
        const password = refPassword.current?.value as string;
        const response = await firebase.register(email, password);
        if (!response.error) {
            history.push('/');
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Registrar usuario</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>

                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Registrar usuario</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid fixed={true}>
                    <IonRow>
                        <IonCol>
                            <IonItemGroup>
                                <IonItem>
                                    <IonLabel>
                                        <IonInput ref={refName as any} placeholder='Nombre y apellidos' />
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>
                                        <IonInput ref={refEmail as any} type='email' placeholder='email' />
                                    </IonLabel>
                                </IonItem>
                                <IonItem>
                                    <IonLabel>
                                        <IonInput ref={refPassword as any} type='password' placeholder='password' />
                                    </IonLabel>
                                </IonItem>
                            </IonItemGroup>
                            <IonButton expand='block' onClick={onRegister}>Registrar</IonButton>
                            <IonButton expand='block' routerLink='/login'>Ir a Inicio Sesión</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    );

}

export default Register;
