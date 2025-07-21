import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateFieldValue, refreshCaptchaText } from '../features/formSlice';
import { validateField, getFieldValidationState } from '../lib/utils';
import SignaturePad from 'react-signature-canvas';
import Rating from '@mui/material/Rating';
import CustomizedSlider from '../components/CustomizedSlider';
import CustomizedRating from './CustomizedRating';
import { TextField, Checkbox, Radio, FormControl, FormLabel, FormControlLabel, FormGroup, RadioGroup, Select, MenuItem, InputLabel, FormHelperText, Box, Typography } from '@mui/material';

const genoa = {
  50: '#f3faf8',
  100: '#d7f0ea',
  200: '#b0dfd6',
  300: '#80c8bd',
  400: '#56aba0',
  500: '#3c9087',
  600: '#2e736d',
  700: '#285d59',
  800: '#244b49',
  900: '#21403e',
  950: '#0f2424',
};

const FormField = ({ field, handleFieldChange, handleDeleteField, handleEditField, showLabel = true, submissionMode = false, readOnly = false }) => {
  const dispatch = useDispatch();
  const [validationState, setValidationState] = useState({ isValid: true, error: null, isDirty: false });
  const sigPadRef = useRef();
  const [spreadsheetRows, setSpreadsheetRows] = useState(field.type === 'spreadsheet' ? (field.rows || [{ data: field.columns ? field.columns.map(() => '') : [] }]) : []);

  // Ensure the field is valid before proceeding
  if (!field || !field.id) {
    console.error('Field is undefined or missing id');
    return null; // Return null if field is not valid
  }

  if (field.type === 'pageBreak') return null;

  // Update validation state when field changes
  useEffect(() => {
    const newValidationState = getFieldValidationState(field);
    setValidationState(newValidationState);
  }, [field.value, field.required, field.maxLength, field.type]);

  // For spreadsheet: keep local state in sync with field.value
  useEffect(() => {
    if (field.type === 'spreadsheet' && Array.isArray(field.value)) {
      setSpreadsheetRows(field.value);
    }
  }, [field.value, field.type]);

  const handleChange = (value) => {
    // Check max length before updating
    if (field.maxLength && value.length > field.maxLength) {
      setValidationState({
        isValid: false,
        error: `Maximum ${field.maxLength} characters allowed (current: ${value.length})`,
        isDirty: true
      });
      return; // Don't update if exceeding max length
    }
    
    dispatch(updateFieldValue({ id: field.id, value }));
    if (handleFieldChange) {
      handleFieldChange(field.id, value);
    }
    // Validate field
    const validation = validateField({ ...field, value });
    setValidationState({
      isValid: validation.isValid,
      error: validation.error,
      isDirty: true
    });
  };

  // Signature handlers
  const handleSignatureEnd = () => {
    if (sigPadRef.current) {
      const dataUrl = sigPadRef.current.getTrimmedCanvas().toDataURL('image/png');
      handleChange(dataUrl);
    }
  };
  const handleClearSignature = () => {
    if (sigPadRef.current) {
      sigPadRef.current.clear();
      handleChange('');
    }
  };

  // Spreadsheet handlers
  const handleSpreadsheetCellChange = (rowIdx, colIdx, value) => {
    const updatedRows = spreadsheetRows.map((row, r) =>
      r === rowIdx ? { ...row, data: row.data.map((cell, c) => (c === colIdx ? value : cell)) } : row
    );
    setSpreadsheetRows(updatedRows);
    handleChange(updatedRows);
  };
  const handleAddSpreadsheetRow = () => {
    const newRow = { data: field.columns ? field.columns.map(() => '') : [] };
    const updatedRows = [...spreadsheetRows, newRow];
    setSpreadsheetRows(updatedRows);
    handleChange(updatedRows);
  };
  const handleRemoveSpreadsheetRow = (rowIdx) => {
    const updatedRows = spreadsheetRows.filter((_, idx) => idx !== rowIdx);
    setSpreadsheetRows(updatedRows);
    handleChange(updatedRows);
  };

  const renderField = () => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phoneNumber':
      case 'date':
        return (
          <TextField
            type={field.type === 'date' ? 'date' : field.type}
            label=""
            value={field.value || ''}
            placeholder={field.placeholder || ''}
            fullWidth
            size="medium"
            margin="normal"
            variant="outlined"
            required={field.required || false}
            inputProps={{ maxLength: field.maxLength || undefined, readOnly: readOnly }}
            onChange={readOnly ? undefined : (e) => handleChange(e.target.value)}
            disabled={readOnly}
            error={validationState.isDirty && !validationState.isValid}
            helperText={validationState.isDirty && !validationState.isValid ? validationState.error : ''}
            sx={{
              background: genoa[50],
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: validationState.isDirty && !validationState.isValid ? '#e57373' : genoa[500],
                },
                '&:hover fieldset': {
                  borderColor: genoa[700],
                },
                '&.Mui-focused fieldset': {
                  borderColor: genoa[700],
                },
              },
            }}
          />
        );
      case 'textarea': {
        const [textValue, setTextValue] = useState(field.value || '');
        const handleTextChange = (e) => {
          setTextValue(e.target.value);
          handleChange(e.target.value);
        };
        const charCount = (field.maxLength && textValue) ? `${textValue.length} / ${field.maxLength}` : '';
        return (
          <Box>
            <TextField
              label=""
              value={field.autoGrow ? textValue : (field.value || '')}
              placeholder={field.placeholder || ''}
              fullWidth
              multiline
              minRows={field.rows || 3}
              maxRows={field.autoGrow ? 10 : undefined}
              required={field.required || false}
              inputProps={{ maxLength: field.maxLength || undefined, readOnly: readOnly }}
              onChange={readOnly ? undefined : (field.autoGrow ? handleTextChange : (e) => handleChange(e.target.value))}
              onInput={field.autoGrow && !readOnly ? (e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; } : undefined}
              disabled={readOnly}
              error={validationState.isDirty && !validationState.isValid}
              helperText={validationState.isDirty && !validationState.isValid ? validationState.error : ''}
              sx={{
                background: genoa[50],
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: validationState.isDirty && !validationState.isValid ? '#e57373' : genoa[500],
                  },
                  '&:hover fieldset': {
                    borderColor: genoa[700],
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: genoa[700],
                  },
                },
              }}
            />
            {charCount && <Typography variant="caption" color={genoa[700]} sx={{ display: 'block', textAlign: 'right', mt: 0.5 }}>{charCount}</Typography>}
          </Box>
        );
      }
      case 'checkbox':
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={!!field.value}
                onChange={readOnly ? undefined : (e) => handleChange(e.target.checked)}
                disabled={readOnly}
                sx={{
                  color: genoa[500],
                  '&.Mui-checked': { color: genoa[700] },
                }}
              />
            }
            label={<Typography color={genoa[800]}>{field.label}</Typography>}
          />
        );
      case 'optionGroup':
        return (
          <FormControl component="fieldset" sx={{ my: 2 }}>
            <FormLabel component="legend" sx={{ color: genoa[900], fontWeight: 600 }}>{field.label}</FormLabel>
            <RadioGroup
              row={false}
              name={field.id}
              value={field.value || ''}
              onChange={readOnly ? undefined : (e) => handleChange(e.target.value)}
            >
              {field.options && field.options.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.value}
                  control={<Radio sx={{ color: genoa[500], '&.Mui-checked': { color: genoa[700] } }} />}
                  label={<Typography color={genoa[800]}>{option.value}</Typography>}
                  disabled={readOnly}
                />
              ))}
            </RadioGroup>
            {validationState.isDirty && !validationState.isValid && (
              <FormHelperText error>{validationState.error}</FormHelperText>
            )}
          </FormControl>
        );
      case 'dropdown':
        return (
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel sx={{ color: genoa[900] }}>{field.label}</InputLabel>
            <Select
              value={field.value || ''}
              label={field.label}
              onChange={readOnly ? undefined : (e) => handleChange(e.target.value)}
              disabled={readOnly}
              sx={{
                background: genoa[50],
                borderRadius: 2,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: validationState.isDirty && !validationState.isValid ? '#e57373' : genoa[500],
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: genoa[700],
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: genoa[700],
                },
              }}
              error={validationState.isDirty && !validationState.isValid}
            >
              <MenuItem value=""><em>Select an option</em></MenuItem>
              {field.options && field.options.map((option) => (
                <MenuItem key={option.id} value={option.value}>{option.value}</MenuItem>
              ))}
            </Select>
            {validationState.isDirty && !validationState.isValid && (
              <FormHelperText error>{validationState.error}</FormHelperText>
            )}
          </FormControl>
        );
      case 'fileUpload':
        if (readOnly) {
          // Always try to render as image, fallback to link if error
          if (field.value) {
            return (
              <div className="mt-2">
                <img 
                  src={field.value} 
                  alt="Uploaded" 
                  style={{ maxWidth: 200, maxHeight: 200, borderRadius: 8, border: '1px solid #eee', display: 'block' }}
                  onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                />
                <div className="text-xs text-green-600 mt-1" style={{ display: 'none' }}>
                  <a href={field.value} target="_blank" rel="noopener noreferrer">View File</a>
                </div>
              </div>
            );
          } else {
            return (
              <div className="text-xs text-gray-400 mt-1">No file uploaded</div>
            );
          }
        }
        // File upload state
        const [uploading, setUploading] = useState(false);
        const [uploadError, setUploadError] = useState(null);
        const [uploadedUrl, setUploadedUrl] = useState(field.value || '');

        const handleFileUpload = async (file) => {
          setUploading(true);
          setUploadError(null);
          try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload`, {
              method: 'POST',
              body: formData
            });
            if (!res.ok) throw new Error('Upload failed');
            const data = await res.json();
            setUploadedUrl(data.url || data.path || '');
            handleChange(data.url || data.path || '');
          } catch (err) {
            setUploadError('File upload failed');
          } finally {
            setUploading(false);
          }
        };

        return (
          <div>
            <input
              type="file"
              className="mt-2"
              required={field.required || false}
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
            {uploading && <div className="text-xs text-blue-600 mt-1">Uploading...</div>}
            {uploadError && <div className="text-xs text-red-600 mt-1">{uploadError}</div>}
            {uploadedUrl && (
              <div className="text-xs text-green-600 mt-1">File uploaded: <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">View File</a></div>
            )}
          </div>
        );

      case 'secretText':
        return (
          <TextField
            label=""
            value={field.value || ''}
            placeholder={field.placeholder || ''}
            fullWidth
            multiline
            rows={3}
            required={field.required || false}
            onChange={(e) => handleChange(e.target.value)}
            sx={{
              background: genoa[50],
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: validationState.isDirty && !validationState.isValid ? '#e57373' : genoa[500],
                },
                '&:hover fieldset': {
                  borderColor: genoa[700],
                },
                '&.Mui-focused fieldset': {
                  borderColor: genoa[700],
                },
              },
            }}
          />
        );

      case 'orderTitle':
        return (
          <div>
            <TextField
              label=""
              value={field.value || ''}
              placeholder={field.placeholder || ''}
              fullWidth
              required={field.required || false}
              onChange={(e) => {
                const value = e.target.value;
                // Enforce max length
                if (field.maxLength && value.length > field.maxLength) {
                  return; // Don't update if exceeding max length
                }
                handleChange(value);
              }}
              sx={{
                fontWeight: field.isBold ? 'bold' : 'normal',
                fontStyle: field.isItalic ? 'italic' : 'normal',
                color: field.textColor || '#374151'
              }}
            />
            {field.maxLength && (
              <div className={`text-xs mt-1 ${field.value && field.value.length > field.maxLength ? 'text-red-500' : 'text-gray-500'}`}>
                {field.value ? field.value.length : 0} / {field.maxLength} characters
                {field.value && field.value.length > field.maxLength && (
                  <span className="ml-2">⚠️ Character limit exceeded</span>
                )}
              </div>
            )}
          </div>
        );

      case 'spreadsheet':
        // Use value from formData if present, else fallback to field.rows
        const spreadsheetValue = Array.isArray(field.value) ? field.value : (field.rows || []);
        return (
          <div className="overflow-x-auto border-2 border-[#4B49AC] rounded-lg p-4 bg-[#F3F4F6]">
            {field.columns && field.columns.length > 0 ? (
              <table className="min-w-full border border-[#4B49AC] rounded bg-white">
                <thead>
                  <tr className="bg-[#F3F4F6] text-[#4B49AC]">
                    {field.columns.map((col, idx) => (
                      <th key={idx} className="p-2 border">{col.name}</th>
                    ))}
                    {!submissionMode && <th className="p-2 border">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {spreadsheetValue.length > 0 ? spreadsheetValue.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.data.map((cell, cIdx) => (
                        <td key={cIdx} className="p-2 border text-gray-700">
                          <input
                            type="text"
                            className="w-full border border-[#4B49AC] rounded px-1 py-1"
                            value={cell}
                            onChange={e => handleSpreadsheetCellChange(rIdx, cIdx, e.target.value)}
                          />
                        </td>
                      ))}
                      {!submissionMode && (
                        <td className="p-2 border text-center">
                          <button type="button" onClick={() => handleRemoveSpreadsheetRow(rIdx)} className="text-red-500 hover:underline">Remove</button>
                        </td>
                      )}
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={field.columns.length + (submissionMode ? 0 : 1)} className="p-2 text-center text-gray-400">No data added yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <div className="text-gray-400">No columns defined</div>
            )}
            {!submissionMode && (
              <button type="button" onClick={handleAddSpreadsheetRow} className="mt-2 bg-[#4B49AC] text-white px-4 py-2 rounded hover:bg-[#7DA0FA]">Add Row</button>
            )}
          </div>
        );

      case 'signature':
        if (readOnly) {
          // Only show the signature image, not the pad
          return (
            <div>
              {field.value && typeof field.value === 'string' && field.value.startsWith('data:image') ? (
                <img src={field.value} alt="Signature" className="max-h-32 border rounded bg-white p-2 mb-2" />
              ) : (
                <div className="text-xs text-gray-400 mt-1">No signature provided</div>
              )}
            </div>
          );
        }
        return (
          <div>
            {field.value && typeof field.value === 'string' && field.value.startsWith('data:image') ? (
              <img src={field.value} alt="Signature" className="max-h-32 border rounded bg-white p-2 mb-2" />
            ) : null}
            <SignaturePad
              ref={sigPadRef}
              penColor="#4B49AC"
              canvasProps={{
                width: 400,
                height: 120,
                className: 'border-2 border-[#4B49AC] rounded-lg bg-white mb-2'
              }}
              onEnd={handleSignatureEnd}
            />
            <div className="flex gap-2 mt-2">
              <button type="button" onClick={handleClearSignature} className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400">Clear</button>
            </div>
          </div>
        );

      case 'dropzone':
        return (
          <div className="border-2 border-[#4B49AC] rounded-lg p-4 bg-[#F3F4F6]">
            {field.files && field.files.length > 0 ? (
              <div>
                <div className="text-sm text-gray-600 mb-2">
                  {field.files.length} file(s) uploaded
                </div>
                {field.files.map((file, index) => (
                  <div key={index} className="text-xs text-blue-600 hover:underline cursor-pointer">
                    {file.split('/').pop() || file}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-center py-4">
                {field.required ? 'Files required' : 'Drop files here or click to upload'}
              </div>
            )}
          </div>
        );

      case 'address':
        const addressValue = field.value || {};
        const handleAddressChange = (key, val) => {
          const updated = { ...addressValue, [key]: val };
          handleChange(updated);
        };
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Address Line 1</label>
              <input
                type="text"
                className="mt-1 block w-full border-2 rounded-lg bg-[#F3F4F6] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
                value={addressValue.addressLine1 || ''}
                onChange={e => handleAddressChange('addressLine1', e.target.value)}
                placeholder="Address Line 1"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Address Line 2</label>
              <input
                type="text"
                className="mt-1 block w-full border-2 rounded-lg bg-[#F3F4F6] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
                value={addressValue.addressLine2 || ''}
                onChange={e => handleAddressChange('addressLine2', e.target.value)}
                placeholder="Address Line 2"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">City</label>
              <input
                type="text"
                className="mt-1 block w-full border-2 rounded-lg bg-[#F3F4F6] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
                value={addressValue.city || ''}
                onChange={e => handleAddressChange('city', e.target.value)}
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">State</label>
              <input
                type="text"
                className="mt-1 block w-full border-2 rounded-lg bg-[#F3F4F6] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
                value={addressValue.state || ''}
                onChange={e => handleAddressChange('state', e.target.value)}
                placeholder="State"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Post Code</label>
              <input
                type="text"
                className="mt-1 block w-full border-2 rounded-lg bg-[#F3F4F6] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
                value={addressValue.postCode || ''}
                onChange={e => handleAddressChange('postCode', e.target.value)}
                placeholder="Post Code"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Country</label>
              <input
                type="text"
                className="mt-1 block w-full border-2 rounded-lg bg-[#F3F4F6] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
                value={addressValue.country || ''}
                onChange={e => handleAddressChange('country', e.target.value)}
                placeholder="Country"
              />
            </div>
          </div>
        );

      case 'texteditor':
        return (
          <div className="border-2 border-[#4B49AC] rounded-lg p-4 bg-[#F3F4F6]">
            <div dangerouslySetInnerHTML={{ __html: field.value || '' }} />
          </div>
        );

      case 'captcha':
        // Captcha as canvas
        const captchaCanvasRef = React.useRef(null);
        React.useEffect(() => {
          if (field.captchaText && captchaCanvasRef.current) {
            const canvas = captchaCanvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
            const letterSpace = 150 / field.captchaText.length;
            for (let i = 0; i < field.captchaText.length; i++) {
              const xInitialSpace = 25;
              ctx.font = '20px Roboto Mono';
              ctx.fillStyle = textColors[Math.floor(Math.random() * 2)];
              ctx.fillText(field.captchaText[i], xInitialSpace + i * letterSpace, Math.floor(Math.random() * 16 + 25), 100);
            }
          }
        }, [field.captchaText]);
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="mb-2 flex items-center">
              <canvas ref={captchaCanvasRef} width={200} height={70} className="border border-[#4B49AC] mr-2" />
              <button
                type="button"
                onClick={() => dispatch(refreshCaptchaText({ fieldId: field.id }))}
                className="ml-2 px-3 py-1 bg-[#4B49AC] text-white rounded hover:bg-white hover:text-[#4B49AC] border border-[#4B49AC] transition duration-200"
              >
                Reload
              </button>
            </div>
            <input
              type="text"
              className="mt-1 block w-full border-2 rounded-lg bg-[#F3F4F6] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
              value={field.value || ''}
              placeholder="Enter the captcha text"
              required={field.required || false}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
        );

      case 'rating':
        return (
          <CustomizedRating field={field} />
        );

      case 'slider':
        return (
          <div className="mb-2">
            <label className="block text-sm font-medium text-[#4B49AC] mb-1">{field.label}</label>
            {submissionMode ? (
              <CustomizedSlider field={field} />
            ) : (
              <div className="text-lg">Slider Value: {field.value || 0}</div>
            )}
          </div>
        );

      case 'datetime':
        return (
          <div className="border-2 border-[#4B49AC] rounded-lg p-4 bg-[#F3F4F6]">
            <div className="text-lg">
              Date & Time: {field.value || 'Not set'}
            </div>
          </div>
        );

      case 'divider':
        const dividerStyle = {
          border: 'none',
          height: field?.height || '1px',
          width: field?.width || '100%',
          backgroundColor: field?.color || '#000000',
          borderTop: `${field?.thickness || 1}px ${field?.style || 'solid'} ${field?.color || '#000000'}`,
          margin: field?.margin || '10px 0',
        };
        return (
          <div>
            <div style={dividerStyle} />
            {field.label && (
              <div className="text-center font-medium mt-2" style={{ color: field?.color || '#4B49AC' }}>
                {field.label}
              </div>
            )}
          </div>
        );

      default:
        return (
          <input
            type="text"
            className="mt-1 block w-full border-2 rounded-lg bg-[#F3F4F6] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
            value={field.value || ''}
            placeholder={field.placeholder || ''}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
    }
  };

  // Handle readOnly display mode for all field types
  if (readOnly) {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phoneNumber':
      case 'date':
        return (
          <div className="w-full">
            {showLabel && <label className="block text-sm font-medium text-[#4B49AC] mb-1">{field.label}</label>}
            <div
              className="w-full block px-3 py-2 border border-[#4B49AC] rounded bg-[#F3F4F6] text-gray-800"
              style={{ minHeight: '40px', fontSize: '1rem', width: '100%', boxSizing: 'border-box' }}
            >
              {field.value || <span className="text-gray-400">—</span>}
            </div>
          </div>
        );
      case 'textarea':
        return (
          <div className="w-full">
            {showLabel && <label className="block text-sm font-medium text-[#4B49AC] mb-1">{field.label}</label>}
            <div
              className="w-full block px-3 py-2 border border-[#4B49AC] rounded bg-[#F3F4F6] text-gray-800"
              style={{ minHeight: '60px', whiteSpace: 'pre-wrap', fontSize: '1rem', width: '100%', boxSizing: 'border-box' }}
            >
              {field.value || <span className="text-gray-400">—</span>}
            </div>
          </div>
        );
      case 'dropdown':
        return (
          <div className="w-full">
            {showLabel && <label className="block text-sm font-medium text-[#4B49AC] mb-1">{field.label}</label>}
            <div
              className="w-full block px-3 py-2 border border-[#4B49AC] rounded bg-[#F3F4F6] text-gray-800"
              style={{ minHeight: '40px', fontSize: '1rem', width: '100%', boxSizing: 'border-box' }}
            >
              {field.value || <span className="text-gray-400">—</span>}
            </div>
          </div>
        );
      case 'optionGroup':
        return (
          <div className="w-full">
            {showLabel && <label className="block text-sm font-medium text-[#4B49AC] mb-1">{field.label}</label>}
            <div className="space-y-2 w-full">
              {field.options && field.options.map(option => (
                <div key={option.id} className="flex items-center w-full">
                  <span className={`inline-block w-4 h-4 rounded-full border-2 mr-2 ${field.value === option.value ? 'bg-[#4B49AC] border-[#4B49AC]' : 'border-[#4B49AC] bg-white'}`}></span>
                  <span className={field.value === option.value ? 'font-bold text-[#4B49AC]' : ''}>{option.value}</span>
                </div>
              ))}
            </div>
          </div>
        );
      case 'checkbox':
        return (
          <div className="w-full flex items-center">
            <span className={`inline-block w-4 h-4 rounded border-2 mr-2 ${field.value ? 'bg-[#4B49AC] border-[#4B49AC]' : 'border-[#4B49AC] bg-white'}`}></span>
            <span className={field.value ? 'font-bold text-[#4B49AC]' : ''}>{field.label}</span>
          </div>
        );
      case 'fileUpload':
        return field.value ? (
          <div className="text-xs text-green-600 mt-1 w-full block">File uploaded: <a href={field.value} target="_blank" rel="noopener noreferrer">View File</a></div>
        ) : (
          <div className="text-xs text-gray-400 mt-1 w-full block">No file uploaded</div>
        );
      // Add more custom field types as needed (address, rating, etc.)
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        my: 2,
        p: 0,
        borderRadius: 0,
        background: 'none',
        boxShadow: 'none',
        transition: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      {showLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {renderField()}
      
      {/* Validation Error Display */}
      {validationState.isDirty && !validationState.isValid && (
        <div className="text-red-500 text-xs mt-1 flex items-center">
          <span className="mr-1">⚠️</span>
          {validationState.error}
        </div>
      )}
      
      {/* Character Counter for fields with maxLength */}
      {field.maxLength && field.type !== 'orderTitle' && (
        <div className={`text-xs mt-1 ${field.value && field.value.length > field.maxLength ? 'text-red-500' : 'text-gray-500'}`}>
          {field.value ? field.value.length : 0} / {field.maxLength} characters
        </div>
      )}
    </Box>
  );
};

export default FormField; 