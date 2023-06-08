import { IonCol, IonRouterLink, IonRow } from "@ionic/react";
import styles from "./Stories.module.scss";
import { useAuth } from "../auth/AuthProvider";

const Stories = (props: any) => {

    const { users, clickedSegment } = props;
    const { user } = useAuth();

    return (
        (clickedSegment !== 'comentarios') ? (
        <IonRow className={ styles.stories }>

            <div className={ styles.storiesContainer }>
                { users.map((story:any, index:number) => {

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
        </IonRow>) : (<></>)
    );
}

export default Stories;