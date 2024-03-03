import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
import { db } from "../../../firebaseApp";
import AuthContext from "../context/AuthContext";

export default function PostForm() {
  const [content, setContent] = useState<string>('')
  const { user } = useContext(AuthContext)
  const handleFileUpload = () => {

  }

  const onSubmit = async (e: any) => {
    e.preventDefault()

    try {
      await addDoc(collection(db, 'posts'), {
        content: content,
        createdAt: new Date()?.toLocaleDateString('ko', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        uid: user?.uid,
        email: user?.email
      })
      setContent("")
      toast.success("게시글을 생성했습니다.")
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
        <input type='submit' value='Tweet' className='post-form__submit-btn' />
      </div>
    </form>
  )
}