export type Age = {
  years: number | string;
  months: number | string;
  days: number | string;
};
export type Error = {
  errorYear: string;
  errorMonth: string;
  errorDay: string;
};

const calculateAge = (year: string, month: string, day: string): { age: Age; error: Error } => {
  const error: Error = { errorYear: '', errorMonth: '', errorDay: '' };
  const age: Age = { years: '--', months: '--', days: '--' };

  if (!year) {
    error.errorYear = 'Year is required';
  } else if (isNaN(Number(year))) {
    error.errorYear = 'Year must be a number';
  } else if (year.length !== 4) {
    error.errorYear = 'Year must be 4 digits';
  } else if (Number(year) > new Date().getFullYear()) {
    error.errorYear = 'Year cannot be in the future';
  }

  if (!month) {
    error.errorMonth = 'Month is required';
  } else if (isNaN(Number(month))) {
    error.errorMonth = 'Month must be a number';
  } else if (Number(month) < 1 || Number(month) > 12) {
    error.errorMonth = 'Month must be between 1 and 12';
  }

  const maxDaysInMonth = (month: number, year: number): number => {
    if (month === 2) {
      return year % 4 === 0 ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(month)) {
      return 30;
    }
    return 31;
  }

  if (!day) {
    error.errorDay = 'Day is required';
  } else if (isNaN(Number(day))) {
    error.errorDay = 'Day must be a number';
  } else if (Number(day) < 1 || Number(day) > maxDaysInMonth(Number(month), Number(year))) {
    error.errorDay = `Day must be between 1 and ${maxDaysInMonth(Number(month), Number(year))}`;
  }

  if (error.errorYear || error.errorMonth || error.errorDay) {
    return { age, error };
  }

  const birthDate = new Date(`${year}-${month}-${day}`);
  const currentDate = new Date();

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (months < 0 || (months === 0 && days < 0)) {
    years -= 1;
    months += 12;
  }

  if (days < 0) {
    const monthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    days = monthDays - birthDate.getDate() + currentDate.getDate();
    months -= 1;
  }

  age.years = years;
  age.months = months;
  age.days = days;

  return { age, error };
};

export default calculateAge;