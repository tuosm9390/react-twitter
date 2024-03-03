import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { toast } from "react-toastify";
import { db } from "../../../firebaseApp";
import AuthContext from "../context/AuthContext";

export default function PostForm() {
  const [content, setContent] = useState<string>('')
  const [hashTag, setHashTag] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
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
        email: user?.email,
        hashTags: tags
      })
      setTags([])
      setHashTag("")
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

  const removeTag = (tag: string) => {
    setTags(tags?.filter((val) => val !== tag))
  }

  const onChangeHashTag = (e: any) => {
    setHashTag(e?.target?.value?.trim())
  }

  const handleKeyup = (e: any) => {
    if (e.keyCode === 32 && e.target.value.trim() !== '') {
      // 만약 같은 태그가 있으면 에러
      // 없으면 태그 생성
      if (tags?.includes(e.target.value?.trim())) {
        toast.error('같은 태그가 있습니다.')
      } else {
        setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]))
        setHashTag("")
      }
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
      <div className="post-form__hashtags">
        <span className="post-form__hashtags-outputs">
          {tags?.map((tag, index) => (
            <span className="post-form__hashtags-tag" key={index} onClick={() => removeTag(tag)}>
              #{tag}
            </span>
          ))}
        </span>
        <input
          className="post-form__input"
          name='hashtag'
          id="hashtag"
          placeholder="해시태그 + 스페이스바 입력"
          onChange={onChangeHashTag}
          onKeyUp={handleKeyup}
          value={hashTag}
        />
      </div>
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