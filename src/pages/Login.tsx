import { IonAlert, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonItemGroup, IonLabel, IonMenuButton, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react';
import firebase from '../firebase/firebase';
import { Props } from '../model/props';
import { useAuth } from '../auth/AuthProvider';

const Login = ({ history }: Props) => {
    const refEmail = useRef<HTMLIonInputElement>();
    const refPassword = useRef<HTMLIonInputElement>();
    const [loginError, setLoginError] = useState(false);
    const { setUser } = useAuth();

    const onLogin = async () => {
        const email = refEmail.current?.value as string;
        const password = refPassword.current?.value as string;
        const response = await firebase.login(email, password, setUser);
        if (!response.error) {
            history.push('/');
        } else {
            setLoginError(true);
        }
    }

    const resetError = () => {
        loginError && setLoginError(false);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>Iniciar Sesión</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Iniciar Sesión</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid fixed={true}>
                    <IonRow>
                        <IonCol>
                            <IonItemGroup>
                                <IonItem>
                                    <IonInput ref={refEmail as any} onIonChange={resetError} type='email' placeholder='Email' label="Outline input" labelPlacement="floating" fill="outline"></IonInput>
                                </IonItem>
                                <IonItem>
                                    <IonInput ref={refPassword as any} onIonChange={resetError} label="Outline input" type='password' labelPlacement="floating" fill="outline" placeholder='Contraseña'></IonInput>
                                </IonItem>
                            </IonItemGroup>
                            {
                                loginError && (
                                    <IonAlert
                                        isOpen={loginError}
                                        trigger="present-alert"
                                        header="Alerta"
                                        subHeader="Fallo al iniciar sesión"
                                        message="Email o contraseña incorrectos"
                                        buttons={['OK']}
                                        onDidDismiss={() => setLoginError(false)}
                                    ></IonAlert>
                                )
                            }
                            <IonButton expand='block' onClick={onLogin}>Iniciar Sesión</IonButton>
                            <IonButton color="danger" expand='block' routerLink='/register'>Registrarme</IonButton>

                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage >
    );

}

export default Login;
