import React from "react";
import styled from "styled-components";

// Styled components
const CardContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
`;

const RadioButton = styled.input`
  margin-right: 8px;
`;

// Functional Component
const Card: React.FC = () => {
  return (
    <CardContainer>
      <CardTitle>Card</CardTitle>
      <div>
        <label>
          <RadioButton type="radio" name="option" value="option1" />
          Option 1
        </label>
      </div>
      <div>
        <label>
          <RadioButton type="radio" name="option" value="option2" />
          Option 2
        </label>
      </div>
      <div>
        <label>
          <RadioButton type="radio" name="option" value="option3" />
          Option 3
        </label>
      </div>
    </CardContainer>
  );
};

export default Card;
