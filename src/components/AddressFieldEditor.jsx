import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateAddressField, updateFieldLabel } from "../features/formSlice";

// Pre-defined list of countries to avoid API dependency
const COUNTRIES = [
  { name: "Afghanistan", code: "AF" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "Andorra", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Antigua and Barbuda", code: "AG" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Belize", code: "BZ" },
  { name: "Benin", code: "BJ" },
  { name: "Bhutan", code: "BT" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Botswana", code: "BW" },
  { name: "Brazil", code: "BR" },
  { name: "Brunei", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Cabo Verde", code: "CV" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Central African Republic", code: "CF" },
  { name: "Chad", code: "TD" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Colombia", code: "CO" },
  { name: "Comoros", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Costa Rica", code: "CR" },
  { name: "Croatia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Democratic Republic of the Congo", code: "CD" },
  { name: "Denmark", code: "DK" },
  { name: "Djibouti", code: "DJ" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "East Timor", code: "TL" },
  { name: "Ecuador", code: "EC" },
  { name: "Egypt", code: "EG" },
  { name: "El Salvador", code: "SV" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Eritrea", code: "ER" },
  { name: "Estonia", code: "EE" },
  { name: "Eswatini", code: "SZ" },
  { name: "Ethiopia", code: "ET" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "Gabon", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Greece", code: "GR" },
  { name: "Grenada", code: "GD" },
  { name: "Guatemala", code: "GT" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea-Bissau", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haiti", code: "HT" },
  { name: "Honduras", code: "HN" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Ivory Coast", code: "CI" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kiribati", code: "KI" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Laos", code: "LA" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Lesotho", code: "LS" },
  { name: "Liberia", code: "LR" },
  { name: "Libya", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Madagascar", code: "MG" },
  { name: "Malawi", code: "MW" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Mali", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Mauritania", code: "MR" },
  { name: "Mauritius", code: "MU" },
  { name: "Mexico", code: "MX" },
  { name: "Micronesia", code: "FM" },
  { name: "Moldova", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montenegro", code: "ME" },
  { name: "Morocco", code: "MA" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "North Korea", code: "KP" },
  { name: "North Macedonia", code: "MK" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Palestine", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Qatar", code: "QA" },
  { name: "Romania", code: "RO" },
  { name: "Russia", code: "RU" },
  { name: "Rwanda", code: "RW" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "Samoa", code: "WS" },
  { name: "San Marino", code: "SM" },
  { name: "Sao Tome and Principe", code: "ST" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia", code: "RS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Korea", code: "KR" },
  { name: "South Sudan", code: "SS" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Suriname", code: "SR" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syria", code: "SY" },
  { name: "Taiwan", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Togo", code: "TG" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Tuvalu", code: "TV" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Vatican City", code: "VA" },
  { name: "Venezuela", code: "VE" },
  { name: "Vietnam", code: "VN" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" }
];

const AddressFieldEditor = ({ field, onClose }) => {
  const dispatch = useDispatch();
  const [fieldLabel, setFieldLabel] = useState(field?.label || "Address");
  const [addressData, setAddressData] = useState({
    addressLine1: field?.addressLine1 || "",
    addressLine2: field?.addressLine2 || "",
    city: field?.city || "",
    state: field?.state || "",
    postCode: field?.postCode || "",
    country: field?.country || ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  // Filter countries based on search term
  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    console.log('Saving address field:', field.id, 'New label:', fieldLabel);
    
    // Update the field label
    dispatch(updateFieldLabel({ id: field.id, label: fieldLabel }));
    
    // Update all address fields
    Object.keys(addressData).forEach(key => {
      dispatch(updateAddressField({ id: field.id, name: key, value: addressData[key] }));
    });

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showCountryDropdown && !event.target.closest('.country-dropdown')) {
        setShowCountryDropdown(false);
        setSearchTerm("");
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCountryDropdown]);

  return (
    <div className="p-6 bg-white border border-[#4B49AC] rounded-lg shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-[#4B49AC]">Edit Address Field</h2>
      
      {/* Field Label */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC] mb-2">
          Field Label
        </label>
        <input
          type="text"
          value={fieldLabel}
          onChange={(e) => setFieldLabel(e.target.value)}
          placeholder="e.g., Shipping Address, Billing Address"
          className="w-full border border-[#4B49AC] p-2 rounded-md focus:outline-none focus:border-[#7DA0FA] transition-colors"
        />
      </div>
      
      {/* Address Inputs */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#4B49AC] mb-1">Address Line 1</label>
          <input
            type="text"
            placeholder="Address Line 1"
            value={addressData.addressLine1}
            onChange={(e) => setAddressData(prev => ({ ...prev, addressLine1: e.target.value }))}
            className="w-full border border-[#4B49AC] p-2 rounded-md focus:outline-none focus:border-[#7DA0FA] transition-colors"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#4B49AC] mb-1">Address Line 2</label>
          <input
            type="text"
            placeholder="Address Line 2 (Optional)"
            value={addressData.addressLine2}
            onChange={(e) => setAddressData(prev => ({ ...prev, addressLine2: e.target.value }))}
            className="w-full border border-[#4B49AC] p-2 rounded-md focus:outline-none focus:border-[#7DA0FA] transition-colors"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#4B49AC] mb-1">City</label>
            <input
              type="text"
              placeholder="City"
              value={addressData.city}
              onChange={(e) => setAddressData(prev => ({ ...prev, city: e.target.value }))}
              className="w-full border border-[#4B49AC] p-2 rounded-md focus:outline-none focus:border-[#7DA0FA] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4B49AC] mb-1">State</label>
            <input
              type="text"
              placeholder="State"
              value={addressData.state}
              onChange={(e) => setAddressData(prev => ({ ...prev, state: e.target.value }))}
              className="w-full border border-[#4B49AC] p-2 rounded-md focus:outline-none focus:border-[#7DA0FA] transition-colors"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#4B49AC] mb-1">Postal Code</label>
            <input
              type="text"
              placeholder="Postal Code"
              value={addressData.postCode}
              onChange={(e) => setAddressData(prev => ({ ...prev, postCode: e.target.value }))}
              className="w-full border border-[#4B49AC] p-2 rounded-md focus:outline-none focus:border-[#7DA0FA] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#4B49AC] mb-1">Country</label>
            <div className="relative country-dropdown">
              <input
                type="text"
                placeholder="Select Country"
                value={addressData.country}
                onClick={() => setShowCountryDropdown(true)}
                readOnly
                className="w-full border border-[#4B49AC] p-2 rounded-md cursor-pointer focus:outline-none focus:border-[#7DA0FA] transition-colors"
              />
              {showCountryDropdown && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  <input
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border-b border-gray-200 focus:outline-none"
                    autoFocus
                  />
                  <div className="max-h-48 overflow-y-auto">
                    {filteredCountries.map((country) => (
                      <div
                        key={country.code}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setAddressData(prev => ({ ...prev, country: country.name }));
                          setShowCountryDropdown(false);
                          setSearchTerm("");
                        }}
                      >
                        {country.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Save Button */}
      <div className="flex justify-end mt-6 space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-[#4B49AC] text-white rounded-md hover:bg-[#7DA0FA] transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddressFieldEditor; 