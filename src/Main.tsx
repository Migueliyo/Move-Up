import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';
import Profile from './pages/Profile';
import Search from './pages/Search';
import NewContent from './pages/NewContent';
import Challenge from './pages/Challenge';
import { barbellOutline, home, playCircleOutline, searchOutline } from 'ionicons/icons';
import { useAuth } from './auth/AuthProvider';

const Main: React.FC = () => {
  
  const { user } = useAuth();

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
          {user && <img alt="tab avatar" src={user.avatar} />}
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  );
};

export default Main;




