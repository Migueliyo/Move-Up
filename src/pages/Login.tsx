import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonContent,
  IonInput,
  IonPage,
} from "@ionic/react";
import { useRef, useState } from "react";
import firebase from "../firebase/firebase";
import { Props } from "../model/props";
import { useAuth } from "../auth/AuthProvider";

import "./InitalPages.css";

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
      history.push("/");
    } else {
      setLoginError(true);
    }
  };

  const resetError = () => {
    loginError && setLoginError(false);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard className="ion-card">
          <img
            className="ion-image"
            src="assets\icon\favicon.png"
            alt="login"
          ></img>

          <IonCardHeader>
            <IonCardTitle className="ion-label">Iniciar sesión</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput
              className="ion-input"
              ref={refEmail as any}
              onIonChange={resetError}
              type="email"
              placeholder="Email"
              label="Introduce tu email *"
              labelPlacement="floating"
              fill="solid"
            ></IonInput>
            <IonInput
              className="ion-input"
              ref={refPassword as any}
              onIonChange={resetError}
              label="Introduce tu contraseña *"
              type="password"
              labelPlacement="floating"
              fill="solid"
              placeholder="Contraseña"
            ></IonInput>
            <IonCheckbox labelPlacement="end" className="ion-checkbox">
              Recuérdame
            </IonCheckbox>
            <IonAlert
              isOpen={loginError}
              header="Alerta"
              subHeader="Fallo al iniciar sesión"
              message="Email o contraseña incorrectos"
              buttons={["OK"]}
              onDidDismiss={() => setLoginError(false)}
            ></IonAlert>
            <IonButton expand="block" onClick={onLogin}>
              Iniciar Sesión
            </IonButton>
            <div className="a-href"><a href="/register">¿No tienes una cuenta? Regístrate</a></div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
