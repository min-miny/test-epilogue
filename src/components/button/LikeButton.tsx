import axios, { AxiosError } from 'axios';
import { ThumbsUp } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../utility/AuthContext';
import { redirectToLogin } from '../../utility/AuthUtils';

interface LikeButtonProps {
  reviewId: number;
  likeCount: number;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // onClick을 optional로 추가
}

const LikeButton: React.FC<LikeButtonProps> = ({
  reviewId,
  likeCount,
  onClick,
}) => {
  const [isInLikes, setIsInLikes] = useState(false);
  const [currentLikeCount, setLikeCount] = useState(likeCount);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { loggedIn } = authContext;

  const addToLikes = async () => {
    if (!loggedIn) {
      redirectToLogin(navigate);
      return;
    }

    try {
      const token = localStorage.getItem('accesstoken');
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL_DEV}/api/reviews/${reviewId}/likes`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log('좋아요 추가 응답:', response);

      if (response.status === 200) {
        alert('좋아요에 추가 되었습니다.');
        setIsInLikes(true);
        setLikeCount((prev) => prev + 1);
      } else {
        throw new Error('좋아요 추가 실패');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Response error:', error.response);
      } else {
        console.error('Error:', error);
      }
      alert('좋아요 추가 중 오류가 발생했습니다.');
    }
  };

  const removeFromLikes = async () => {
    if (!loggedIn) {
      redirectToLogin(navigate);
      return;
    }

    try {
      const token = localStorage.getItem('accesstoken');
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL_DEV}/api/reviews/${reviewId}/likes`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log('좋아요 삭제 응답:', response);

      if (response.status === 200) {
        alert('좋아요에서 삭제되었습니다.');
        setIsInLikes(false);
        setLikeCount((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        throw new Error('좋아요 삭제 실패');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('서버 응답 오류:', error.response);
      } else {
        console.error('삭제 요청 오류:', error);
      }
      alert('좋아요 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="icon-container">
      <button
        onClick={(e) => {
          // 기존의 onClick 동작을 처리
          if (isInLikes) {
            removeFromLikes();
          } else {
            addToLikes();
          }
          // 추가적인 동작 처리
          if (onClick) {
            onClick(e); // 외부에서 전달된 onClick 처리
          }
        }}
        className={`flex items-center gap-1 text-sm ${
          isInLikes ? 'text-red-500' : 'text-gray-600'
        } hover:text-gray-800`}
      >
        <ThumbsUp className="w-5 h-5" />
        <span className="text-base">{currentLikeCount}</span>
      </button>
    </div>
  );
};

export default LikeButton;
