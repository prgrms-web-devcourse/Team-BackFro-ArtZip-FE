import styled from '@emotion/styled';
import { Switch } from 'antd';
import { useEffect, useState } from 'react';
import { ValueOf } from 'types/utility';
import { SubmitData } from '../..';

interface IsPublicSwitchProps {
  prevIsPublic?: boolean;
  onValueChange: (key: string, value: ValueOf<SubmitData>) => void;
}

const IsPublicSwitch = ({ prevIsPublic, onValueChange }: IsPublicSwitchProps) => {
  const [isPublic, setIsPublic] = useState(prevIsPublic !== undefined ? prevIsPublic : true);

  useEffect(() => {
    prevIsPublic !== undefined && setIsPublic(prevIsPublic);
  }, [prevIsPublic]);

  return (
    <>
      <ToggleSwitch
        checked={isPublic}
        onChange={(checked) => {
          onValueChange('isPublic', checked);
          setIsPublic(checked);
        }}
      />
      {isPublic ? '전체 공개' : '비공개'}
    </>
  );
};

const ToggleSwitch = styled(Switch)`
  width: 54px;
  margin-right: 14px;
`;

export default IsPublicSwitch;
