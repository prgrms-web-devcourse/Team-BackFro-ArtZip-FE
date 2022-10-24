import styled from '@emotion/styled';
import { DatePicker } from 'antd';
import moment from 'moment';
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import ErrorMessage, { ERROR_MESSAGE_COMMON } from '../../utils/ErrorMessage';
import { FieldGetter } from '../..';

const MESSAGE = {
  ...ERROR_MESSAGE_COMMON,
  EXCEEDED_CURRENT_DATE: '다녀온 날짜는 오늘 이후일 수 없습니다.',
};

interface DateInputProps {
  prevDate?: string;
  wasSubmitted: boolean;
}

const disabledDate = (current: moment.Moment) => {
  return current && current.valueOf() >= Date.now();
};

const DateInput = forwardRef(
  ({ prevDate, wasSubmitted }: DateInputProps, ref: ForwardedRef<FieldGetter>) => {
    const [date, setDate] = useState(prevDate ? moment(prevDate, 'YYYY-MM-DD') : undefined);
    const [error, setError] = useState(prevDate ? MESSAGE.NO_ERROR : MESSAGE.REQUIRED_VALUE);
    const [clicked, setClicked] = useState(false);
    const displayErrorMessage = (wasSubmitted || clicked) && !!error;

    useEffect(() => {
      setDate(prevDate ? moment(prevDate, 'YYYY-MM-DD') : undefined);
      setError(prevDate ? MESSAGE.NO_ERROR : MESSAGE.REQUIRED_VALUE);
    }, [prevDate]);

    const handleChange = (value: moment.Moment | null) => {
      setClicked(true);
      if (validate(value) && value) {
        setDate(value);
      } else {
        setDate(undefined);
      }
    };

    const validate = (value: moment.Moment | null) => {
      if (!value) {
        setError(MESSAGE.REQUIRED_VALUE);
        return false;
      }
      if (value && new Date(value.format('YYYY-MM-DD')) > new Date()) {
        setError(MESSAGE.EXCEEDED_CURRENT_DATE);
        return false;
      }
      setError(MESSAGE.NO_ERROR);
      return true;
    };

    useImperativeHandle(
      ref,
      () => ({
        getFieldValue: () => ({
          date: date ? date.format('YYYY-MM-DD') : '',
        }),
        getFieldError: () => ({
          date: error,
        }),
      }),
      [date, error],
    );

    return (
      <>
        <DateSelect value={date} onChange={handleChange} disabledDate={disabledDate} />
        <ErrorMessage message={error} visible={displayErrorMessage} />
      </>
    );
  },
);

const DateSelect = styled(DatePicker)`
  width: 200px;

  & > input {
    font-size: 1.6rem;
  }
`;

DateInput.displayName = 'DateInput';

export default DateInput;
