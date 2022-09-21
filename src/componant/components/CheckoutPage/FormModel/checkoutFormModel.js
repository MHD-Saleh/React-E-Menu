export default {
  formId: "checkoutForm",
  name: "test1",
  domain: "test",
  formField: {
    name: {
      name: "firstName",
      label: "First name*",
      requiredErrorMsg: "First name is required",
    },
  },

  formField: {
    TableNumber: {
      name: "TableNumber",
      label: "Table Number*",
      requiredErrorMsg: "Table Number is required",
    },
  },
};

/*export default {
  formId: "checkoutForm",
  formField: {
    firstName: {
      name: "firstName",
      label: "First name*",
      requiredErrorMsg: "First name is required",
    },
    lastName: {
      name: "lastName",
      label: "Last name*",
      requiredErrorMsg: "Last name is required",
    },
    RestaurantName: {
      name: "RestaurantName",
      label: "Restaurant Name*",
      requiredErrorMsg: "Restaurant Name is required",
    },
    TableNumber: {
      name: "TableNumber",
      label: "Table Number*",
      requiredErrorMsg: "Table Number is required",
    },
  },
};
 */
