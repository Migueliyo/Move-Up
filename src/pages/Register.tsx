import { IonAlert, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonItemGroup, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useRef, useState } from 'react';
import firebase from '../firebase/firebase';
import { Props } from '../model/props';

import "./InitalPages.css";
import { useAuth } from '../auth/AuthProvider';

const Register = ({ history }: Props) => {
    const refUsername = useRef<HTMLIonInputElement>();
    const refFirstname = useRef<HTMLIonInputElement>();
    const refSurname = useRef<HTMLIonInputElement>();
    const refEmail = useRef<HTMLIonInputElement>();
    const refPassword = useRef<HTMLIonInputElement>();

    const [registerError, setRegisterError] = useState(false);
    const [isEmptyError, setIsEmptyError] = useState(false);
    const { setUser } = useAuth();

    const onRegister = async () => {
        const username = refUsername.current?.value as string;
        const firstname = refFirstname.current?.value as string;
        const surname = refSurname.current?.value as string;
        const email = refEmail.current?.value as string;
        const password = refPassword.current?.value as string;

        if (!username || !firstname || !surname || !email || !password) {
            setIsEmptyError(true);
            return;
        }

        const response = await firebase.register(email, password, firstname, surname, username, setUser);
        if (!response.error) {
            history.push('/login');
        } else {
            setRegisterError(true);
        }
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonCard className="ion-card-register">
                    <img
                        className="ion-image"
                        src="assets\icon\favicon.png"
                        alt="login"
                    ></img>
                    <IonCardHeader>
                        <IonCardTitle className="ion-label">Registrarse</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonInput
                            className="ion-input"
                            ref={refFirstname as any}
                            type="text"
                            placeholder="Nombre"
                            label="Introduce tu nombre *"
                            labelPlacement="floating"
                            fill="solid"
                        ></IonInput>
                        <IonInput
                            className="ion-input"
                            ref={refSurname as any}
                            type="text"
                            placeholder="Apellido"
                            label="Introduce tu apellido *"
                            labelPlacement="floating"
                            fill="solid"
                        ></IonInput>
                        <IonInput
                            className="ion-input"
                            ref={refUsername as any}
                            type="text"
                            placeholder="Nombre de usuario"
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
                            placeholder="Email"
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
                            message="Email incorrecto / ya está siendo utilizado. La contraseña debe contener números"
                            buttons={["OK"]}
                            onDidDismiss={() => setRegisterError(false)}
                        ></IonAlert>
                        <IonAlert
                            isOpen={isEmptyError}
                            header="Alerta"
                            subHeader="Los campos están vacíos"
                            message="Por favor, completa todos los campos para completar el registro."
                            buttons={["OK"]}
                            onDidDismiss={() => setIsEmptyError(false)}
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
