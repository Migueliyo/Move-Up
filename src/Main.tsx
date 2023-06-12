import { Redirect, Route } from 'react-router-dom';
import { useState } from 'react';

import { IonApp, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { addCircle, addCircleOutline, home, homeOutline, people, peopleOutline, search, searchOutline } from 'ionicons/icons';

import { useAuth } from './auth/AuthProvider';

import Home from './pages/Home';
import MyProfile from './pages/MyProfile';
import Profile from './pages/Profile';
import Search from './pages/Search';
import NewContent from './pages/NewContent';
import Friends from './pages/Friends';

const Main: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

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
            <Route path="/friends">
              <Friends />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home" onClick={() => handleTabChange('home')}>
              <IonIcon icon={activeTab === 'home' ? home : homeOutline} />
            </IonTabButton>
            <IonTabButton tab="explore" href="/explore" onClick={() => handleTabChange('explore')}>
              <IonIcon icon={activeTab === 'explore' ? search : searchOutline} />
            </IonTabButton>
            <IonTabButton tab="new" href="/new" onClick={() => handleTabChange('new')}>
              <IonIcon icon={activeTab === 'new' ? addCircle : addCircleOutline} />
            </IonTabButton>
            <IonTabButton tab="friends" href="/friends" onClick={() => handleTabChange('friends')}>
              <IonIcon icon={activeTab === 'friends' ? people : peopleOutline} />
            </IonTabButton>
            <IonTabButton tab="myprofile" href="/myprofile" onClick={() => handleTabChange('myprofile')}>
              {user && <img style={activeTab === 'myprofile' ? {border: "2px solid black"} : {}}  alt="tab avatar" src={user.avatar} />}
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default Main;
