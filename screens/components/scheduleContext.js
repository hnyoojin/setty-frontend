import React, { useCallback,createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ScheduleContext = createContext();
const API_URL='백엔드 URL 여기에 넣어주세요...이렇게 하는 게 맞는지 모르겠음음';

export const ScheduleProvider = ({ children }) => {
  const [schedules, setSchedules] = useState([
    {
      sid: new Date().getTime().toString(),
      event: '신정',
      startDate: '2025-01-01T01:01:01.000Z',
      startTime: '2025-01-01T01:01:01.000Z',
      endDate: '2025-01-01T23:59:59.999Z',
      endTime: '2025-01-01T23:59:59.999Z',
    },
    {
      sid: new Date().getTime().toString() + 1, //sid로 같은 이벤트명 구분 mockData에서는 임의로 sid 조정정
      event: '신정',
      startDate: '2025-01-01T01:01:01.000Z',
      startTime: '2025-01-01T01:01:01.000Z',
      endDate: '2025-01-01T23:59:59.999Z',
      endTime: '2025-01-01T23:59:59.999Z',
    },
    {
      sid: new Date().getTime().toString() + 2,
      event: '신정',
      startDate: '2025-01-01T01:01:01.000Z',
      startTime: '2025-01-01T01:01:01.000Z',
      endDate: '2025-01-01T23:59:59.999Z',
      endTime: '2025-01-01T23:59:59.999Z',
    },
    {
      sid: new Date().getTime().toString() + 3,
      event: '여러 날에 걸친 이벤트',
      startDate: '2025-02-05T03:01:01.000Z',
      startTime: '2025-02-05T03:01:01.000Z',
      endDate: '2025-02-07T23:59:59.999Z',
      endTime: '2025-02-07T23:59:59.999Z',
    },
    {
      sid: new Date().getTime().toString() + 4,
      event: '여러 달에 걸친 이벤트',
      startDate: '2025-01-30T03:01:01.000Z',
      startTime: '2025-01-30T03:01:01.000Z',
      endDate: '2025-02-02T15:20:59.999Z',
      endTime: '2025-02-02T15:20:59.999Z',
    },
  ]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [filteredSchedules, setFilteredSchedules] = useState([]);

  // 1. 백엔드에서 스케줄 가져오기
  const fetchSchedules = useCallback(async () => {
    try {
      const response = await axios.get(API_URL);
      setSchedules(response.data); // 백엔드 데이터 설정
    } catch (error) {
      console.error('Failed to fetch schedules:', error);
    }
  }, []);

  // 2. 새 스케줄 추가 (백엔드와 로컬 상태 동기화)
  const addSchedule = async (schedule) => {
    try {
      const response = await axios.post(API_URL, schedule);
      setSchedules((prevSchedules) => [...prevSchedules, response.data]); // 새 일정 추가
    } catch (error) {
      console.error('Failed to add schedule:', error);
    }
  };

  // 3. 스케줄 삭제
  const deleteSchedule = async (sid) => {
    try {
      await axios.delete(`${API_URL}/${sid}`);
      setSchedules((prevSchedules) => prevSchedules.filter((list) => list.sid !== sid));
    } catch (error) {
      console.error('Failed to delete schedule:', error);
    }
  };

  // 4. 스케줄 필터링 (현재 월 기준)
  const filterDataByCurrentMonth = useCallback(() => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const filtered = schedules.filter((schedule) => {
      const scheduleStartDate = new Date(schedule.startDate);
      const scheduleEndDate = new Date(schedule.endDate);

      return scheduleStartDate <= endOfMonth && scheduleEndDate >= startOfMonth;
    });

    setFilteredSchedules(filtered);
  }, [currentDate, schedules]);

  // 초기 데이터 가져오기
  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  useEffect(() => {
    filterDataByCurrentMonth();
  }, [currentDate, schedules, filterDataByCurrentMonth]);

  return (
    <ScheduleContext.Provider
      value={{
        schedules,
        currentDate,
        setCurrentDate,
        filteredSchedules,
        addSchedule,
        deleteSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => useContext(ScheduleContext);