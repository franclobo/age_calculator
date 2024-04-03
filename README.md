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

![image](https://github.com/franclobo/age_calculator/assets/58642949/1cc33de4-153e-4339-a690-ce6be4d2fde8)

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
const calculateAge = (year: string, month: string, day: string): { age: Age; error: Error } => {

  const birth = new Date(parseInt(year), parseInt(month), parseInt(day));
  const today = new Date();
  console.log('year', year);
  console.log('month', month);
  console.log('day', day);
  let ageYears = today.getFullYear() - birth.getFullYear();
  let ageMonths = today.getMonth() - birth.getMonth() + 1;
  let ageDays = today.getDate() - birth.getDate();
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
  if (ageDays < 0) {
    ageMonths--;
    const lastMonthDate = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    ageDays = lastMonthDate - birth.getDate() + today.getDate();
  }
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  if (parseInt(day) > 31 && parseInt(month) > 12 && parseInt(year) < today.getFullYear()) {
    return { age: { years: '--', months: '--', days: '--' }, error: { errorYear: '', errorMonth: error.errorMonth[0], errorDay: error.errorDay[0] } };
  }
  if (parseInt(month) === 0 || parseInt(month) > 12 && parseInt(year) < today.getFullYear()) {
    return { age: { years: '--', months: '--', days: '--' }, error: { errorYear: '', errorMonth: error.errorMonth[0], errorDay: '' } };
  }


  
  if(!year || !month || !day) {
    return { age: { years: '--', months: '--', days: '--' }, error: { errorYear: 'This field is required', errorMonth: 'This field is required', errorDay: 'This field is required' } };
  } else if (birth.getFullYear() > today.getFullYear() || birth.getMonth() > 12 || birth.getDate() > 31) {
    return { age: { years: '--', months: '--', days: '--' }, error: { errorYear: error.errorYear[0], errorMonth: error.errorMonth[0], errorDay: error.errorDay[0] } };
  } else if (birth.getDate() > maxDays || parseInt(day) > 31) {
    console.log('maxDays', maxDays);
    return { age: { years: '--', months: '--', days: '--' }, error: { errorYear: '', errorMonth: '', errorDay: error.errorDay[2] } };
  } else {
    console.log( 'maxDays', maxDays)
  return { age: { years: ageYears, months: ageMonths, days: ageDays }, error: { errorYear: '', errorMonth: '', errorDay: '' } };
  }
};
```

### Continued development

I eould like to improve the age calculation function.

## Author

- Website - [WebMinds Studio](https://www.webmindsstudio.com/)
- Frontend Mentor - [@franclobo](https://www.frontendmentor.io/profile/franclobo)
- Twitter - [@Pancho2788](https://twitter.com/Pancho2788)

## Acknowledgments

Thanks to Frontend Mentor for the challenge and the community for the support.

