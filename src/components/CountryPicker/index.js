import React from "react";
import CountryPicker from "react-native-country-picker-modal";

import styles from "./styles";

export const AppCountryPicker = ({ onSelectCountry, visible, onClose }) => {
  const { useState } = React;
  const [ccode, setCcode] = useState("AE");
  const onSelect = (country) => {
    setCcode(country.cca2);
    onSelectCountry(country?.callingCode);
    console.log("country", country);
  };

  return (
    <CountryPicker
      containerButtonStyle={[styles.container]}
      onSelect={onSelect}
      countryCode={ccode}
      visible={visible}
      onClose={onClose}
      withAlphaFilter={ false }
      withCallingCode={ true }
	  withFilter={ true }
      // translation="eng"
    />
  );
};
