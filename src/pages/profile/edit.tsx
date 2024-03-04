import { updateProfile } from "firebase/auth";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { storage } from "firebaseApp";
import AuthContext from "pages/components/context/AuthContext";
import PostHeader from "pages/components/posts/PostHeader";
import { useContext, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const STORAGE_DOWNLOAD_URL_STR = "https://firebasestorage.googleapis.com";

export default function ProfileEdit() {
  const [displayName, setDisplayName] = useState<string>("");
  const [imageFile, setImageFile] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setDisplayName(value);
  };

  const handleFileUpload = (e: any) => {
    const {
      target: { files },
    } = e;

    const file = files?.[0];
    const fileReader = new FileReader();
    fileReader?.readAsDataURL(file);

    fileReader.onloadend = (e: any) => {
      const { result } = e?.currentTarget;
      setImageFile(result);
    };
  };

  const handleDeleteImage = () => {
    setImageFile(null);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const key = `${user?.uid}/${uuidv4()}`;
    const storageRef = ref(storage, key);

    try {
      // 기존 이미지 삭제
      if (
        user?.photoURL &&
        user?.photoURL?.includes(STORAGE_DOWNLOAD_URL_STR)
      ) {
        const imageRef = ref(storage, user?.photoURL);
        if (imageRef) {
          await deleteObject(imageRef).catch((error) => {
            console.log(error);
          });
        }
      }
      // 이미지 업로드
      let imageUrl = "";
      if (imageFile) {
        const data = await uploadString(storageRef, imageFile, "data_url");
        imageUrl = await getDownloadURL(data?.ref);
      }

      // updateProfile 호출
      if (user) {
        await updateProfile(user, {
          displayName: displayName || "",
          photoURL: imageUrl,
        }).then(() => {
          toast.success("프로필이 업데이트 되었습니다.");
          navigate("/profile");
        });
      }
    } catch (error: any) {}
  };

  useEffect(() => {
    if (user?.photoURL) {
      setImageFile(user?.photoURL);
    }
    if (user?.displayName) {
      setDisplayName(user?.displayName);
    }
  }, [user?.photoURL, user?.displayName]);

  return (
    <div className="post">
      <PostHeader />
      <form
        className="post-form"
        onSubmit={onSubmit}
      >
        <div className="post-form__profile">
          <input
            type="text"
            name="displayName"
            id="displayName"
            className="post-form__input"
            placeholder="이름"
            onChange={onChange}
            value={displayName}
          />
          <div className="post-form__submit-area">
            <div className="post-form__image-area">
              <label
                htmlFor="file-input"
                className="post-form__file"
              >
                <FiImage className="post-form__file-icon" />
              </label>
              <input
                type="file"
                name="file-input"
                id="file-input"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              {imageFile && (
                <div className="post-form__attachment">
                  <img
                    src={imageFile}
                    alt="attachment"
                    width={100}
                    height={100}
                  />
                  <button
                    className="post-form__clear-btn"
                    type="button"
                    onClick={handleDeleteImage}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
            <input
              type="submit"
              value="프로필 수정"
              className="post-form__submit-btn"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
