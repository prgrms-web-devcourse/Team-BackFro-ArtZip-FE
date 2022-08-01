import Head from 'next/head';
import { useRouter } from 'next/router';
import ReviewCard from 'components/molecule/ReviewCard';

const ExhibitionDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const ret = {
    exhibitionId: 1,
    name: '번아웃증후군',
    thumbnail: 'https://www.culture.go.kr/upload/rdf/22/07/show_2022071816261910020.jpg',
    startDate: '2022-08-04',
    endDate: '2022-08-10',
    area: 'SEOUL',
    url: 'http://galleryraon.com/?page_id=2472#upcoming',
    placeUrl: 'http://galleryraon.com/?page_id=2472#upcoming',
    inquiry: '010-8425-8082',
    fee: '무료',
    genre: '',
    description: '',
    likeCount: 5,
    placeAddr: '서울특별시 종로구 자하문로41길 4 갤러리라온',
    lat: 37.597625,
    lng: 126.962292,
    isLiked: false,
    reviews: [
      {
        reviewId: 111,
        user: {
          userId: 11,
          profileImage: 'https~',
          nickname: 'Emily',
        },
        title: '번아웃증후군 전시회 다녀옴~',
        content:
          '오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~',
        createdAt: '2022-03-22T22:33:11',
        isLiked: false,
        likeCount: 32,
        commentCount: 2,
        photos: ['https~', 'https~'],
      },
      {
        reviewId: 111,
        user: {
          userId: 11,
          profileImage: 'https~',
          nickname: 'Emily',
        },
        title: '번아웃증후군 전시회 다녀옴~',
        content: '오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~',
        createdAt: '2022-03-22T22:33:11',
        isLiked: false,
        likeCount: 32,
        commentCount: 2,
        photos: ['https~', 'https~'],
      },
      {
        reviewId: 111,
        user: {
          userId: 11,
          profileImage: 'https~',
          nickname: 'Emily',
        },
        title: '번아웃증후군 전시회 다녀옴~',
        content: '오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~',
        createdAt: '2022-03-22T22:33:11',
        isLiked: false,
        likeCount: 32,
        commentCount: 2,
        photos: ['https~', 'https~'],
      },
      {
        reviewId: 111,
        user: {
          userId: 11,
          profileImage: 'https~',
          nickname: 'Emily',
        },
        title: '번아웃증후군 전시회 다녀옴~',
        content: '오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~',
        createdAt: '2022-03-22T22:33:11',
        isLiked: false,
        likeCount: 32,
        commentCount: 2,
        photos: ['https~', 'https~'],
      },
    ],
  };

  return (
    <>
      <Head>
        <title>ArtZip | ExhibitionDetail</title>
      </Head>
      <div>ExhibitionDetail : {id}</div>
      <>
        {ret.reviews.map((review) => (
          <ReviewCard
            key={review.reviewId}
            reviewId={review.reviewId}
            thumbnail={ret.thumbnail}
            title={review.title}
            content={review.content}
            createdAt={review.createdAt}
            likeCount={review.likeCount}
            commentCount={review.commentCount}
            photo={review.photos ? review.photos[0] : null}
            userId={review.user.userId}
            nickname={review.user.nickname}
            profileImage={review.user.profileImage}
          ></ReviewCard>
        ))}
      </>
    </>
  );
};

export default ExhibitionDetailPage;
