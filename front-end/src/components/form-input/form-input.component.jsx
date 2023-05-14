import { FormInputLabel, Input, Group } from "./form-input.styles";

const FormInput = ({ label, register, errorMessage, ...otherProps }) => {
  return (
    <Group>
      <FormInputLabel>{label}</FormInputLabel>
      <Input {...register} {...otherProps} />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </Group>
  );
};

export default FormInput;
