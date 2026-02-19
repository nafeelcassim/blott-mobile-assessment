import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BaseViewProps } from "./base-view.types";

export const BaseView: React.FC<BaseViewProps> = ({
  children,
  scrollable = false,
  className = "flex-1 bg-white px-6",
  contentClassName = "flex-1",
  edges = ["bottom", "left", "right"],
  style,
}) => {
  return (
    <SafeAreaView className={className} edges={edges} style={style}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          {scrollable ? (
            <ScrollView
              className={contentClassName}
              contentInsetAdjustmentBehavior="automatic"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {children}
            </ScrollView>
          ) : (
            // View must be a direct child of TouchableWithoutFeedback
            // so we wrap children in a plain View via the `className` prop trick.
            // Using Box from GlueStack also works here.
            <KeyboardAvoidingView className={contentClassName}>
              {children}
            </KeyboardAvoidingView>
          )}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
