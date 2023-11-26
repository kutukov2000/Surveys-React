function VariantRadioButton(variant) {
    return (
        <div class="input-group">
            <div class="input-group-text">
                <input class="form-check-input mt-0" type="radio"/>
            </div>
            <input type="text" class="form-control" disabled value={variant.text}/>
        </div>
    );
}

export default VariantRadioButton;