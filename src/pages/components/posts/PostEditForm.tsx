import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../firebaseApp";
import { PostProps } from "../../home";
import AuthContext from "../context/AuthContext";

export default function PostEditForm() {
  const params = useParams()
  const [post, setPost] = useState<PostProps | null>(null)
  const [content, setContent] = useState<string>('')
  const navigate = useNavigate()
  const handleFileUpload = () => {

  }

  const getPost = useCallback(async () => {
    if (params.id) {
      const docRef = doc(db, 'posts', params.id)
      const docSnap = await getDoc(docRef)
      setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id })
      setContent(docSnap?.data()?.content)
    }
  }, [params.id])

  const onSubmit = async (e: any) => {
    e.preventDefault()

    try {
      if (post) {
        const postRef = doc(db, 'posts', post?.id)
        await updateDoc(postRef, {
          content: content,
        })
        navigate(`/post/${post?.id}`)
        toast.success("게시글을 수정했습니다.")
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { target: { name, value } } = e

    if (name === 'content') {
      setContent(value)
    }
  }

  useEffect(() => {
    if (params.id) getPost();
  }, [getPost, params.id]);

  return (
    <form className="post-form" onSubmit={onSubmit}>
      <textarea
        className="post-form__textarea"
        required
        name='content'
        id='content'
        placeholder="what is happening?"
        onChange={onChange}
        value={content}
      />
      <div className="post-form__submit-area">
        <label htmlFor='file-input' className='post-form__file'>
          <FiImage />
        </label>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileUpload}
          className='hidden'
        />
        <input type='submit' value='수정' className='post-form__submit-btn' />
      </div>
    </form>
  )
}