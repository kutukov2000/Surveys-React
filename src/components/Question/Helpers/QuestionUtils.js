import QuestionTypesEnum from "./QuestionTypes";

export function getType(type) {
    switch (type) {
        case 'RadioButton': return QuestionTypesEnum.RadioButton;
        case 'CheckBox': return QuestionTypesEnum.CheckBox;
        case 'Date': return QuestionTypesEnum.Date;
        case 'Text':
        default: return QuestionTypesEnum.Text;
    }
}

export function getTypeByNumber(typeNumber) {
    switch (typeNumber) {

        case QuestionTypesEnum.RadioButton: return 'RadioButton';
        case QuestionTypesEnum.CheckBox: return 'CheckBox';
        case QuestionTypesEnum.Date: return 'Date';
        case QuestionTypesEnum.Text:
        default: return 'Text';
    }
}
