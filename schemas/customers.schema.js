import joi from "joi";

const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().min(10).max(11).required(),
  cpf: joi.string().length(11).required(),
  birthday: joi.string().validate(dateFormat, date).required(),
});

export { customerSchema };
