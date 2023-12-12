import { Link } from "react-router-dom";
import "./style.css";

export const HeaderBeforeLogin = () => {
  // const handleValueReturn = (n: any) => {
  //   // switch (n) {
  //   //   case (n % 3 && n % 5) === 0:
  //   //     console.log("FizzBuzz");
  //   //     break;
  //   //   case n % 3 === 0:
  //   //     console.log("Fizz");
  //   //     break;
  //   //   case n % 5 === 0:
  //   //     console.log("Buzz");
  //   //     break;
  //   //   case (n % 3 && n % 5) !== 0:
  //   //     console.log(n);
  //   //     break;
  //   // }
  //   if ((n % 3 && n % 5) === 0) {
  //     console.log("FizzBuzz");
  //   }
  //   if (n % 5 === 0) {
  //     console.log("Fizz");
  //   }
  // };

  // // handleValueReturn(100);

  // const arr = [1, 2, 3, 5, 3, 2, 3];

  // let sum = 0;

  const bigArr = [1000000001, 1000000002, 1000000003, 1000000004, 1000000005];

  let sum = 0;

  for (let i = 0; i < bigArr.length; i++) {
    sum += bigArr[i];
    console.log("sum", sum);
  }
  return sum;

  // const handleSumArr = (arr: any) => {
  //   for (let i = 0; i < arr.length; i++) {
  //     sum += arr[i];
  //   }
  //   console.log(sum);
  //   return sum;
  // };

  // console.log(handleSumArr(arr));

  // const arrBob = [1, 2, 3, 5, 2, 10];
  // const arrAlice = [2, 2, 1, 1, 3, 9];

  // const handleCompareArr = (a: any, b: any) => {
  //   let scoreAlice = 0;
  //   let scoreBob = 0;
  //   a.forEach((num1: any, index: any) => {
  //     let num2 = b[index];
  //     if (num1 === num2) {
  //       return;
  //     } else if (num2 > num1) {
  //       scoreAlice++;
  //     } else if (num1 > num2) {
  //       scoreBob += 1;
  //     }
  //   });
  //   console.log("scoreAlice", scoreAlice);
  //   console.log("scoreBob", scoreBob);
  //   console.log([scoreAlice, scoreBob]);

  //   return [scoreAlice, scoreBob];
  // };

  // handleCompareArr(arrBob, arrAlice);

  return (
    <div className="header">
      <Link to="/" className="header-logo">
        BlogReact
      </Link>
      <div className="header-method">
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#c2bbbb",
            padding: "0px 10px 0px 0px",
            fontWeight: "400",
            marginTop: "8px",
          }}
        >
          Home
        </Link>
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            color: "#c2bbbb",
            padding: "0px 10px 0px 0px",
            fontWeight: "400",
            marginTop: "8px",
          }}
        >
          Sign in
        </Link>
        <Link
          to="/register"
          style={{
            textDecoration: "none",
            color: "#c2bbbb",
            padding: "0px 10px 0px 0px",
            fontWeight: "400",
            marginTop: "8px",
          }}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};
