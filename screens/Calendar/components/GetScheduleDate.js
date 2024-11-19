import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker';

const GetScheduleDate = ({ visible, onClose, onConfirm, initialDate }) => {
  const [date, setDate] = useState(initialDate || new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (initialDate) {
      setDate(initialDate); // 초기 날짜 설정
    }
  }, [initialDate]);

  return (
    <DatePicker
      modal
      mode="date"
      title="날짜를 선택해주세요."
      open={visible}
      date={date}
      onConfirm={(selectedDate) => {
        setDate(selectedDate);
        onConfirm(selectedDate); // 부모 컴포넌트로 전달
        onClose(); // 모달 닫기
      }}
      onCancel={onClose} // 취소 시 모달 닫기
    />
  );
};

export default GetScheduleDate;

