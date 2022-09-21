import * as Yup from "yup";
import moment from "moment";
import checkoutFormModel from "./checkoutFormModel";
const {
  formField: { firstName, lastName, name, TableNumber },
} = checkoutFormModel;

export default [
  Yup.object().shape({
    [name]: Yup.string().required("A radio option is required"),
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
