import { FaLink, FaTimes } from 'react-icons/fa';
import { RiKakaoTalkFill } from 'react-icons/ri';

interface ShareOption {
  shareUrl: string;
  kakaoShareUrl: string;
}

interface ShareModalProps {
  shareOptions: ShareOption;
  setShareModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareModal: React.FC<ShareModalProps> = ({
  shareOptions,
  setShareModalOpen,
}) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareOptions.shareUrl);
    alert('링크가 복사되었습니다!');
  };

  const handleKakaoShare = () => {
    window.location.href = shareOptions.kakaoShareUrl;
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-100">
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg scale-100">
        <h3 className="text-2xl text-center font-bold text-gray-800 mb-8">
          공유하기
        </h3>
        <div className="flex justify-evenly gap-4 mb-1">
          <div className="flex flex-col items-center">
            <button
              className="bg-gray-100 hover:bg-gray-300 text-black p-6 rounded-full shadow-md transition-all duration-200"
              onClick={handleCopyLink}
            >
              <FaLink className="text-3xl" />
            </button>
            <span className="mt-3 text-sm font-semibold text-gray-700">
              링크복사
            </span>
          </div>
          <div className="flex flex-col items-center">
            <button
              className="bg-[#FEE500] hover:bg-[#F9D000] text-black p-6 rounded-full shadow-md transition-all duration-200"
              onClick={handleKakaoShare}
            >
              <RiKakaoTalkFill className="text-3xl transform scale-125" />
            </button>
            <span className="mt-3 text-sm font-semibold text-gray-700">
              카카오톡
            </span>
          </div>
        </div>
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl"
          onClick={() => setShareModalOpen(false)}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
