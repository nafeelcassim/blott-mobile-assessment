import { BaseView } from "@/components/ui/core/base-view";
import { Button, ButtonText } from "@/components/ui/core/button";
import { EyeIcon, EyeOffIcon } from "@/components/ui/core/icon";
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from "@/components/ui/core/input";
import { PreLoginTitle } from "@/components/ui/title";
import { RegisterInput, registerSchema } from "@/validations/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterInput) => {
    console.log("register", values);
    router.navigate("/set-pin");
  };

  return (
    <BaseView edges={["bottom", "left", "right"]}>
      <View className="flex-1 justify-between">
        <View>
          <PreLoginTitle
            title="Introduce yourself"
            description="We need to know a bit about you to get you up and running."
          />

          <View className="mt-6 gap-4">
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Full Name"
                  isRequired
                  isInvalid={Boolean(errors.fullName)}
                  errorText={errors.fullName?.message}
                >
                  <InputField
                    placeholder="Enter your full name"
                    autoCapitalize="words"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                </Input>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email"
                  isRequired
                  isInvalid={Boolean(errors.email)}
                  errorText={errors.email?.message}
                >
                  <InputField
                    placeholder="Enter your email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                </Input>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Password"
                  isRequired
                  isInvalid={Boolean(errors.password)}
                  errorText={errors.password?.message}
                >
                  <InputField
                    placeholder="Create a password"
                    secureTextEntry={!showPassword}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                  <InputSlot
                    className="pr-2"
                    onPress={() => setShowPassword((prev) => !prev)}
                  >
                    <InputIcon as={showPassword ? EyeOffIcon : EyeIcon} />
                  </InputSlot>
                </Input>
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Confirm Password"
                  isRequired
                  isInvalid={Boolean(errors.confirmPassword)}
                  errorText={errors.confirmPassword?.message}
                >
                  <InputField
                    placeholder="Confirm your password"
                    secureTextEntry={!showConfirmPassword}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                  <InputSlot
                    className="pr-2"
                    onPress={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    <InputIcon
                      as={showConfirmPassword ? EyeOffIcon : EyeIcon}
                    />
                  </InputSlot>
                </Input>
              )}
            />
          </View>
        </View>

        <View className="pt-6">
          <Button
            action="primary"
            variant="solid"
            size="lg"
            isDisabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          >
            <ButtonText>Create account</ButtonText>
          </Button>
        </View>
      </View>
    </BaseView>
  );
}
