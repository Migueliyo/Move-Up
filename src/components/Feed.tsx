import { Key } from "react";

import { IonAvatar, IonIcon, IonRouterLink } from "@ionic/react";
import { addCircleOutline, bookmarkOutline, chatbubbleOutline, ellipsisVertical, heart, heartOutline, paperPlaneOutline } from "ionicons/icons";

import { likePost } from "../pages/PostStore";
import styles from "./Feed.module.scss";
import { useAuth } from "../auth/AuthProvider";
import TimeDifference from "./TimeDifference";
import { Comment } from "../model/coment";

const Feed = (props: { posts: any; }) => {

    const { posts } = props;
    const { user } = useAuth();

    const addLike = (event: any, postID: any, liked: any) => {
        
        likePost(event, postID, liked);
    }

    // Ordena los posts según el tiempo de subida
    const sortedPosts = posts.sort((a: any, b: any) => b.time - a.time);

    return (

        <div className={ styles.postsContainer }>
            { sortedPosts.map( (post: { image: string; id: string; liked: boolean; caption: string; comments: Comment | any; time: any; userId: string}, index: Key) => {         

                return (

                    <div key={ index } className={ styles.postContainer }>
                        <div className={ styles.postProfile }>
                            <div className={ styles.postProfileInfo }>
                                
                                <IonRouterLink routerLink={ `/profile/${post.userId}`}>
                                    <IonAvatar>
                                        <img alt="post avatar" src={ user?.avatar } />
                                    </IonAvatar>
                                </IonRouterLink>

                                <IonRouterLink routerLink={ `/profile/${ post.userId }`}>
                                    <p>{ user && user.username }</p>
                                </IonRouterLink>
                            </div>

                            <div className={ styles.postProfileMore }>
                                <IonIcon icon={ ellipsisVertical } />
                            </div>
                        </div>

                        <div className={ styles.postImage } style={{ backgroundImage: `url(${ post.image })`, backgroundPosition: "center, center", backgroundSize: "contain"}}>
                            <IonIcon id={ `postLike_${ post.id }`} className={ `animated__animated animate__heartBeat ${ styles.postImageLike }` } icon={ heart } color="light" />
                        </div>

                        <div className={ styles.postActionsContainer }>
                            <div className={ styles.postActions }>
                                <IonIcon className="animate__animated" color={ post.liked ? "danger" : "dark" } icon={ post.liked ? heart : heartOutline } onClick={ e => addLike(e, post.id, post.liked) } />
                                <IonIcon icon={ chatbubbleOutline } />
                                <IonIcon icon={ paperPlaneOutline } />
                            </div>

                            <div className={ styles.postBookmark }>
                                <IonIcon icon={ bookmarkOutline } />
                            </div>
                        </div>

                        <div className={ styles.postLikesContainer }>
                            <p>Le gusta a <span className={ styles.postLikedName }>alanmontgomery</span> y <span className={ styles.postLikedName }>2 personas más</span></p>
                        </div>

                        <div className={ styles.postCaption }>
                            <p><span className={ styles.postName }>
                                <IonRouterLink routerLink={ `/profile/${ user && user.id }`}>
                                    { user && user.username }
                                </IonRouterLink>
                                </span> { post.caption }</p>
                        </div>

                        <div className={ styles.postComments }>
                            <p>Ver los { post.comments.length } comentarios</p>
                        </div>

                        <div className={ styles.postAddComment }>
                            <div className={ styles.postAddCommentProfile }>
                                <IonAvatar>
                                    <img alt="add comment avatar" src={ user?.avatar } />
                                </IonAvatar>
                                <p className="ion-margin-left">Add a comment...</p>
                            </div>

                            <div className={ styles.postAddCommentActions }>
                                <IonIcon icon={ heart } color="danger" />
                                <IonIcon icon={ addCircleOutline } color="medium" />
                            </div>
                        </div>

                        <div className={ styles.postTime }>
                            <TimeDifference timestamp={post.time} />
                        </div>
                    </div>
                );
            })}
        </div>  
    );
}

export default Feed;