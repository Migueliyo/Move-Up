import { IonCol, IonRouterLink, IonRow } from "@ionic/react";
import styles from "./Stories.module.scss";
import { useAuth } from "../auth/AuthProvider";

const Stories = (props: { users: any; }) => {

    const { users: profiles } = props;
    const { user } = useAuth();

    return (

        <IonRow className={ styles.stories }>

            <div className={ styles.storiesContainer }>
                { profiles.map((story:any, index:number) => {

                    return (
                        <IonCol key={ index } className={ index === 0 ? styles.yourStory : styles.story }>
                            <img alt="story avatar" src={ index === 0 ? user?.avatar : story.avatar } />
                            { index === 0 && <div className={ styles.storyAdd }>+</div> }

                            <IonRouterLink routerLink={ index === 0 ? '/myprofile' : `/profile/${ story.id }` }>
                                <p>{ index === 0 ? "Your story" : story.username }</p>
                            </IonRouterLink>
                        </IonCol>
                    );
                })}
            </div>
        </IonRow>
    );
}

export default Stories;