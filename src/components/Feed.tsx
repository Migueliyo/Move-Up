import { useEffect, useContext, useState, useRef } from "react";

import { IonAvatar, IonContent, IonIcon, IonRouterLink } from "@ionic/react";
import { addCircleOutline, bookmarkOutline, chatbubbleOutline, ellipsisVertical, heart, heartOutline, paperPlaneOutline } from "ionicons/icons";

import { useAuth } from "../auth/AuthProvider";
import { Post } from "../model/post";
import { LikedContext, LikedContextType } from "../context/LikedContext";

import TimeDifference from "./TimeDifference";
import firebase from "../firebase/firebase";
import Comments from "./Comments";

import styles from "./Feed.module.scss";


const Feed = (props: any) => {

    const { posts, clickedSegment, setClickedSegment, clickedImage } = props;
    const { user } = useAuth();

    const [liked, setLiked] = useContext<LikedContextType>(LikedContext);
    const [postId, setPostId] = useState('');
    const postsContainerRef = useRef<HTMLDivElement>(null);

    const checkLikes = async (posts: Post[]) => {
        const likesArrayPromises = posts.map((post: Post) =>
            firebase.checkLike(user!.id!, post.id!)
        );

        const likesArray = await Promise.all(likesArrayPromises);
        setLiked(likesArray);
    };

    useEffect(() => {
        checkLikes(posts);
    }, []);

    useEffect(() => {
        if (clickedImage !== undefined && postsContainerRef.current) {
            const postElement = postsContainerRef.current.querySelector(
                `#${clickedImage}`
            );
            if (postElement) {
                postElement.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
    }, [clickedImage]);

    const scrollToAnchor = (anchorId: string) => {
        const element = document.getElementById(anchorId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    const likePost = async (event: any, postId: string, userId: string) => {
        event.target.classList.add("animate__heartBeat");

        const index = posts.findIndex((post: Post) => post.id === postId);
        if (index === -1) {
            // El post no se encontró en la lista de posts
            return;
        }

        if (!liked[index]) {
            document.getElementById(`postLike_${postId}`)!.style.display = "inline";
            const response = await firebase.addLike(userId, postId);
            if (!response.error) {
                setLiked((prevLiked) => {
                    const newLiked = [...prevLiked];
                    newLiked[index] = true;
                    return newLiked;
                });
            }
        } else {
            const response = await firebase.deleteLike(userId, postId);
            if (!response.error) {
                setLiked((prevLiked) => {
                    const newLiked = [...prevLiked];
                    newLiked[index] = false;
                    return newLiked;
                });
            }
        }

        setTimeout(() => {
            event.target.classList.remove("animate__heartBeat");
            document.getElementById(`postLike_${postId}`)!.style.display = "none";
        }, 850);
    };

    // Ordena los posts según el tiempo de subida
    const sortedPosts = posts.sort((a: any, b: any) => b.time - a.time);

    return (
        (clickedSegment === 'comentarios') ? (
            <Comments postId={postId} />
        ) : (
            <div className={styles.postsContainer}>
                {sortedPosts.map((post: Post, index: number) => {
                    return (
                        <div id={`post-${index}`} key={index} className={styles.postContainer} ref={postsContainerRef}>
                            <div className={styles.postProfile}>
                                <div className={styles.postProfileInfo}>

                                    <IonRouterLink routerLink={`/profile/${post.user_id}`}>
                                        <IonAvatar>
                                            <img alt="post avatar" src={post?.user_avatar} />
                                        </IonAvatar>
                                    </IonRouterLink>

                                    <IonRouterLink routerLink={`/profile/${post.user_id}`}>
                                        <p>{post && post.user_username}</p>
                                    </IonRouterLink>
                                </div>

                                <div className={styles.postProfileMore}>
                                    <IonIcon icon={ellipsisVertical} />
                                </div>
                            </div>

                            <div className={styles.postImage}>
                                <img src={post.image} alt={post.caption}></img>
                                <IonIcon id={`postLike_${post.id}`} className={`animated__animated animate__heartBeat ${styles.postImageLike}`} icon={heart} color="light" />
                            </div>

                            <div className={styles.postActionsContainer}>
                                <div className={styles.postActions}>
                                    <IonIcon className="animate__animated" color={liked[index] ? "danger" : "dark"} icon={liked[index] ? heart : heartOutline} onClick={e => likePost(e, post.id!, user!.id!)} />
                                    <IonIcon onClick={() => { setClickedSegment('comentarios'); setPostId(post.id!) }} icon={chatbubbleOutline} />
                                    <IonIcon icon={paperPlaneOutline} />
                                </div>

                                <div className={styles.postBookmark}>
                                    <IonIcon icon={bookmarkOutline} />
                                </div>
                            </div>

                            <div className={styles.postLikesContainer}>
                                <p>Le gusta a <span className={styles.postLikedName}>migueliyo1607</span> y <span className={styles.postLikedName}>2 personas más</span></p>
                            </div>

                            <div className={styles.postCaption}>
                                <p><span className={styles.postName}>
                                    <IonRouterLink routerLink={`/profile/${post && post.user_id}`}>
                                        {post && post.user_username}
                                    </IonRouterLink>
                                </span> {post.caption}</p>
                            </div>

                            <div className={styles.postComments} onClick={() => { setClickedSegment('comentarios'); setPostId(post.id!) }}>
                                <p>Ver los {post.comments.length} comentarios</p>
                            </div>

                            <div className={styles.postAddComment}>
                                <div className={styles.postAddCommentProfile}>
                                    <IonAvatar>
                                        <img alt="add comment avatar" src={user?.avatar} />
                                    </IonAvatar>
                                    <p className="ion-margin-left" onClick={() => { setClickedSegment('comentarios'); setPostId(post.id!) }}>Añadir un comentario...</p>
                                </div>

                                <div className={styles.postAddCommentActions}>
                                    <IonIcon icon={heart} color="danger" />
                                    <IonIcon icon={addCircleOutline} color="medium" />
                                </div>
                            </div>

                            <div className={styles.postTime}>
                                <TimeDifference timestamp={post.time} />
                            </div>
                            <a href={`#${postAnchorId}`} className={styles.postLink}>
                                Ver post
                            </a>
                        </div>
                    );
                })}
            </div>

        )
    );

}

export default Feed;