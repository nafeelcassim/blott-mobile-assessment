import React from "react";
import { Pressable, TextInput, View } from "react-native";
import { PinInputProps } from "./pin-input.types";

export function PinInput({
  value,
  onChange,
  length = 4,
  isDisabled = false,
  onComplete,
  autoFocus = false,
}: PinInputProps) {
  const inputRef = React.useRef<TextInput>(null);

  const filledCount = Math.min(value.length, length);

  const handleChangeText = (text: string) => {
    const next = text.replace(/\D/g, "").slice(0, length);
    onChange(next);
    if (next.length === length) {
      onComplete?.(next);
    }
  };

  React.useEffect(() => {
    if (!autoFocus || isDisabled) return;
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [autoFocus, isDisabled]);

  return (
    <Pressable
      onPress={() => inputRef.current?.focus()}
      disabled={isDisabled}
      className="items-center justify-center"
    >
      <View className="flex-row justify-center gap-12">
        {Array.from({ length }).map((_, idx) => {
          const isFilled = idx < filledCount;
          return (
            <View
              key={idx}
              className={`h-4 w-4 rounded-full border ${
                isFilled
                  ? "bg-black border-black"
                  : "bg-transparent border-gray-400"
              }`}
            />
          );
        })}
      </View>

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChangeText}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        autoCorrect={false}
        caretHidden
        editable={!isDisabled}
        className="absolute opacity-0"
      />
    </Pressable>
  );
}
