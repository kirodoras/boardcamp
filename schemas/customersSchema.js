import joi from "joi";

export const cpf = new RegExp(/^\d{11}$/);
export const phone = new RegExp(
  /(?:^\([0]?[1-9]{2}\)|^[0]?[1-9]{2}[\.-\s]?)[9]?[1-9]\d{3}[\.-\s]?\d{4}$/
);
export const birthday = new RegExp(
  /^(19\d{2}|(20[0-2]{2}|20[01]\d))-(0[1-9]|1[0-2])-([1-3]0|[0-2][1-9]|31)$/
);

const customerSchema = joi.object({
  name: joi.string().required(),
  phone: joi.string().min(10).max(11).pattern(phone).required(),
  cpf: joi.string().length(11).pattern(cpf).required(),
  birthday: joi.string().length(10).pattern(birthday).required(),
});

export { customerSchema };
