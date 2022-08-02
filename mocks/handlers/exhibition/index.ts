import { rest } from 'msw';

const EXHIBITION = {
  content: [
    {
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
      genre: null,
      description: null,
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
          content: '오늘 번아웃증후군 전시회를 다녀왔다. 정말 재밌었다~~',
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
    },
  ],
};

const ExhibitionHandlers = [
  rest.get(
    `${process.env.MOCKING_API_END_POINT}api/v1/exhibitions/:exhibitionId`,
    (req, res, ctx) => {
      const exhibition_success = {
        message: '전시회 조회 성공',
        code: 200,
        data: {
          ...EXHIBITION,
        },
      };
      return res(ctx.json(exhibition_success));
    },
  ),
];

export default ExhibitionHandlers;
