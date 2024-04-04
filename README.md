# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Frontend Mentor - Age calculator app solution](#frontend-mentor---age-calculator-app-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Screenshot

![image](https://github.com/franclobo/age_calculator/assets/58642949/a9f37cfc-7bf3-4dca-826b-8c767eb5245e)

### Links

- Solution URL: [GitHub](https://github.com/franclobo/age_calculator)
- Live Site URL: [Age calculator](https://age-calculator-khaki-nine.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind](https://tailwindui.com/) - For styles

### What I learned

```js
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
```

### Continued development

I eould like to improve the age calculation function.

## Author

- Website - [WebMinds Studio](https://www.webmindsstudio.com/)
- Frontend Mentor - [@franclobo](https://www.frontendmentor.io/profile/franclobo)
- Twitter - [@Pancho2788](https://twitter.com/Pancho2788)

## Acknowledgments

Thanks to Frontend Mentor for the challenge and the community for the support.

