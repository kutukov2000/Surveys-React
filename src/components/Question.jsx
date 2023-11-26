import VariantText from './VariantText';
import VariantRadioButton from './VariantRadioButton';
import VariantCheckBox from './VariantCheckBox';
import VariantDate from './VariantDate';

function Question({ text, variants, questionType }) {
    function checkQuestionType(variant) {
        switch (questionType) {
            case 1: return <VariantRadioButton key={variant.id} text={variant.text} />;
            case 2: return <VariantCheckBox key={variant.id} text={variant.text} />;
            default: return null;
        }
    }

    return (
        <div className="card question w-40">
            <div className="card-body">
                <h5 className="card-title">{text}</h5>
                <div>
                    {questionType === 0 ? (
                        <VariantText/>
                    ) : questionType === 3 ? (
                        <VariantDate/>
                    ) : (
                        variants.$values.map(variant => checkQuestionType(variant))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Question;
