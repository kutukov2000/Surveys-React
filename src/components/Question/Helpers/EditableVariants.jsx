import React, { useState } from 'react';
import { Button, Input, RadioGroup, CheckboxGroup, Radio, Checkbox } from "@nextui-org/react";

function EditableVariants({ questionType, variants, addVariant, removeVariant, handleVariantChange }) {

  //Set input color to danger if input is null
  const [inputColors, setInputColors] = useState(variants.map(() => ''));
  const handleInputChange = (id, value, index) => {
    handleVariantChange(id, value);

    const updatedColors = [...inputColors];
    updatedColors[index] = value.trim() === '' ? 'danger' : '';
    setInputColors(updatedColors);
  };

  return (
    <div>
      {questionType === 'RadioButton' && (
        <RadioGroup>
          {variants.map(({ text: variantText, id }, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center gap-2">
              <Radio value='' isDisabled={true} key={id} />
              <Input
                className="w-100"
                size='sm'
                type="text"
                value={variantText}
                isRequired
                color={inputColors[index]}
                onChange={(e) => handleInputChange(id, e.target.value, index)} />
              <Button onClick={() => removeVariant(id)} isIconOnly >❌</Button>
            </div>
          ))}
        </RadioGroup>
      )}

      {questionType === 'CheckBox' && (
        <CheckboxGroup>
          {variants.map(({ text: variantText, id }, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center gap-2">
              <Checkbox key={id} isDisabled={true} />
              <Input
                className="w-100"
                size='sm'
                type="text"
                value={variantText}
                isRequired
                color={inputColors[index]}
                onChange={(e) => handleInputChange(id, e.target.value, index)} />
              <Button onClick={() => removeVariant(id)} isIconOnly >❌</Button>
            </div>
          ))}
        </CheckboxGroup>
      )}
      {(questionType === 'CheckBox' || questionType === 'RadioButton') && (
        <Button className="mt-3" onClick={addVariant} variant="ghost" size="sm">Add variant</Button>
      )}
    </div>
  );
}

export default EditableVariants;
