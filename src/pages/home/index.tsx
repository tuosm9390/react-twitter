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

const posts: PostProps[] = [
  {
    id: '1',
    email: 'test@test.com',
    content: '내용입니다.',
    createdAt: '2024-03-02',
    uid: '123123'
  },
  {
    id: '2',
    email: 'test@test.com',
    content: '내용입니다.',
    createdAt: '2024-03-02',
    uid: '123123'
  },
  {
    id: '3',
    email: 'test@test.com',
    content: '내용입니다.',
    createdAt: '2024-03-02',
    uid: '123123'
  },
  {
    id: '4',
    email: 'test@test.com',
    content: '내용입니다.',
    createdAt: '2024-03-02',
    uid: '123123'
  },
]

export default function HomePage() {

  return (
    <div className="home">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__Tab--active">For You</div>
        <div className="home__tab">Following</div>
      </div>
      {/* Post Form */}
      <PostForm />
      {/* Tweet posts */}
      <div className='post'>
        {posts?.map((post) => (
          <PostBox post={post} />
        ))}
      </div>
    </div>
  )
}