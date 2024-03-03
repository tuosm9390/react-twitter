import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../home';
import NotificationsPage from '../notification';
import PostListPage from '../posts';
import PostDetail from '../posts/detail';
import PostNew from '../posts/new';
import ProfilePage from '../profile';
import ProfileEdit from '../profile/edit';
import SearchPage from '../search';
import LoginPage from '../users/login';
import SignupPage from '../users/signup';
import PostEdit from '../posts/edit';

interface RouterProps {
  isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
  return (
    <Routes>
      {isAuthenticated ? (
        <>
          <Route path='/' element={<HomePage />} />
          <Route path='/posts' element={<PostListPage />} />
          <Route path='/posts/:id' element={<PostDetail />} />
          <Route path='/posts/new' element={<PostNew />} />
          <Route path='/posts/edit/:id' element={<PostEdit />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/profile/edit' element={<ProfileEdit />} />
          <Route path='/notifications' element={<NotificationsPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='*' element={<Navigate replace to="/" />} />
        </>
      ) : (
        <>
          <Route path='/users/login' element={<LoginPage />} />
          <Route path='/users/signup' element={<SignupPage />} />
          <Route path="*" element={<Navigate replace to="/users/login" />} />
        </>
      )}
    </Routes>
  )
}