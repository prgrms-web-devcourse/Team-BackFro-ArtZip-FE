import useSWR from 'swr';

const useUserInfo = (id: string) => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_END_POINT}/api/v1/users/${id}/info`,
  );

  return {
    userInfo: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useUserInfo;
