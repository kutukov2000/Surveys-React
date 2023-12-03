export default class QuestionTypes {

    static getTypeByText(type) {
        switch (type) {
            case 'RadioButton': return 1;
            case 'CheckBox': return 2;
            case 'Date': return 3;
            case 'Text':
            default: return 0;
        }
    }

    static getTypeByNumber(typeNumber) {
        switch (typeNumber) {
            case 0: return 'Text';
            case 1: return 'RadioButton';
            case 2: return 'CheckBox';
            case 3: return 'Date';
            default: return null;
        }
    }
}