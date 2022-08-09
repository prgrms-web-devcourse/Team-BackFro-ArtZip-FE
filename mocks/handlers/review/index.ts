import { rest } from 'msw';

// 후기 DB
const REVIEWS = {
  content: [
    {
      reviewId: 43,
      user: {
        userId: 11,
        profileImage: 'https://joeschmoe.io/api/v1/random',
        nickname: 'Emily',
      },
      exhibition: {
        exhibitionId: 24,
        name: '전시회 이름',
        thumbnail: 'https://www.culture.go.kr/upload/rdf/22/07/show_2022071816261910020.jpg',
        startDate: '2022-08-04',
        endDate: '2022-08-10',
        isLiked: false,
        likeCount: 5,
        reviewCount: 3,
      },
      title: '리뷰 제목 (핸드아트)',
      content: '오늘 핸드아트코리아 전시회를 다녀왔다. 정말 재밌었다~~',
      createdAt: '2022-03-22T22:33:11',
      updatedAt: '2022-03-23T13:03:51',
      isEdited: true,
      isLiked: false,
      isPublic: true,
      likeCount: 32,
      commentCount: 2,
      photos: [
        {
          photoId: 35,
          path: 'https://source.unsplash.com/random?1',
        },
        {
          photoId: 36,
          path: 'https://source.unsplash.com/random?2',
        },
        {
          photoId: 37,
          path: 'https://source.unsplash.com/random?3',
        },
        {
          photoId: 38,
          path: 'https://source.unsplash.com/random?4',
        },
        {
          photoId: 39,
          path: 'https://source.unsplash.com/random?5',
        },
      ],
      comments: {
        content: [
          {
            commentId: 0,
            content: '꼭 가고 싶네요. 근데 시간이 될지ㅠㅠ',
            createdAt: '2022-07-26T11:26:24',
            updatedAt: '2022-07-26T11:28:49',
            isEdited: true,
            isDeleted: false,
            user: {
              userId: 0,
              nickname: '미스터공공1',
              profileImage: 'https://joeschmoe.io/api/v1/random?5',
            },
            childrenCount: 1,
          },
          {
            commentId: 1,
            content: '대댓글 기준 데이터',
            createdAt: '2022-07-26T11:26:24',
            updatedAt: '2022-07-26T11:28:49',
            isEdited: true,
            isDeleted: false,
            user: {
              userId: 0,
              nickname: '미스터공공2',
              profileImage: 'https://joeschmoe.io/api/v1/random?6',
            },
            childrenCount: 3,
          },
          {
            commentId: 2,
            content: '꼭 가고 싶네요. 근데 시간이 될지ㅠㅠ',
            createdAt: '2022-07-26T11:26:24',
            updatedAt: '2022-07-26T11:28:49',
            isEdited: true,
            isDeleted: false,
            user: {
              userId: 0,
              nickname: '미스터공공3',
              profileImage: 'https://joeschmoe.io/api/v1/random?7',
            },
            childrenCount: 1,
          },
          {
            commentId: 3,
            content: '꼭 가고 싶네요. 근데 시간이 될지ㅠㅠ',
            createdAt: '2022-07-26T11:26:24',
            updatedAt: '2022-07-26T11:28:49',
            isEdited: true,
            isDeleted: false,
            user: {
              userId: 0,
              nickname: '미스터공공4',
              profileImage: 'https://joeschmoe.io/api/v1/random?8',
            },
            childrenCount: 1,
          },
        ],
      },
      numberOfElements: 1,
      offset: 0,
      pageNumber: 0,
      pageSize: 20,
      totalElements: 1,
      totalPages: 1,
    },
    {
      reviewId: 41,
      user: {
        userId: 11,
        profileImage: 'https://joeschmoe.io/api/v1/random?1',
        nickname: 'Emily',
      },
      exhibition: {
        exhibitionId: 24,
        name: '전시회 이름',
        startDate: '2022-10-11',
        thumbnail: 'https://joeschmoe.io/api/v1/random?2',
      },
      title: '핸드아트코리아 전시회 다녀옴~',
      content: '이건아주긴글입니다'.repeat(100),
      createdAt: '2022-03-22T22:33:11',
      updatedAt: '2022-03-23T13:03:51',
      isEdited: true,
      isLiked: false,
      isPublic: true,
      likeCount: 32,
      commentCount: 2,
      photos: [
        {
          photoId: 35,
          path: 'https://joeschmoe.io/api/v1/random?3',
        },
        {
          photoId: 36,
          path: 'https://joeschmoe.io/api/v1/random?4',
        },
      ],
      comments: [],
    },
  ],
  numberOfElements: 2,
  offset: 0,
  pageNumber: 0,
  pageSize: 20,
  totalElements: 2,
  totalPages: 5,
};

const ReviewHandlers = [
  // 후기 작성
  rest.post(`${process.env.MOCKING_API_END_POINT}api/v1/reviews`, async (req, res, ctx) => {
    REVIEWS.content.push(await req.json());
    return res(
      ctx.delay(100),
      ctx.status(200),
      ctx.json({
        message: '후기 생성 성공',
        code: 200,
        data: {
          reviewId: Math.floor(Math.random() * 101),
        },
      }),
    );
  }),
  // 후기 수정
  // TODO: api 명세 확인 필요
  //   rest.patch(`${process.env.MOCKING_API_END_POINT}api/v1/reviews`, async (req, res, ctx) => {
  //   }),

  // 리뷰 단건 조회
  rest.get(`${process.env.MOCKING_API_END_POINT}api/v1/reviews/:reviewId`, (req, res, ctx) => {
    const { reviewId } = req.params;
    const review = REVIEWS.content.filter((review) => review.reviewId.toString() === reviewId);
    const single_review_success = {
      message: '후기 단건 성공',
      code: 200,
      data: {
        ...review,
      },
    };
    return res(ctx.json(single_review_success));
  }),

  // 리뷰 다건 조회
  rest.get(`${process.env.MOCKING_API_END_POINT}api/v1/reviews`, (req, res, ctx) => {
    // const exhibitionId = req.url.searchParams.get('exhibitionId');
    const page = req.url.searchParams.get('page');
    // const size = req.url.searchParams.get('size');
    // const sort = req.url.searchParams.get('sort');

    // TODO: 각 경우별 응답을 구현해야 함. 우선은 전체 데이터를 return

    if (page) {
      const new_review_data = REVIEWS.content.map((review) => {
        review.reviewId += Math.floor(Math.random() * 1000);
        review.title = '무한스크롤 더미'.concat(page);
        // delete review.comments; 실제로는 빠져서 내려옴.
        return review;
      });

      const new_multi_review_success = {
        message: '후기 다건 조회 성공',
        code: 200,
        data: {
          // 빠지는 데이타
          ...new_review_data,
        },
      };

      // console.log('newnewnew', new_multi_review_success);
      return res(ctx.json(new_multi_review_success));
    }

    const multi_review_success = {
      message: '후기 다건 조회 성공',
      code: 200,
      data: {
        ...REVIEWS,
      },
    };
    return res(ctx.json(multi_review_success));
  }),

  // 후기 좋아요 토글 (등록 / 해제)
  rest.patch(
    `${process.env.MOCKING_API_END_POINT}api/v1/reviews/:reviewId/like`,
    (req, res, ctx) => {
      const { reviewId } = req.params;
      const reviewIndex = REVIEWS.content.findIndex(
        (review) => review.reviewId.toString() === reviewId,
      );
      REVIEWS.content[reviewIndex].isLiked
        ? (REVIEWS.content[reviewIndex].likeCount -= 1)
        : (REVIEWS.content[reviewIndex].likeCount += 1);

      REVIEWS.content[reviewIndex].isLiked = !REVIEWS.content[reviewIndex].isLiked;

      const like_success = {
        message: '후기 좋아요 등록/해제 성공',
        code: 200,
        data: {
          reviewId: REVIEWS.content[reviewIndex].reviewId,
          likeCount: REVIEWS.content[reviewIndex].likeCount,
          isLiked: REVIEWS.content[reviewIndex].isLiked,
        },
      };
      return res(ctx.json(like_success));
    },
  ),

  //TODO: 후기 삭제 - API 명세 필요
];

export default ReviewHandlers;
