import * as Yup from "yup";
import moment from "moment";
import checkoutFormModel from "./checkoutFormModel";
const {
  formField: { firstName, lastName, RestaurantName, TableNumber },
} = checkoutFormModel;

export default [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
    [RestaurantName.name]: Yup.string().required(
      `${RestaurantName.requiredErrorMsg}`
    ),
  }),
  Yup.object().shape({
    [TableNumber.name]: Yup.number()
      .required(`${TableNumber.requiredErrorMsg}`)
      .min(1, "Min value 1.")
      .max(10, "Max value 10."),
  }),
];

/* [TableNumber.name]: Yup.number()
.required(`${TableNumber.requiredErrorMsg}`)
.min(0, "Min value 0.")
.max(30, "Max value 30."),
*/
