import { rest } from 'msw';

const COMMENTS = [
  {
    commentId: 0,
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
    children: [
      {
        commentId: 1,
        content: '같이 가용~',
        createdAt: '2022-07-26T11:26:24',
        updatedAt: null,
        isEdited: false,
        isDeleted: false,
        user: {
          userId: 1,
          nickname: '그린',
          profileImage: 'https://joeschmoe.io/api/v1/random',
        },
      },
    ],
  },
];

const CommentHandlers = [
  // 댓글 조회 (계속해서 받아오는건 구현 x)
  rest.post(
    `${process.env.MOCKING_API_END_POINT}api/v1/exhibitions/:exhibitionId/comments?page=0&size=10`,
    async (req, res, ctx) => {
      // const { exhibitionId } = req.params;
      // const page = req.url.searchParams.get('page');
      // const size = req.url.searchParams.get('size');

      COMMENTS.push(await req.json());
      return res(
        ctx.json({
          message: '댓글 조회 성공',
          status: 200,
          data: {
            ...COMMENTS,
          },
        }),
      );
    },
  ),
];

export default CommentHandlers;
