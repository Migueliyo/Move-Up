import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { barbellOutline, home, playCircleOutline, searchOutline } from 'ionicons/icons';
import { ProfileStore } from './pages/ProfileStore';
import Profile from './pages/Profile';
import MyProfile from './pages/MyProfile';
import Home from './pages/Home';
import Search from './pages/Search';
import Challenge from './pages/Challenge';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import NewContent from './pages/NewContent';


setupIonicReact();

const App = () => {
  
  const profile = ProfileStore.useState(s => s.profile);
  
  return (
    <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/myprofile">
            <MyProfile />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
          <Route exact path="/explore">
            <Search />
          </Route>
          <Route exact path="/new">
            <NewContent />
          </Route>
          <Route path="/challenge">
            <Challenge />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
          </IonTabButton>
          <IonTabButton tab="explore" href="/explore">
            <IonIcon icon={searchOutline} />
          </IonTabButton>
          <IonTabButton tab="new" href="/new">
            <IonIcon icon={playCircleOutline} />
          </IonTabButton>
          <IonTabButton tab="challenge" href="/challenge">
            <IonIcon icon={barbellOutline} />
          </IonTabButton>
          <IonTabButton tab="myprofile" href="/myprofile">
            <img alt="tab avatar" src={ profile.avatar } />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  );
};

export default App;
