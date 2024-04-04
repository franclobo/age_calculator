'use client';
import React, { useState } from 'react';
import Image from "next/image";
import Narrow from "../public/assets/images/icon-arrow.svg";
import calculateAge, { Age, Error } from '@/lib/calculateAge';

export default function Home() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState<Age>({ years: '--', months: '--', days: '--' });
  const [error, setError] = useState<Error>({ errorYear: '', errorMonth: '', errorDay: '' });

  const calculateAndSetAge = () => {
    const calculatedAge = calculateAge(year, month, day);
    setAge(calculatedAge.age);
    setError(calculatedAge.error);
  };

  return (
    <main className="flex flex-wrap flex-col items-center justify-start pt-2 pb-10 px-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-tl-[2rem] rounded-tr-[2rem] rounded-bl-[2rem] rounded-br-[7rem] xl:rounded-br-[10rem]">
      <form className="flex flex-col jusify-center xl:items-start items-center my-10 sm:max-w-screen-sm xl:w-full xl:py-10 ">
        <div className="flex xl:justify-start gap-1 xl:gap-4 sm:max-w-screen-sm">
          <div className="flex flex-col justify-center items-start flex-grow max-w-1/3">
            <label htmlFor="Day" className={`text-xs uppercase font-bold ${error.errorDay ? 'light-red' : 'smokey-grey'}`}>
              Day
            </label>
            <input
              type="text"
              id="Day"
              className={`border-2 p-2 rounded-md sm:w-full xl:w-full xl:max-w-[8rem] max-w-[5rem] ${error.errorDay ? 'border-light-red' : 'border-gray-300'}`}
              placeholder="DD"
              onChange={text => setDay(text.target.value)}
            />
            {error.errorDay && <p className="text-red-500 text-xs">{error.errorDay}</p>}
          </div>
          <div className="flex flex-col justify-start items-start flex-grow max-w-1/3">
            <label htmlFor="Month" className={`text-xs uppercase font-bold ${error.errorMonth || error.errorDay ? 'light-red' : 'smokey-grey'}`}>
              Month
            </label>
            <input
              type="text"
              id="Month"
              className={`border-2 border-gray-300 p-2 rounded-md sm:w-full xl:w-full xl:max-w-[8rem] max-w-[5rem] ${error.errorMonth || error.errorDay ? 'border-light-red' : 'border-gray-300'}`}
              placeholder="MM"
              onChange={text => setMonth(text.target.value)}
            />
            {error.errorMonth && <p className="text-red-500 text-xs">{error.errorMonth}</p>}
          </div>
          <div className="flex flex-col justify-start items-start flex-grow max-w-1/3">
            <label htmlFor="Year" className={`text-xs uppercase font-bold ${error.errorYear || error.errorDay ? 'light-red' : 'smokey-grey'}`}>
              Year
            </label>
            <input
              type="text"
              id="Year"
              className={`border-2 border-gray-300 p-2 rounded-md sm:w-full xl:w-full xl:max-w-[8rem] max-w-[5rem] ${error.errorYear || error.errorDay ? 'border-light-red' : 'border-gray-300'}`}
              placeholder="YYYY"
              onChange={text => setYear(text.target.value)}
            />
            {error.errorYear && <p className="text-red-500 text-xs">{error.errorYear}</p>}
          </div>
        </div>

        <div className="relative flex justify-center items-center w-full border-t border-gray-300 mt-10 pt-4">
          <button
            type="button"
            className="bg-purple text-white font-bold p-2 rounded-full absolute top-1/2 transform -translate-y-1/2 xl:right-0"
            onClick={calculateAndSetAge}
          >
            <Image src={Narrow} alt="arrow" />
          </button>
        </div>
      </form>
      <div className="flex flex-col items-start">
        <h1 className="text-[2rem] xl:text-8xl font-bold italic"><span className="purple">{age.years}</span> years</h1>
        <p className="text-[2rem] xl:text-8xl font-bold italic"><span className="purple">{age.months}</span> months</p>
        <p className="text-[2rem] xl:text-8xl font-bold italic"><span className="purple">{age.days}</span> days</p>
      </div>
    </main>
  );
}
