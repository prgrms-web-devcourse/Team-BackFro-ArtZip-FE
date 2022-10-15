import styled from '@emotion/styled';
import { Switch } from 'antd';
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { FieldGetter } from '../..';

interface IsPublicSwitchProps {
  prevIsPublic?: boolean;
}

const IsPublicSwitch = forwardRef(
  ({ prevIsPublic }: IsPublicSwitchProps, ref: ForwardedRef<FieldGetter>) => {
    const [isPublic, setIsPublic] = useState(prevIsPublic !== undefined ? prevIsPublic : true);

    useEffect(() => {
      prevIsPublic !== undefined && setIsPublic(prevIsPublic);
    }, [prevIsPublic]);

    const handleChange = (checked: boolean) => {
      setIsPublic(checked);
    };

    useImperativeHandle(
      ref,
      () => ({
        getFieldValue: () => ({
          isPublic: isPublic,
        }),
        getFieldError: () => ({
          isPublic: '',
        }),
      }),
      [isPublic],
    );

    return (
      <>
        <ToggleSwitch checked={isPublic} onChange={handleChange} />
        {isPublic ? '전체 공개' : '비공개'}
      </>
    );
  },
);

const ToggleSwitch = styled(Switch)`
  width: 54px;
  margin-right: 14px;
`;

IsPublicSwitch.displayName = 'IsPublicSwitch';

export default IsPublicSwitch;
