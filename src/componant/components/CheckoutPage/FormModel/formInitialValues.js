import checkoutFormModel from "./checkoutFormModel";
const {
  formField: { firstName, lastName, RestaurantName },
} = checkoutFormModel;

export default {
  [firstName.name]: "",
  [lastName.name]: "",
  [RestaurantName.name]: "",
};
