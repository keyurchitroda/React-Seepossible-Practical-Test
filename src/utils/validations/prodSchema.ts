import * as Yup from "yup";
import { VALIDATION_MESSAGES } from "../constants/validationMessages";

export const getProductValidationSchema = () =>
  Yup.object({
    title: Yup.string().required(VALIDATION_MESSAGES.product.titleRequired),

    description: Yup.string().required(
      VALIDATION_MESSAGES.product.descriptionRequired
    ),

    price: Yup.number()
      .typeError(VALIDATION_MESSAGES.product.priceInvalid)
      .required(VALIDATION_MESSAGES.product.priceRequired),

    thumbnail: Yup.string()
      .url(VALIDATION_MESSAGES.product.thumbnailInvalid)
      .required(VALIDATION_MESSAGES.product.thumbnailRequired),
  });
