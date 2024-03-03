import { getAuth, signOut } from 'firebase/auth';
import { useContext } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { BsHouse } from 'react-icons/bs';
import { MdLogin, MdLogout } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { app } from '../../firebaseApp';
import AuthContext from './context/AuthContext';

export default function MenuList() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext)

  return (
    <div className="footer">
      <div className="footer__grid">
        <button type="button" onClick={() => navigate("/")}>
          <BsHouse />
          Home
        </button>
        <button type="button" onClick={() => navigate("/profile")}>
          <BiUserCircle />
          Profile
        </button>
        <button type="button" onClick={() => navigate("/search")}>
          <AiOutlineSearch />
          Search
        </button>
        {user === null ? (
          <button type="button" onClick={() => navigate("/")}>
            <MdLogin />
            Login
          </button>
        ) : (
          <button type="button"
            onClick={async () => {
              const auth = getAuth(app)
              await signOut(auth)
              toast.success('로그아웃 되었습니다.')
            }}
          >
            <MdLogout />
            Logout
          </button>
        )}
      </div>
    </div>
  )
}