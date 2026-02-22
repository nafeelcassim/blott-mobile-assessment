import React from "react";
import { Text, TextInput } from "react-native";
import { HttpService, HttpServiceInstance } from "./services";
import { ENV } from "./utils";

// TODO: get the api url from environment, create a config service for this
const httpService = new HttpService(ENV.API_URL || "");

// Disable font scaling globally
(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.allowFontScaling = false;
(Text as any).defaultProps.style = [
  (Text as any).defaultProps.style,
  { fontFamily: "Roboto" },
];

(TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
(TextInput as any).defaultProps.allowFontScaling = false;
(TextInput as any).defaultProps.style = [
  (TextInput as any).defaultProps.style,
  { fontFamily: "Roboto" },
];

HttpServiceInstance.setHttpServiceInstance(httpService);

//@ts-ignore
const originalRender = Text.render;
//@ts-ignore
Text.render = function (...args) {
  const origin = originalRender.call(this, ...args);
  return React.cloneElement(origin, {
    allowFontScaling: false,
    style: [origin.props.style, { fontFamily: "Roboto" }],
  });
};

// Override default TextInput component
//@ts-ignore
const originalTextInputRender = TextInput.render;
//@ts-ignore
TextInput.render = function (...args) {
  const origin = originalTextInputRender.call(this, ...args);
  //@ts-ignore
  return React.cloneElement(origin, {
    allowFontScaling: false,
    style: [origin.props.style, { fontFamily: "Roboto" }],
  });
};
