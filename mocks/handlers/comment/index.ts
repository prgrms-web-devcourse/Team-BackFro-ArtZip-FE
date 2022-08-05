import { rest } from 'msw';

//  기준 데이터 : 43번 리뷰 (코멘트 갯수가 안맞을 지도)
const COMMENTS = {
  data: {
    content: [
      {
        commentId: 1,
        content: '꼭 가고 싶네요. 근데 시간이 될지ㅠㅠ',
        createdAt: '2022-07-26T11:26:24',
        updatedAt: '2022-07-26T11:28:49',
        isEdited: true,
        isDeleted: false,
        user: {
          userId: 0,
          nickname: '미스터공공',
          profileImage: 'https://joeschmoe.io/api/v1/random',
        },
        childrenCount: 3,
      },
    ],
    numberOfElements: 1, //content의 요소가 몇개인지
    offset: 0, // 현재 페이지에서 시작하는 요소의 index 번호
    pageNumber: 0, //페이지 넘버
    pageSize: 20, //페이지 사이즈
    totalElements: 1, // 전체 요소 수
    totalPages: 1, //전체 페이지 수
  },
};

// 기준데이터 : commentId가 0인 댓글에 대한 대댓글
const REPLYS = {
  data: {
    content: [
      {
        commentId: 11,
        content: '같이가요~~',
        createdAt: '2022-07-26T11:26:24',
        updatedAt: '2022-07-26T11:28:49',
        isEdited: true,
        isDeleted: false,
        user: {
          userId: 0,
          nickname: '그린',
          profileImage: 'https://joeschmoe.io/api/v1/random',
        },
      },
      {
        commentId: 12,
        content: '같이가요~~',
        createdAt: '2022-07-26T11:26:24',
        updatedAt: '2022-07-26T11:28:49',
        isEdited: false,
        isDeleted: false,
        user: {
          userId: 0,
          nickname: '그린',
          profileImage: 'https://joeschmoe.io/api/v1/random',
        },
      },
      {
        commentId: 13,
        content: '같이가요~~',
        createdAt: '2022-07-26T11:26:24',
        updatedAt: '2022-07-26T11:28:49',
        isEdited: true,
        isDeleted: false,
        user: {
          userId: 0,
          nickname: '그린',
          profileImage: 'https://joeschmoe.io/api/v1/random',
        },
      },
    ],
    numberOfElements: 3, //content의 요소가 몇개인지
    offset: 0, // 현재 페이지에서 시작하는 요소의 index 번호
    pageNumber: 0, //페이지 넘버
    pageSize: 10, //페이지 사이즈
    totalElements: 1, // 전체 요소 수
    totalPages: 3, //전체 페이지 수
  },
};

const CommentHandlers = [
  // 후기의 댓글 조회
  rest.get(
    `${process.env.MOCKING_API_END_POINT}api/v1/reviews/:reviewId/comments`,
    (req, res, ctx) => {
      // 43번 기준이므로 review는 무조건 43번 리뷰
      // const { reviewId } = req.params;
      const page = req.url.searchParams.get('page');
      const size = req.url.searchParams.get('size');

      const comments_success = {
        message: '댓글 조회 성공',
        code: 200,
        data: {
          ...COMMENTS,
        },
      };
      return res(ctx.json(comments_success));
    },
  ),

  // 댓글 삭제
  rest.delete(`${process.env.MOCKING_API_END_POINT}api/v1/comments/:commentId`, (req, res, ctx) => {
    const { commentId } = req.params;

    const COMMENTS_DELETED = COMMENTS.data.content.filter(
      (comment) => Number(commentId) !== comment.commentId,
    );

    COMMENTS.data.content = COMMENTS_DELETED;
    const DELETE_COMMENT_SUCCESS = {
      message: '댓글 삭제 성공',
      code: 200,
      data: {
        commentId: commentId,
        createdAt: '2022-07-26T11:26:24',
        isDeleted: true,
      },
    };
    return res(ctx.json(DELETE_COMMENT_SUCCESS));
  }),

  // 댓글 수정
  rest.patch(
    `${process.env.MOCKING_API_END_POINT}api/v1/comments/:commentId`,
    async (req, res, ctx) => {
      const { commentId } = req.params;
      const UPDATE_CONTENT = await req.json();

      // 값 수정
      const targetIndex = COMMENTS.data.content.findIndex(
        (comment) => comment.commentId === Number(commentId),
      );

      COMMENTS.data.content[targetIndex].content = UPDATE_CONTENT;
      COMMENTS.data.content[targetIndex].isEdited = true;

      const DELETE_COMMENT_SUCCESS = {
        message: '댓글 수정 성공',
        code: 200,
        data: {
          ...COMMENTS.data.content[targetIndex],
        },
      };
      return res(ctx.json(DELETE_COMMENT_SUCCESS));
    },
  ),
  // 댓글 생성

  rest.post(
    `${process.env.MOCKING_API_END_POINT}api/v1/reviews/:reviewId/comments`,
    async (req, res, ctx) => {
      const commentId = COMMENTS.data.content.length + 3;
      const { content, parentId } = await req.json();

      // parentId가 있는 경우 (대댓글)
      if (parentId) {
        // 대댓글 생성 로직
        REPLYS.data.content.push({
          commentId: commentId,
          content: content,
          createdAt: '2022-07-26T11:26:24',
          updatedAt: '',
          isEdited: false,
          isDeleted: false,
          user: {
            userId: 0,
            nickname: '대댓글',
            profileImage: 'https://joeschmoe.io/api/v1/random?42',
          },
        });

        COMMENTS.data.content[parentId].childrenCount += 1;

        return res(
          ctx.delay(100),
          ctx.status(200),
          ctx.json({
            message: '댓글 생성 성공',
            code: 201,
            data: {
              commentId: commentId,
              content: content,
              createdAt: '2022-07-26T11:26:24',
              updatedAt: '',
              isEdited: false,
              isDeleted: false,
              user: {
                userId: 0,
                nickname: '대댓글',
                profileImage: 'https://joeschmoe.io/api/v1/random?42',
              },
            },
          }),
        );
      }
      // 일반 댓글의 경우
      const newComment = {
        commentId: commentId,
        content: content,
        createdAt: '2022-07-26T11:26:24',
        updatedAt: '',
        isEdited: false,
        isDeleted: false,
        user: {
          userId: 0,
          nickname: '대래대래댓댓댓글',
          profileImage: 'https://joeschmoe.io/api/v1/random?23',
        },
        childrenCount: 0,
      };

      COMMENTS.data.content.push(newComment);

      return res(
        ctx.delay(100),
        ctx.status(200),
        ctx.json({
          message: '댓글 생성 성공',
          code: 201,
          data: newComment,
        }),
      );
    },
  ),

  // 대댓글 조회 (TODO: 미구현, 우선은 댓글을 그대로 리턴하도록)
  rest.get(
    `${process.env.MOCKING_API_END_POINT}api/v1/comments/:commentId/children`,
    (req, res, ctx) => {
      const { commentId } = req.params;

      const reply_success = {
        message: '대댓글 조회 성공',
        code: 200,
        data: {
          ...REPLYS.data.content,
        },
      };
      return res(ctx.json(reply_success));
    },
  ),
];

export default CommentHandlers;
