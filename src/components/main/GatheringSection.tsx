import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface Gathering {
  type: string;
  title: string;
  image: string;
}

const GatheringSection: React.FC = () => {
  const [gathering, setGathering] = useState<Gathering[]>([]);
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/gathering')
      .then((response) => response.json())
      .then((data) => setGathering(data))
      .catch((error) => console.error('Error loading gathering:', error));
  }, []);

  const slidesToShow = Math.min(gathering.length, 3);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow > 0 ? slidesToShow : 1,
    slidesToScroll: 1,
    arrows: true,
    afterChange: (index: number) => {
      setIsPrevDisabled(index === 0);
      setIsNextDisabled(index >= gathering.length - slidesToShow);
    },
  };

  const CustomPrevArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className={`absolute left-[-40px] top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 ease-in-out ${
          isPrevDisabled
            ? 'bg-black/5 opacity-20'
            : 'bg-black/40 hover:bg-black/70 text-white'
        }`}
        onClick={isPrevDisabled ? undefined : onClick}
        disabled={isPrevDisabled}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6" />
      </button>
    );
  };

  const CustomNextArrow = (props: any) => {
    const { onClick } = props;
    return (
      <button
        className={`absolute right-[-40px] top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300 ease-in-out ${
          isNextDisabled
            ? 'bg-black/5 opacity-20'
            : 'bg-black/40 hover:bg-black/70 text-white'
        }`}
        onClick={isNextDisabled ? undefined : onClick}
        disabled={isNextDisabled}
      >
        <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6" />
      </button>
    );
  };

  return (
    <div className="section-wrap flex gap-16 mb-[200px]">
      <div className="w-1/4">
        <h2 className="text-4xl font-bold mb-9">모임 리스트</h2>
        <p className="text-lg font-medium"># 오프라인</p>
      </div>

      <div className="w-3/4 h-full relative pt-[90px]">
        {gathering.length > 0 ? (
          <Slider
            {...settings}
            prevArrow={<CustomPrevArrow />}
            nextArrow={<CustomNextArrow />}
          >
            {gathering.map((gathering, index) => (
              <div key={index} className="w-full">
                <div
                  className="relative w-full group overflow-hidden rounded-lg"
                  style={{ aspectRatio: '2/3' }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg z-10"></div>
                  <img
                    className="absolute inset-0 w-full h-full object-cover rounded-lg z-5 transition-transform duration-300 ease-in-out group-hover:scale-105"
                    src={gathering.image}
                    alt={gathering.title}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 z-20">
                    <h3 className="text-lg font-bold line-clamp-1 text-center">
                      {gathering.title}
                    </h3>
                    <p className="text-base mt-4 text-center line-clamp-2">
                      저희 모임은 책을 사랑하는 사람들이 모여 함께 읽고,
                      토론하며, 서로의 생각을 나누는 공간입니다.
                    </p>
                    <p className="mt-12 text-sm">현재 모임 인원 : (10/30)</p>
                    <button className="transition-all duration-300 ease-in-out mt-6 bg-white text-black px-6 py-2 rounded-lg font-bold shadow-md hover:bg-black hover:text-white">
                      참여하기
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-gray-500">모임 정보를 불러오는 중...</p>
        )}
      </div>
    </div>
  );
};

export default GatheringSection;
