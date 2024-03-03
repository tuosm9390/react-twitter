import { doc, getDoc } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate, useParams } from "react-router-dom"
import { db } from "../../firebaseApp"
import Loader from "../components/loader/Loader"
import PostBox from "../components/posts/PostBox"
import { PostProps } from "../home"

export default function PostDetail() {
  const params = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState<PostProps | null>(null)

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, 'posts', params.id)
      const docSnap = await getDoc(docRef)
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id })
    }
  }, [params.id])

  useEffect(() => {
    if (params.id) getPost()
  }, [params.id, getPost])

  return (
    <div className="post">
      <div className="post__header">
        <button type='button' onClick={() => navigate(-1)}>
          <IoIosArrowBack className="post__header-btn" />
        </button>
      </div>
      {post ? <PostBox post={post} /> : <Loader />}
    </div>
  )
}