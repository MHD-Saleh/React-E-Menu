import { Button, Typography } from "@mui/material";
import { fiFI } from "@mui/material/locale";
import React, { useEffect } from "react";
import instance from "../authConfig/axios";
import Reports from "../pages/Reports";

function Daily(props) {
  console.log("tessst : " + JSON.stringify(props.data));
  const [isloading, setisloading] = React.useState(true);

  const [Reportt, setReportt] = React.useState([]);

  const [dataa, setdataa] = React.useState([
    {
      name: "meets",
      type: "area",
      data: [
        10, 5, 7, 1, 3, 8, 2, 3, 5, 8, 9, 7, 5, 10, 5, 7, 1, 3, 8, 2, 3, 5, 8,
        4,
      ],
    },
  ]);

  const GetMounthly = async () => {
    try {
      await instance({
        url: "api/teeest",
        method: "GET",
      })
        .then((res) => {
          setReportt(props.data);
        })
        .then((dat) => {
          console.log("row data : " + JSON.stringify(props.data));
          const unique = [...new Set(props.data.map((item) => item.name))];
          console.log("uniiiiiq : " + unique);

          const filterd_1 = props.data.filter((r) => r.name === unique[0]);
          const filterd_2 = props.data.filter((r) => r.name === unique[1]);
          const filterd_3 = props.data.filter((r) => r.name === unique[2]);
          const first_arr = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ];
          const second_arr = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ];
          const third_arr = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0,
          ];
          console.log("Crispy : " + JSON.stringify(filterd_2));

          const current_1 = filterd_1.map((e) => e.date);
          const current_2 = filterd_2.map((e) => e.date);
          const current_3 = filterd_3.map((e) => e.date);
          //console.log("current");
          // current.map((e) => console.log("date " + moment(e).format("DD")));

          for (let i = 0; i < current_1.length; i++) {
            for (let j = 0; j < first_arr.length; j++) {
              if (parseInt(current_1[i]) === j) {
                first_arr[j - 1] = parseInt(
                  filterd_1.filter((r) => r.date === current_1[i])[0].sum
                );
              }
            }
          }

          for (let i = 0; i < current_2.length; i++) {
            for (let j = 0; j < second_arr.length; j++) {
              if (parseInt(current_2[i]) === j) {
                second_arr[j - 1] = parseInt(
                  filterd_2.filter((r) => r.date === current_2[i])[0].sum
                );
              }
            }
          }

          for (let i = 0; i < current_3.length; i++) {
            for (let j = 0; j < third_arr.length; j++) {
              if (parseInt(current_3[i]) === j) {
                third_arr[j - 1] = parseInt(
                  filterd_3.filter((r) => r.date === current_3[i])[0].sum
                );
              }
            }
          }

          setdataa([
            {
              name: unique[0],
              type: "column",
              data: first_arr,
            },
            {
              name: unique[1],
              type: "area",
              data: second_arr,
            },
            {
              name: unique[2],
              type: "line",
              data: third_arr,
            },
          ]);
          console.log(second_arr);

          setisloading(false);
        });
    } catch (e) {
      console.error(e);
    }
  };
  var data;
  const Getrepo = async () => {
    try {
      await instance({
        url: "api/monthlyReport",
        method: "GET",
      }).then((res) => {
        data = res.data.report;

        setisloading(false);
      });
    } catch (e) {
      console.error(e);
    }
  };

  /*function rr() {
    const filterd_2 = [
      { name: "Shawarma", date: "2022-07-12", qty: "5" },
      { name: "Shawarma", date: "2022-07-13", qty: "10" },
      { name: "Shawarma", date: "2022-07-17", qty: "5" },
    ];

    console.log("second data : " + JSON.stringify(filterd_2));
    const second_arr = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];

    const current = filterd_2.map((e) => e.date);

    current.map((e) => console.log("date " + moment(e).format("DD")));

    console.log(
      "sum : " + filterd_2.filter((r) => r.date === "2022-07-12")[0].qty
    );

    for (let i = 0; i < current.length; i++) {
      for (let j = 0; j < second_arr.length; j++) {
        if (parseInt(moment(current[i]).format("DD")) === j) {
          second_arr[j] = filterd_2.filter((r) => r.date === current[i])[0].qty;
        }
      }
    }
    console.log(second_arr);

    
  }*/
  useEffect(() => {
    // rr();
    Getrepo();
    GetMounthly();
    //testing();
  }, []);

  return (
    <>
      {isloading ? (
        <Typography variant="h3">Loading...</Typography>
      ) : (
        <>
          <Reports CHART_DATA={dataa} />
        </>
      )}
    </>
  );
}

export default Daily;
