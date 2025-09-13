import React, { useState } from 'react';

interface CalendarHeaderProps {
  month: string;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}
const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  month,
  year,
  onPrevMonth,
  onNextMonth
}) => {
  return (
    <header className="flex items-center gap-[27px] text-2xl text-black justify-center">
      <button
        onClick={onPrevMonth}
        className="hover:bg-gray-100 rounded p-1 transition-colors"
        aria-label="Previous month"
      >
        ←
      </button>
      <div className="flex min-h-[34px] w-[122px] items-center gap-px overflow-hidden justify-center pb-1">
        <div className="rounded h-6 font-semibold px-2">
          {month}
        </div>
        <div className="rounded h-6 font-normal w-[53px]">
          {year}
        </div>
      </div>
      <button
        onClick={onNextMonth}
        className="hover:bg-gray-100 rounded p-1 transition-colors"
        aria-label="Next month"
      >
        →
      </button>
    </header>
  );
};
interface CalendarGridProps {
  selectedDate: number;
  onDateSelect: (date: number) => void;
  currentMonth: number;
  currentYear: number;
}
const CalendarGrid: React.FC<CalendarGridProps> = ({
  selectedDate,
  onDateSelect,
  currentMonth,
  currentYear
}) => {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };
  const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1;
  };
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const daysInPrevMonth = getDaysInMonth(prevMonth, prevYear);
  const calendarDays = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isPrevMonth: true
    });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      isPrevMonth: false
    });
  }
  const remainingCells = 42 - calendarDays.length;
  for (let day = 1; day <= remainingCells; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      isPrevMonth: false
    });
  }
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }
  const today = new Date();
  const isCurrentMonthAndYear = currentMonth === today.getMonth() + 1 && currentYear === today.getFullYear();
  return (
    <div className="flex min-h-[326px] w-full max-w-[311px] flex-col overflow-hidden items-center text-base text-[rgba(179,179,179,1)] font-normal justify-between mt-11 max-md:mt-10">
      <div className="flex w-[285px] max-w-full items-center gap-4 overflow-hidden text-lg text-black font-semibold justify-between">
        {daysOfWeek.map((day, index) => (
          <div
            key={day}
            className={`rounded h-6 my-auto ${
              index === 0 ? 'w-[34px]' : index === 6 ? 'w-[30px]' : 'w-6'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
      {weeks.slice(0, 6).map((week, weekIndex) => (
        <div
          key={weekIndex}
          className={`flex w-[285px] max-w-full items-center overflow-hidden justify-between mt-[34px] ${
            weekIndex === 4 ? 'gap-[17px]' : 'gap-[19px]'
          }`}
        >
          {week.map((dateObj, dayIndex) => {
            const isSelected = dateObj.isCurrentMonth && dateObj.day === selectedDate;
            const isClickable = dateObj.isCurrentMonth;
            const isToday = isCurrentMonthAndYear && dateObj.isCurrentMonth && dateObj.day === today.getDate();
            let textColor = 'text-[rgba(179,179,179,1)]';
            if (dateObj.isCurrentMonth) {
              if (dateObj.day >= 21 && dateObj.day <= 25) {
                textColor = 'text-[rgba(97,97,97,1)]';
              } else if (dateObj.day >= 26) {
                textColor = 'text-[rgba(97,97,97,1)]';
              } else {
                textColor = 'text-[rgba(179,179,179,1)]';
              }
            } else if (!dateObj.isPrevMonth) {
              textColor = 'text-[rgba(179,179,179,1)]';
            }
            return (
              <button
                key={`${weekIndex}-${dayIndex}`}
                onClick={() => isClickable && onDateSelect(dateObj.day)}
                disabled={!isClickable}
                className={`rounded min-h-6 w-6 my-auto transition-colors ${
                  isSelected
                    ? 'bg-white min-h-[34px] text-black w-[34px] h-[34px] rounded-2xl'
                    : `${textColor} hover:bg-gray-100 ${isClickable ? 'cursor-pointer' : 'cursor-default'} ${
                        isToday ? 'ring-2 ring-blue-400' : ''
                      }`
                }`}
                aria-label={isClickable ? `Select ${dateObj.day}` : undefined}
              >
                {dateObj.day || ''}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
interface CalendarWidgetProps {
  selectedDate: number;
  onDateSelect: (date: number) => void;
  currentMonth: number;
  currentYear: number;
  onMonthChange: (month: number, year: number) => void;
}
const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  selectedDate,
  onDateSelect,
  currentMonth,
  currentYear,
  onMonthChange
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      onMonthChange(12, currentYear - 1);
    } else {
      onMonthChange(currentMonth - 1, currentYear);
    }
  };
  const handleNextMonth = () => {
    if (currentMonth === 12) {
      onMonthChange(1, currentYear + 1);
    } else {
      onMonthChange(currentMonth + 1, currentYear);
    }
  };
  return (
    <section className="bg-[rgba(217,217,217,1)] flex grow flex-col items-stretch whitespace-nowrap text-center w-full py-[70px] max-md:mt-[27px]">
      <header className="flex justify-center">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/cdd5a3b04351754b7771e8d19c236234b9a9a7f5?placeholderIfAbsent=true"
          alt="Company logo"
          className="aspect-[5.68] object-contain w-[205px] max-w-full"
        />
      </header>
      <div className="flex w-full flex-col items-center mt-[43px] max-md:mt-10">
        <CalendarHeader
          month={monthNames[currentMonth - 1]}
          year={currentYear}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <CalendarGrid
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
          currentMonth={currentMonth}
          currentYear={currentYear}
        />
      </div>
    </section>
  );
};
interface TimeSlotProps {
  time: string;
  isSelected: boolean;
  onSelect: () => void;
  isAvailable: boolean;
}
const TimeSlot: React.FC<TimeSlotProps> = ({ time, isSelected, onSelect, isAvailable }) => {
  return (
    <button
      onClick={onSelect}
      disabled={!isAvailable}
      className={`w-full border gap-2.5 text-center mt-[7px] px-[101px] py-[15px] rounded-lg border-[rgba(0,0,0,0.5)] border-solid max-md:px-5 transition-colors ${
        !isAvailable
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : isSelected
          ? 'bg-blue-100 border-blue-500'
          : 'bg-white hover:bg-gray-50'
      }`}
      aria-pressed={isSelected}
    >
      <time>{time}</time>
    </button>
  );
};
interface MeetingSchedulerProps {
  selectedDate: number;
  currentMonth: number;
  currentYear: number;
}
const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({
  selectedDate,
  currentMonth,
  currentYear
}) => {
  const [selectedDuration, setSelectedDuration] = useState('30 mins');
  const [selectedTime, setSelectedTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const durations = ['15 mins', '30 mins', '45 mins', '60 mins'];
  const timeSlots = ['3:00 pm', '3:30 pm', '4:00 pm', '4:30 pm', '5:00 pm'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthName = monthNames[currentMonth - 1];
  const getAvailability = (time: string) => {
    if (selectedDate === 15 && time === '4:00 pm') return false;
    if (selectedDate === 20 && time === '3:30 pm') return false;
    return true;
  };
  const getCSRFToken = () => {
    const csrfCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrftoken='));
    return csrfCookie ? csrfCookie.split('=')[1] : '';
  };
  const convertTo24Hour = (time12: string): string => {
    const [time, modifier] = time12.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'pm') {
      hours = String(parseInt(hours, 10) + 12);
    }
    return `${hours}:${minutes}`;
  };
  const getDurationMinutes = (duration: string): number => {
    return parseInt(duration.split(' ')[0]);
  };
  const handleConfirmBooking = async () => {
    if (!selectedTime || !selectedDuration) {
      setErrorMessage('Please select both time and duration');
      setBookingStatus('error');
      return;
    }
    setIsLoading(true);
    setBookingStatus('idle');
    setErrorMessage('');
    try {
      const formattedDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${selectedDate.toString().padStart(2, '0')}`;
      const formattedTime = convertTo24Hour(selectedTime);
      const durationMinutes = getDurationMinutes(selectedDuration);
      const requestData = {
        date: formattedDate,
        time: formattedTime,
        duration: durationMinutes,
        timezone: 'UTC +05:30' 
      };
      const response = await fetch('/api/create-meeting/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken(),
        },
        credentials: 'same-origin', 
        body: JSON.stringify(requestData)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setBookingStatus('success');
        setTimeout(() => {
          setSelectedTime('');
          setBookingStatus('idle');
        }, 3000);
      } else {
        throw new Error(data.error || 'Failed to create meeting');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      setBookingStatus('error');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="flex w-full flex-col self-stretch items-stretch text-base text-black font-normal my-auto max-md:mt-10">
      <header>
        <h2 className="text-xl font-semibold tracking-[0.2px] text-center">
          Meeting duration
        </h2>
      </header>
      
      <div className="mt-[5px]">
        <select
          value={selectedDuration}
          onChange={(e) => setSelectedDuration(e.target.value)}
          className="w-full bg-[rgba(229,226,226,1)] border gap-2.5 text-xl text-[rgba(84,84,84,1)] font-medium text-center tracking-[0.2px] px-[99px] py-1.5 rounded-md border-[rgba(0,0,0,0.5)] border-solid max-md:px-5 appearance-none cursor-pointer"
          aria-label="Select meeting duration"
          disabled={isLoading}
        >
          {durations.map((duration) => (
            <option key={duration} value={duration}>
              {duration}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-[43px] max-md:mt-10">
        <h3 className="text-xl font-semibold tracking-[0.2px] text-center">
          What time works best?
        </h3>    
        <p className="text-lg tracking-[0.18px] max-md:mr-2.5 mt-2">
          <span className="font-light">Showing times for</span>{' '}
          <span className="font-medium tracking-[0.36px]">
            {currentMonthName} {selectedDate}, {currentYear}
          </span>
        </p> 
        <div className="flex items-stretch gap-2.5 text-lg text-center mt-3.5 max-md:mr-[5px]">
          <div className="grow">
            UTC +05:30 New Delhi, Mumbai
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/57222bbc81684d2091cbea74e310342f/f541af7cfadac99966b6836607689554bbd80c50?placeholderIfAbsent=true"
            alt="Timezone icon"
            className="aspect-[0.96] object-contain w-[23px] shrink-0"
          />
        </div>     
        <div className="mt-2.5">
          {timeSlots.map((time, index) => (
            <TimeSlot
              key={time}
              time={time}
              isSelected={selectedTime === time}
              onSelect={() => setSelectedTime(time)}
              isAvailable={getAvailability(time) && !isLoading}
            />
          ))}
        </div>
        {selectedTime && bookingStatus === 'idle' && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-center text-blue-800">
              <strong>Selected:</strong> {selectedDuration} meeting on {currentMonthName} {selectedDate}, {currentYear} at {selectedTime}
            </p>
            <button 
              onClick={handleConfirmBooking}
              disabled={isLoading}
              className={`w-full mt-3 py-2 px-4 rounded-lg transition-colors ${
                isLoading 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        )}
        {bookingStatus === 'success' && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="text-center text-green-800">
              <div className="text-2xl mb-2">✅</div>
              <p className="font-semibold">Meeting Successfully Booked!</p>
              <p className="text-sm mt-1">
                {selectedDuration} meeting on {currentMonthName} {selectedDate}, {currentYear} at {selectedTime}
              </p>
              <p className="text-xs mt-2 text-green-600">
                You should receive a confirmation email shortly.
              </p>
            </div>
          </div>
        )}
        {bookingStatus === 'error' && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-center text-red-800">
              <div className="text-2xl mb-2">❌</div>
              <p className="font-semibold">Booking Failed</p>
              <p className="text-sm mt-1">{errorMessage}</p>
              <button 
                onClick={() => setBookingStatus('idle')}
                className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default function Index() {
  const [selectedDate, setSelectedDate] = useState(20);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
    setSelectedDate(1);
  };
  const handleDateSelect = (date: number) => {
    setSelectedDate(date);
  };
  return (
    <main className="bg-white flex flex-col overflow-hidden items-center justify-center px-[70px] py-[201px] max-md:px-5 max-md:py-[100px] min-h-screen">
      <div className="bg-[rgba(182,182,182,1)] w-[643px] max-w-full pr-[21px] rounded-lg max-md:pr-5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[55%] max-md:w-full max-md:ml-0">
            <CalendarWidget
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              currentMonth={currentMonth}
              currentYear={currentYear}
              onMonthChange={handleMonthChange}
            />
          </div>
          <div className="w-[45%] ml-5 max-md:w-full max-md:ml-0">
            <MeetingScheduler
              selectedDate={selectedDate}
              currentMonth={currentMonth}
              currentYear={currentYear}
            />
          </div>
        </div>
      </div>
      <footer className="mt-8 text-center text-gray-600">
        <p>Select a date and time to schedule your meeting</p>
      </footer>
    </main>
  );
}