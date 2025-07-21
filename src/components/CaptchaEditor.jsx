import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateField, updateFieldValue, refreshCaptchaText, saveForm } from '../features/formSlice';

function CaptchaEditor({ field: propField }) {
    const dispatch = useDispatch();
    const fields = useSelector(state => state.form.fields);
    const captchaField = propField || fields.find(field => field.type === 'captcha');

    const [label, setLabel] = React.useState(captchaField?.label || 'Captcha');
    const [required, setRequired] = React.useState(!!captchaField?.required);

    const canvasRef = useRef(null);
    const captchaCanvasRef = React.useRef(null);

    useEffect(() => {
        if (captchaField && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            drawCaptchaOnCanvas(ctx, captchaField.captchaText);
        }
    }, [captchaField]);

    React.useEffect(() => {
        if (captchaField && captchaCanvasRef.current) {
            const canvas = captchaCanvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
            const letterSpace = 150 / (captchaField.captchaText ? captchaField.captchaText.length : 1);
            for (let i = 0; i < (captchaField.captchaText ? captchaField.captchaText.length : 0); i++) {
                const xInitialSpace = 25;
                ctx.font = '20px Roboto Mono';
                ctx.fillStyle = textColors[Math.floor(Math.random() * 2)];
                ctx.fillText(captchaField.captchaText[i], xInitialSpace + i * letterSpace, Math.floor(Math.random() * 16 + 25), 100);
            }
        }
    }, [captchaField, captchaField?.captchaText]);

    const drawCaptchaOnCanvas = (ctx, captcha) => {
        if (!ctx || !captcha) return;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
        const letterSpace = 150 / captcha.length;
        for (let i = 0; i < captcha.length; i++) {
            const xInitialSpace = 25;
            ctx.font = '20px Roboto Mono';
            ctx.fillStyle = textColors[Math.floor(Math.random() * 2)];
            ctx.fillText(captcha[i], xInitialSpace + i * letterSpace, Math.floor(Math.random() * 16 + 25), 100);
        }
    };

    const handleUserInputChange = (e) => {
        if (captchaField) {
            dispatch(updateFieldValue({ id: captchaField.id, value: e.target.value }));
        }
    };

    const handleCaptchaSubmit = () => {
        if (captchaField && captchaField.value.trim() === captchaField.captchaText) {
            alert('Captcha is correct');
        } else {
            alert('Captcha is incorrect');
            if (captchaField) {
                dispatch(refreshCaptchaText({ fieldId: captchaField.id }));
            }
        }
    };

    const handleLabelChange = (e) => {
        setLabel(e.target.value);
        if (captchaField) {
            dispatch(updateField({
                id: captchaField.id,
                label: e.target.value,
                required,
            }));
        }
    };

    const handleRequiredChange = (e) => {
        setRequired(e.target.checked);
        if (captchaField) {
            dispatch(updateField({
                id: captchaField.id,
                label,
                required: e.target.checked,
            }));
        }
    };

    if (!captchaField) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold text-[#4B49AC] mb-8">Edit Captcha Field</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#4B49AC]">Field Name</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
                        value={label}
                        onChange={handleLabelChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="flex items-center text-[#4B49AC]">
                        <input
                            type="checkbox"
                            className="form-checkbox text-[#7DA0FA] rounded border-[#4B49AC] focus:ring-[#7DA0FA]"
                            checked={required}
                            onChange={handleRequiredChange}
                        />
                        <span className="ml-2">Required</span>
                    </label>
                </div>
                <div className="mb-4 flex items-center">
                    <canvas ref={captchaCanvasRef} width={200} height={70} className="border border-[#4B49AC] mr-2" />
                    <button
                        type="button"
                        onClick={() => dispatch(refreshCaptchaText({ fieldId: captchaField.id }))}
                        className="ml-2 px-3 py-1 bg-[#4B49AC] text-white rounded hover:bg-white hover:text-[#4B49AC] border border-[#4B49AC] transition duration-200"
                    >
                        Reload
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CaptchaEditor;
