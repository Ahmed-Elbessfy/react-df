import { ChangeEvent, FC } from "react";
import { RadioChangeEvent, Select } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { DynamicInputConfig } from "./DynamicInput.types";
import { IStyledComponent } from "styled-components";
import {
  StyledErrorMsg,
  StyledDynamicFormInput,
  StyledDynamicTextArea,
  StyledDynamicSelectInput,
  StyledLabel,
  StyledDynamicCheckboxInput,
  StyledDynamicRadioInput,
} from "./DynamicInput.styled";

type InputComponents = {
  [key: string]: IStyledComponent<"web">;
};

const inputComponents: InputComponents = {
  text: StyledDynamicFormInput,
  textarea: StyledDynamicTextArea,
  select: StyledDynamicSelectInput,
  radio: StyledDynamicRadioInput,
  checkbox: StyledDynamicCheckboxInput,
};

const DynamicInput: FC<DynamicInputConfig> = (props) => {
  const { fieldType, name, placeholder, label, id, onChange } = props;
  const hasOptions = ["select", "radio", "checkbox"].includes(fieldType);
  const renderInput = () => {
    if (!props.fieldType || !!inputComponents[props.fieldType]) return null;
    const Component = inputComponents[props.fieldType];
    return <Component {...props} />;
  };
  return (
    <>
      {label && fieldType !== "checkbox" && fieldType !== "radio" && (
        <StyledLabel htmlFor={id}>{label}</StyledLabel>
      )}
      {renderInput()}
      {/* Text & Number input  */}
      {!hasOptions && fieldType !== "textarea" && (
        <StyledDynamicFormInput
          type={fieldType}
          name={name}
          placeholder={placeholder}
          id={id}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.name, e.target.value)
          }
        />
      )}
      {/* Textarea input  */}
      {fieldType === "textarea" && (
        <StyledDynamicTextArea
          name={name}
          placeholder={placeholder}
          id={id}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onChange(e.target.name, e.target.value)
          }
        />
      )}
      {/* Select input  */}
      {fieldType === "select" && (
        <StyledDynamicSelectInput
          placeholder={placeholder}
          id={id}
          onChange={(value: string) => onChange(name, value)}
        >
          {props.options &&
            props.options.map((option, ind) => {
              return (
                <Select.Option key={ind} value={option.value}>
                  {option.label}
                </Select.Option>
              );
            })}
        </StyledDynamicSelectInput>
      )}
      {/* Checkbox input  */}
      {fieldType === "radio" && (
        <fieldset>
          <legend>{label}</legend>
          <StyledDynamicRadioInput
            name={name}
            options={props.options}
            onChange={({ target: { value } }: RadioChangeEvent) =>
              onChange(name, value)
            }
          ></StyledDynamicRadioInput>
        </fieldset>
      )}
      {/* Checkbox input  */}
      {fieldType === "checkbox" && (
        <fieldset>
          <legend>{label}</legend>
          <StyledDynamicCheckboxInput
            options={props.options}
            onChange={(checkedValues: CheckboxValueType[]) =>
              onChange(name, checkedValues)
            }
          ></StyledDynamicCheckboxInput>
        </fieldset>
      )}
      {/* Error message  */}
      <StyledErrorMsg></StyledErrorMsg>
    </>
  );
};

export default DynamicInput;
