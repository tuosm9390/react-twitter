import {
  collection,
  onSnapshot,
  orderBy,
  query,
  snapshotEqual,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from 'react';
import { PromiseOr } from "sass";
import { db } from "../../firebaseApp";
import AuthContext from "../components/context/AuthContext";
import PostBox from '../components/posts/PostBox';
import PostForm from '../components/posts/PostForm';

export interface PostProps {
  id: string;
  email: string;
  content: string;
  createdAt: string;
  uid: string;
  profileUrl?: string;
  likes?: string[];
  likeCount?: number;
  comments?: any;
}

export default function HomePage() {
  const [posts, setPosts] = useState<PostProps[]>([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, 'posts')
      let postsQuery = query(postsRef, orderBy("createdAt", 'desc'))

      onSnapshot(postsQuery, (snapshot) => {
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }))
        setPosts(dataObj as PostProps[])
      })
    }
  }, [user])

  return (
    <div className="home">
      <div className='home__top'>
        <div className="home__title">Home</div>
        <div className="home__tabs">
          <div className="home__tab home__Tab--active">For You</div>
          <div className="home__tab">Following</div>
        </div>
      </div>
      {/* Post Form */}
      <PostForm />
      {/* Tweet posts */}
      <div className='post'>
        {posts?.length > 0 ?
          posts?.map((post) => (
            <PostBox post={post} key={post.id} />
          )) : (
            <div className='post__no-posts'>
              <div className='post__text'>게시글이 없습니다.</div>
            </div>
          )}
      </div>
    </div>
  )
}