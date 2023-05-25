import { IonAlert, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonItemGroup, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react';
import firebase from '../firebase/firebase';
import { Props } from '../model/props';

import "./InitalPages.css";

const Register = ({ history }: Props) => {
    const refName = useRef<HTMLIonInputElement>();
    const refEmail = useRef<HTMLIonInputElement>();
    const refPassword = useRef<HTMLIonInputElement>();

    const [registerError, setRegisterError] = useState(false);

    const onRegister = async () => {
        const name = refName.current?.value as string;
        const email = refEmail.current?.value as string;
        const password = refPassword.current?.value as string;
        const response = await firebase.register(email, password);
        if (!response.error) {
            history.push('/');
        } else {
            setRegisterError(true);
        }
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonCard className="ion-card">
                    <img
                        className="ion-image"
                        src="public\assets\icon\favicon.png"
                        alt="login"
                    ></img>

                    <IonCardHeader>
                        <IonCardTitle className="ion-label">Registrarse</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonInput
                            className="ion-input"
                            ref={refName as any}
                            type="text"
                            placeholder="Email"
                            label="Introduce tu nombre de usuario *"
                            labelPlacement="floating"
                            fill="solid"
                        ></IonInput>
                        <IonInput
                            className="ion-input"
                            ref={refEmail as any}
                            label="Introduce tu email *"
                            type="email"
                            labelPlacement="floating"
                            fill="solid"
                            placeholder="Contraseña"
                        ></IonInput>
                        <IonInput
                            className="ion-input"
                            ref={refPassword as any}
                            label="Introduce tu contraseña *"
                            type="password"
                            labelPlacement="floating"
                            fill="solid"
                            placeholder="Contraseña"
                        ></IonInput>
                        <IonAlert
                            isOpen={registerError}
                            header="Alerta"
                            subHeader="Fallo en el registro de sesión"
                            message="El email o nombre de usuario ya están siendo utilizados"
                            buttons={["OK"]}
                            onDidDismiss={() => setRegisterError(false)}
                        ></IonAlert>
                        <IonButton expand="block" onClick={onRegister}>
                            Registrarse
                        </IonButton>
                        <div className="a-href"><a href="/login">Volver a inicio de sesión</a></div>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage >
    );

}

export default Register;
