'use client';
import React, { useState } from 'react';
import Image from "next/image";
import Narrow from "../public/assets/images/icon-arrow.svg";

type Age = {
  years: number | string;
  months: number | string;
  days: number | string;
};
type Error = {
  errorYear: string;
  errorMonth: string;
  errorDay: string;
};

const calculateAge = (year: string, month: string, day: string): { age: Age; error: Error } => {

  const birth = new Date(parseInt(year), parseInt(month), parseInt(day));
  const today = new Date();
  console.log('year', year);
  console.log('month', month);
  console.log('day', day);
  const ageYears = today.getFullYear() - birth.getFullYear();
  const ageMonths = today.getMonth() - birth.getMonth();
  const ageDays = today.getDate() - birth.getDate();
  const error = {
    errorYear: ['Must be in the past', 'This field is required', 'Must be a valid date'],
    errorMonth: ['Must be a valid month', 'This field is required', 'Must be a valid date'],
    errorDay: ['Must be a valid day', 'This field is required', 'Must be a valid date'],
  };

  const maxDaysInMonth = (month: number, year: number): number => {
    if (month === 2) {
      return year % 4 === 0 ? 29 : 28;
    }
    return [4, 6, 9, 11].includes(month) ? 30 : 31;
  };

  const maxDays = maxDaysInMonth(parseInt(month), parseInt(year));
  if(!year || !month || !day) {
    return { age: { years: '--', months: '--', days: '--' }, error: { errorYear: 'This field is required', errorMonth: 'This field is required', errorDay: 'This field is required' } };
  } else if (birth.getFullYear() > today.getFullYear() || birth.getMonth() > 12 || birth.getDate() > 31) {
    return { age: { years: '--', months: '--', days: '--' }, error: { errorYear: error.errorYear[0], errorMonth: error.errorMonth[0], errorDay: error.errorDay[0] } };
  } else if (birth.getDate() > maxDays) {
    console.log('maxDays', maxDays);
    return { age: { years: '--', months: '--', days: '--' }, error: { errorYear: '', errorMonth: '', errorDay: error.errorDay[2] } };
  } else {
    console.log( 'maxDays', maxDays)
  return { age: { years: ageYears, months: ageMonths, days: ageDays }, error: { errorYear: '', errorMonth: '', errorDay: '' } };
  }
};

export default function Home() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState<Age>({ years: 0, months: 0, days: 0 });
  const [error, setError] = useState<Error>({ errorYear: '', errorMonth: '', errorDay: '' });

  const calculateAndSetAge = () => {
    const calculatedAge = calculateAge(year, month, day);
    setAge(calculatedAge.age);
    setError(calculatedAge.error);
  };

  return (
    <main className="flex flex-wrap min-h-screen sm:max-w-screen-sm lg:max-w-screen-lg flex-col items-center justify-start pt-2 m-10 bg-white rounded-tl-[2rem] rounded-tr-[2rem] rounded-bl-[2rem] rounded-br-[10rem]">
      <form className="flex flex-col jusify-center items-center my-10 sm:max-w-screen-sm lg:max-w-screen-lg ">
        <div className="flex gap-1 lg:max-w-screen-lg sm:max-w-screen-sm">
          <div className="flex flex-col justify-center items-start flex-grow max-w-1/3">
            <label htmlFor="Day" className="text-xs uppercase smokey-grey font-bold">
              Day
            </label>
            <input
              type="text"
              id="Day"
              className="border-2 border-gray-300 p-2 rounded-md sm:w-full lg:w-full max-w-[5rem]"
              placeholder="DD"
              onChange={text => setDay(text.target.value)}
            />
            {error.errorDay && <p className="text-red-500 text-xs">{error.errorDay}</p>}
          </div>
          <div className="flex flex-col justify-start items-start flex-grow max-w-1/3">
            <label htmlFor="Month" className="text-xs uppercase smokey-grey font-bold">
              Month
            </label>
            <input
              type="text"
              id="Month"
              className="border-2 border-gray-300 p-2 rounded-md sm:w-full lg:w-full max-w-[5rem]"
              placeholder="MM"
              onChange={text => setMonth(text.target.value)}
            />
            {error.errorMonth && <p className="text-red-500 text-xs">{error.errorMonth}</p>}
          </div>
          <div className="flex flex-col justify-start items-start flex-grow max-w-1/3">
            <label htmlFor="Year" className="text-xs uppercase smokey-grey font-bold">
              Year
            </label>
            <input
              type="text"
              id="Year"
              className="border-2 border-gray-300 p-2 rounded-md sm:w-full lg:w-full max-w-[5rem]"
              placeholder="YYYY"
              onChange={text => setYear(text.target.value)}
            />
            {error.errorYear && <p className="text-red-500 text-xs">{error.errorYear}</p>}
          </div>
        </div>

        <div className="relative flex justify-center items-center w-full border-t border-gray-300 mt-10 pt-4">
          <button
            type="button"
            className="bg-purple text-white font-bold p-2 rounded-full absolute top-1/2 transform -translate-y-1/2"
            onClick={calculateAndSetAge}
          >
            <Image src={Narrow} alt="arrow" />
          </button>
        </div>
      </form>
      <div className="flex flex-col items-start">
        <p className="text-[2rem] font-bold italic"><span className="purple">{age.years}</span> years</p>
        <p className="text-[2rem] font-bold italic"><span className="purple">{age.months}</span> months</p>
        <p className="text-[2rem] font-bold italic"><span className="purple">{age.days}</span> days</p>
      </div>
    </main>
  );
}
