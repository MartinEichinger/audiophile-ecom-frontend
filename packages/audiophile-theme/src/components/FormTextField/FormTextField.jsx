/* 
Component: Text Field w/ validation
Version: 0.0.1
Prototyp: 
<FormTextField 
    type = "email/text"
    form_title = "title of field"
    placeholder = "displayed placeholder text"
    warning_title = "text for warning"
    maxText = 100
    minText = 1
    maxNum = 10
    minNum = 1
/>
*/

import React, { useState } from "react";
import { connect, styled } from "frontity";

const FormTextField = ({
  state,
  className,
  type = "text",
  form_title = "Form title",
  placeholder = "Enter text",
  warning_title = "Wrong format",
  maxText = 100,
  minText = 1,
  maxNum = 10,
  minNum = 1,
}) => {
  // States
  const [error, setError] = useState(0);

  // METHOD
  const validate = (type, string) => {
    let result;
    if (type === "email") {
      // validate email
      var re = /\S+@\S+\.\S+/;
      result = re.test(string);
    } else if (type === "text") {
      // validate text
      result = string.length >= minText && string.length <= maxText;
    } else if (type === "number") {
      // validate number
      result =
        !isNaN(string) && string.length <= maxNum && string.length >= minNum;
    }

    // set error / true === valid
    result ? setError("false") : setError("true");
  };

  // FIELDS
  const form_name = "formTextField" + type;

  return (
    <FormGroup className={className + "form-group"} state={state}>
      <div
        className={
          error === "true"
            ? "label d-flex flex-row justify-content-between textred"
            : "label d-flex flex-row justify-content-between"
        }
      >
        <label htmlFor={form_name}>{form_title}</label>
        <small
          id="textFieldHelp"
          className={
            error === "true"
              ? "form-text invalid-feedback content"
              : "form-text invalid-feedback"
          }
        >
          {warning_title}
        </small>
      </div>
      <input
        type={type}
        className={error === "true" ? "borderred form-control" : "form-control"}
        id={form_name}
        aria-describedby="emailHelp"
        placeholder={placeholder}
        onBlur={(e) => validate(type, e.target.value)}
      />
    </FormGroup>
  );
};

export default connect(FormTextField);

// STYLING
const FormGroup = styled.div`
  label,
  small {
    font-size: 12px;
    text-transform: none;
  }

  small {
    font-weight: normal;
    margin: 0;
  }

  .form-control {
    font-size: 14px;
    font-weight: 600;
    padding: 15px 24px;
    border-radius: 8px;
    color: ${({ state }) => state.theme.black};
  }

  .form-control:focus {
    border-color: ${({ state }) => state.theme.brown};
    box-shadow: 0 0 0 0.125rem ${({ state }) => state.theme.brown25};
  }

  .content {
    display: contents;
  }

  .textred {
    color: ${({ state }) => state.theme.warning};
  }

  .borderred {
    border-color: ${({ state }) => state.theme.warning};
  }
`;
