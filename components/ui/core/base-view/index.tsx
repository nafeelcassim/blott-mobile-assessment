import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
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
  containsList = false,
}) => {
  return (
    <SafeAreaView className={className} edges={edges} style={style}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        {scrollable ? (
          <ScrollView
            className={contentClassName}
            contentInsetAdjustmentBehavior="automatic"
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : containsList ? (
          <View className="flex-1">{children}</View>
        ) : (
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <KeyboardAvoidingView className={contentClassName}>
              {children}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
