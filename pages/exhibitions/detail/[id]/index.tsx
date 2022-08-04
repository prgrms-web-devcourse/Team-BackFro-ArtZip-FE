import Head from 'next/head';
import { HeartOutlined, HeartFilled, ShareAltOutlined } from '@ant-design/icons';
import ReviewCard from 'components/molecule/ReviewCard';
import { exhibitionCustomStyle as S } from '../../../../styles/pages';
import Link from 'next/link';

const ExhibitionDetailPage = () => {
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
    genre: '단체전시',
    description:
      '번아웃(Burn-out)을 겪어보신 적이 있나요? 매일 같은 일상을 반복하며 의욕적으로 일에 몰두하다가 신체적, 정신적 스트레스가 계속 쌓여 어느날 갑자기 무기력증, 심한 불안감과 자기혐오, 분노, 의욕 상실 등에 빠질 때가 있습니다. 이런 상황을 우리는 ‘번아웃(Burn-out)증후군 이라고 합니다. 그야말로 ’다 불타서 없어진다’는 뜻으로 소진 증후군이라고도 합니다. 빠르게 변화하는 현대사회에 적응하기 위해 치열한 경쟁 속에서 생겨나는 불안과 스트레스가 사람들의 마음을 병들게 하고 있습니다. 또한 정신건강을 위해 노력을 하기 보다는 약한 모습을 보일 경우에 나약하다는 부정적인 인식을 전달할 것이 두려워 마음편히 누구에게 털어놓지 못합니다. 이렇게 번아웃(Burn-out)이 온 상황을 우리는 달갑지 않게 생각합니다. 하지만 다르게 생각해보면 번아웃(Burn-out)은 바쁜 일상을 살아가느라 제대로 돌보지 못하는 자신에게 조금은 쉬어가라는 일종의 신호가 아닐까요? 심적으로 가지고 있는 무거운 짐들을 한켠에 내려놓고 오롯이 자신의 내면을 드려다 보며 나는 지금 어떤 감정을 느끼고 왜 이런 감정을 느끼는지를 우리 자신과 마주해 봅니다. 그리고 우리가 마주한 무기력, 외로움, 불안, 자기혐오, 분노 등 이런 다양한 감정들을 예술로 표현하고 치유를 하는 시간을 가져봅니다. 서로 공감하고 이해함으로써 좀 더 관객들과 소통을 할 수 있는 전시가 되었으면 좋겠다는 마음으로 이번 프로젝트를 기획하게 되었습니다. 우리의 작품이 누군가에게 따뜻한 위로와 힐링이 되길 바랍니다. 감사합니다.',
    likeCount: 5,
    placeAddr: '서울특별시 종로구 자하문로41길 4 갤러리라온',
    lat: 37.597625,
    lng: 126.962292,
    isLiked: true,
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
        reviewId: 112,
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
        reviewId: 113,
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
        reviewId: 114,
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
      <S.ExhibitionPageContainer>
        <S.ExhibitionContainer>
          <S.Thumbnail src={ret.thumbnail} preview={false}></S.Thumbnail>
          <S.InfoContainer>
            <S.Title>{ret.name}</S.Title>
            <S.Line></S.Line>
            <S.InfoTextContainer>
              <S.InfoTextBold>전시기간</S.InfoTextBold>
              <S.InfoText>
                {' '}
                | {ret.startDate} ~{ret.endDate}
              </S.InfoText>
            </S.InfoTextContainer>
            <S.InfoTextContainer>
              <S.InfoTextBold>홈페이지</S.InfoTextBold>
              <a href={ret.url}>
                <S.InfoText> | {ret.url}</S.InfoText>
              </a>
            </S.InfoTextContainer>
            <S.InfoTextContainer>
              <S.InfoTextBold>지역</S.InfoTextBold>
              <S.InfoText> | {ret.area}</S.InfoText>
            </S.InfoTextContainer>
            <S.InfoTextContainer>
              <S.InfoTextBold>장소</S.InfoTextBold>
              <a href={ret.placeUrl}>
                <S.InfoText> | {ret.placeAddr}</S.InfoText>
              </a>
            </S.InfoTextContainer>
            <S.InfoTextContainer>
              <S.InfoTextBold>입장료</S.InfoTextBold>
              <S.InfoText> | {ret.fee}</S.InfoText>
            </S.InfoTextContainer>
            <S.InfoTextContainer>
              <S.InfoTextBold>문의처</S.InfoTextBold>
              <S.InfoText> | {ret.inquiry}</S.InfoText>
            </S.InfoTextContainer>
            <S.InfoTextContainer>
              <S.InfoTextBold>장르</S.InfoTextBold>
              <S.InfoText> | {ret.genre}</S.InfoText>
            </S.InfoTextContainer>
          </S.InfoContainer>
          <S.IconContainer>
            {ret.isLiked ? <HeartFilled></HeartFilled> : <HeartOutlined></HeartOutlined>}
            {'    '}
            <ShareAltOutlined></ShareAltOutlined>
          </S.IconContainer>
        </S.ExhibitionContainer>
        <h3>전시 소개</h3>
        <S.DescriptionWrapper>{ret.description}</S.DescriptionWrapper>
        <h3>위치 안내</h3>
        <S.PlaceInfo>장소 | {ret.placeAddr}</S.PlaceInfo>
        <h3>후기({ret.reviews.length}개)</h3>
        <S.ReviewContainer>
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
              photo={review.photos[0]}
              userId={review.user.userId}
              nickname={review.user.nickname}
              profileImage={review.user.profileImage}
            ></ReviewCard>
          ))}
        </S.ReviewContainer>
        <S.ButtonContainer>
          <Link href={`/community/${ret.exhibitionId}`}>
            <S.StyledButton type="primary">후기 모두 보기</S.StyledButton>
          </Link>
          <Link href={`/reviews/create`}>
            <S.StyledButton type="primary">후기 작성하기</S.StyledButton>
          </Link>
        </S.ButtonContainer>
      </S.ExhibitionPageContainer>
    </>
  );
};

export default ExhibitionDetailPage;
