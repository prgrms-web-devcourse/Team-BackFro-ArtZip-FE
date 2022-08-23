import styled from '@emotion/styled';
import { Image } from 'antd';
import { PhotoProps } from 'types/model';

const ImageGroup = ({ imageSources }: { imageSources: PhotoProps[] }) => {
  return (
    <ImageGroupContainer>
      {imageSources.map((imageSource) => (
        <InsideImage
          key={imageSource.photoId}
          width={300}
          height={300}
          src={imageSource.path}
          alt="review image"
        />
      ))}
    </ImageGroupContainer>
  );
};

const ImageGroupContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 1fr;
  margin-right: 10px;
  gap: 15px;
`;

const InsideImage = styled(Image)`
  object-fit: cover;
`;

export default ImageGroup;
