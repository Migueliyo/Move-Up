import { useEffect, useContext, useState, useRef } from "react";

import { IonAvatar, IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonModal, IonPopover, IonRouterLink, IonSelect, IonSelectOption, IonText, IonThumbnail } from "@ionic/react";
import { addCircleOutline, bookmark, bookmarkOutline, chatbubbleOutline, ellipsisVertical, eyeOffOutline, heart, heartOutline, newspaperOutline, paperPlaneOutline, starOutline, trashOutline, warningOutline } from "ionicons/icons";

import { useAuth } from "../auth/AuthProvider";
import { AppContext } from "../context/AppContext";
import { Post } from "../model/post";

import TimeDifference from "./TimeDifference";
import firebase from "../firebase/firebase";
import Comments from "./Comments";

import styles from "./Feed.module.scss";



const Feed = (props: any) => {

    const { posts, clickedSegment, setClickedSegment, clickedImage } = props;
    const { user } = useAuth();

    const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
    const { likedContext, savedContext } = useContext(AppContext);
    const [liked, setLiked] = likedContext;
    const [saved, setSaved] = savedContext;
    const [postId, setPostId] = useState('');
    const refScrollStart = useRef<HTMLDivElement>(null);
    const refScrollEnd = useRef<HTMLDivElement>(null);
    const modals = useRef<Array<HTMLIonModalElement | null>>([]);

    const checkLikes = async (posts: Post[]) => {
        const likesArrayPromises = posts.map((post: Post) =>
            firebase.checkLike(user!.id!, post.id!)
        );

        const likesArray = await Promise.all(likesArrayPromises);
        setLiked(likesArray);
    };

    const checkSavedPosts = async (posts: Post[]) => {
        const savedPostsArrayPromises = posts.map((post: Post) =>
            firebase.checkSavedPosts(user!.id!, post.id!)
        );

        const savedPostsArray = await Promise.all(savedPostsArrayPromises);
        setSaved(savedPostsArray);
    };

    useEffect(() => {
        setSortedPosts(posts.sort((a: any, b: any) => b.time - a.time));
        const dowloand = async () => {
            await checkLikes(posts);
            await checkSavedPosts(posts);
            refScrollStart.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            refScrollEnd.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        dowloand();
    }, [posts, clickedImage]);

    const likePost = async (event: any, postId: string, userId: string) => {
        if (event !== null)
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
            if (event !== null)
                event.target.classList.remove("animate__heartBeat");
            document.getElementById(`postLike_${postId}`)!.style.display = "none";
        }, 850);
    };

    const savePost = async (event: any, postId: string, userId: string) => {
        if (event !== null)
            event.target.classList.add("animate__heartBeat");
        
        const index = posts.findIndex((post: Post) => post.id === postId);
        if (index === -1) {
            // El post no se encontró en la lista de posts
            return;
        }
        
        if (!saved[index]) {
            const response = await firebase.addSavedPost(userId, postId);
            if (!response.error) {
                setSaved((prevSaved) => {
                    const newSaved = [...prevSaved];
                    newSaved[index] = true;
                    return newSaved;
                });
            }
        } else {
            const response = await firebase.removeSavedPost(userId, postId);
            if (!response.error) {
                setSaved((prevSaved) => {
                    const newSaved = [...prevSaved];
                    newSaved[index] = false;
                    return newSaved;
                });
            }
        }

        setTimeout(() => {
            if (event !== null)
                event.target.classList.remove("animate__heartBeat");
        }, 850);
    }

    const openModal = (index: number) => {
        const modalElement = modals.current[index];
        if (modalElement) {
          modalElement.present();
        }
    };

    return (
        (clickedSegment === 'comentarios') ? (
            <Comments postId={postId} />
        ) : (
            <div className={styles.postsContainer}>
                {sortedPosts.map((post: Post, index: number) => {
                    return (
                        <div id={`post-${index}`} key={index} className={styles.postContainer} >
                            <div className={styles.postProfile}>
                                <div className={styles.postProfileInfo}>

                                    <IonRouterLink routerLink={`/profile/${post.user_id}`} >
                                        <IonAvatar>
                                            <img alt="post avatar" src={post?.user_avatar} />
                                        </IonAvatar>
                                    </IonRouterLink>

                                    <IonRouterLink routerLink={`/profile/${post.user_id}`}>
                                        <p>{post && post.user_username}</p>
                                    </IonRouterLink>
                                </div>

                                <div className={styles.postProfileMore}>
                                    <IonIcon id={`menu-${index}`} icon={ellipsisVertical} onClick={() => openModal(index)} />
                                    <IonModal ref={(el) => (modals.current[index] = el)} initialBreakpoint={0.8} breakpoints={[0.8, 0]}>
                                        <IonContent>
                                        <div className={styles.postContainer} >
                                            <div className={styles.postProfile}>
                                                <div className={styles.postProfileInfo}>
                                                    <IonAvatar>
                                                        <img alt="post avatar" src={post?.user_avatar} />
                                                    </IonAvatar>
                                                    <p>{post && post.user_username}</p>
                                                </div>
                                            </div>
                                            <div className={styles.postImage} >
                                                <img src={post.image} alt={post.caption} ></img>
                                            </div>
                                        </div>
                                        <IonList>
                                            <IonItem className={styles.postProfileInfo} onClick={() => likePost(null, post.id!, user!.id!)}>
                                                <IonIcon style={{marginRight: 10}} icon={heartOutline}></IonIcon>
                                                {liked[index] ? "No me gusta" : "Me gusta"}
                                            </IonItem>
                                            <IonItem onClick={() => savePost(null, post.id!, user!.id!)} >
                                                <IonIcon style={{marginRight: 10}} icon={bookmarkOutline}></IonIcon>
                                                {saved[index] ? "Eliminar de guardados" : "Guardar"}
                                            </IonItem>
                                            <IonItem>
                                                <IonIcon style={{marginRight: 10}} icon={newspaperOutline}></IonIcon>
                                                Información sobre la cuenta
                                            </IonItem>
                                            <IonItem>
                                                <IonIcon  style={{marginRight: 10, color: 'red'}} icon={warningOutline}></IonIcon>
                                                <span style={{color: 'red'}}>Denunciar</span>
                                            </IonItem>
                                        </IonList>
                                        </IonContent>
                                    </IonModal>
                                </div>
                            </div>

                            <div className={styles.postImage} >
                                <img src={post.image} alt={post.caption} ></img>
                                <IonIcon id={`postLike_${post.id}`} className={`animated__animated animate__heartBeat ${styles.postImageLike}`} icon={heart} color="light" />
                            </div>

                            <div className={styles.postActionsContainer} ref={`post-${index + 1}` === clickedImage && `post-${index + 1}` === `post-${user!.posts.length - 1}` ? refScrollEnd : null}>
                                <div className={styles.postActions}>
                                    <IonIcon className="animate__animated" color={liked[index] ? "danger" : "dark"} icon={liked[index] ? heart : heartOutline} onClick={e => likePost(e, post.id!, user!.id!)} />
                                    <IonIcon onClick={() => { setClickedSegment('comentarios'); setPostId(post.id!) }} icon={chatbubbleOutline} />
                                    <IonIcon icon={paperPlaneOutline} />
                                </div>

                                <div className={styles.postBookmark}>
                                    <IonIcon id={`postSave_${post.id}`} icon={saved[index] ? bookmark : bookmarkOutline} onClick={e => savePost(e, post.id!, user!.id!)} />
                                </div>
                            </div>

                            <div className={styles.postLikesContainer}>
                                <p>Le gusta a <span className={styles.postLikedName}>migueliyo1607</span> y <span className={styles.postLikedName}>{post.likes.length > 0 ? post.likes.length - 1 : post.likes.length} personas más</span></p>
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

                            <div className={styles.postAddComment} >
                                <div className={styles.postAddCommentProfile} ref={`post-${index + 1}` === clickedImage ? refScrollStart : null}>
                                    <IonAvatar>
                                        <img alt="add comment avatar" src={user?.avatar} />
                                    </IonAvatar>
                                    <p className="ion-margin-left" onClick={() => { setClickedSegment('comentarios'); setPostId(post.id!) }}>Añadir un comentario...</p>
                                </div>

                                <div className={styles.postAddCommentActions}>
                                    <IonIcon icon={heart} color="danger" />
                                    <IonIcon icon={addCircleOutline} color="medium" onClick={() => { setClickedSegment('comentarios'); setPostId(post.id!) }} />
                                </div>
                            </div>

                            <div className={styles.postTime}>
                                <TimeDifference timestamp={post.time} />
                            </div>
                        </div>
                    );
                })}
            </div>
        )
    );

}

export default Feed;