import styled from '@emotion/styled';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { ValueOf } from 'types/utility';
import { SubmitData } from '../..';

interface DateInputProps {
  prevDate?: string;
  handleChange: (key: string, value: ValueOf<SubmitData>) => void;
}

const DateInput = ({ prevDate, handleChange }: DateInputProps) => {
  const [date, setDate] = useState(prevDate ? moment(prevDate, 'YYYY-MM-DD') : undefined);

  useEffect(() => {
    prevDate && setDate(moment(prevDate, 'YYYY-MM-DD'));
  }, [prevDate]);

  return (
    <DateSelect
      value={date}
      onChange={(value) => {
        if (value) {
          handleChange('date', value.format('YYYY-MM-DD'));
          setDate(value);
        }
      }}
    />
  );
};

const DateSelect = styled(DatePicker)`
  width: 200px;

  & > input {
    font-size: 1.6rem;
  }
`;

export default DateInput;
