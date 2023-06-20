import Geocode from "react-geocode";

export function getAddress(address) {
  Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API_KEY);
  Geocode.setLanguage("en");

  Geocode.fromAddress(address).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      return { lat, lng };
    },
    (error) => {
      console.error(error);
    }
  );
}
