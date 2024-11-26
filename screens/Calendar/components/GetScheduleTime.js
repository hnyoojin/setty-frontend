import React, { useState, useEffect } from 'react';
import DatePicker from 'react-native-date-picker';

const GetScheduleTime = ({ visible, onClose, onConfirm, initialTime }) => {
  const [time, setTime] = useState(initialTime || new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (initialTime) {
      setTime(initialTime); // 초기 시간 설정
    }
  }, [initialTime]);

  return (
    <DatePicker
      modal
      mode="time"
      title="시간을 선택해주세요."
      open={visible}
      date={time}
      onConfirm={(selectedTime) => {
        setTime(selectedTime);
        onConfirm(selectedTime); // 부모 컴포넌트로 전달
        onClose(); // 모달 닫기
      }}
      onCancel={onClose} // 취소 시 모달 닫기
    />
  );
};

export default GetScheduleTime;
