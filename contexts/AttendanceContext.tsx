import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AttendanceRecord = {
  present: boolean;
  communion: boolean;
  visitor: boolean;
  memberName: string;
};

type AttendanceData = {
  eventId: number;
  eventDate: string;
  eventCategory: string;
  attendanceList: Record<string, AttendanceRecord>;
};

type AttendanceContextType = {
  saveAttendance: (data: AttendanceData) => Promise<boolean>;
  getServiceAttendance: (eventId: number) => AttendanceData | null;
  isSaving: boolean;
  error: string | null;
};

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export function AttendanceProvider({ children }: { children: React.ReactNode }) {
  const [isSaving, setIsSaving] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState<Record<number, AttendanceData>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAttendanceRecords();
  }, []);

  const loadAttendanceRecords = async () => {
    try {
      const savedRecords = await AsyncStorage.getItem('attendanceRecords');
      if (savedRecords) {
        setAttendanceRecords(JSON.parse(savedRecords));
      }
    } catch (error) {
      console.error('Error loading attendance records:', error);
      setError('Failed to load attendance records');
    }
  };

  const saveAttendance = async (data: AttendanceData): Promise<boolean> => {
    try {
      setIsSaving(true);
      setError(null);
      
      const updatedRecords = {
        ...attendanceRecords,
        [data.eventId]: data
      };
      
      await AsyncStorage.setItem('attendanceRecords', JSON.stringify(updatedRecords));
      setAttendanceRecords(updatedRecords);
      return true;
    } catch (error) {
      console.error('Error saving attendance:', error);
      setError('Failed to save attendance');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const getServiceAttendance = (eventId: number): AttendanceData | null => {
    return attendanceRecords[eventId] || null;
  };

  return (
    <AttendanceContext.Provider
      value={{
        saveAttendance,
        getServiceAttendance,
        isSaving,
        error
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error('useAttendance must be used within an AttendanceProvider');
  }
  return context;
}