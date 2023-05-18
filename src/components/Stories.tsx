import { IonCol, IonRouterLink, IonRow } from "@ionic/react";
import styles from "./Stories.module.scss";

const Stories = (props: { users: any; }) => {

    const { users: profiles } = props;

    return (

        <IonRow className={ styles.stories }>

            <div className={ styles.storiesContainer }>
                { profiles.map((story:any, index:any) => {

                    return (
                        <IonCol key={ index } className={ index === 0 ? styles.yourStory : styles.story }>
                            <img alt="story avatar" src={ story.avatar } />
                            { index === 0 && <div className={ styles.storyAdd }>+</div> }

                            <IonRouterLink routerLink={ `/profile/${ story.id }` }>
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