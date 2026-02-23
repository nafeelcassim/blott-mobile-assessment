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
import { TEXT } from "@/constants";
import { useRegisterScreen } from "@/hooks";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";

export default function RegisterScreen() {
  const {
    control,
    errors,
    isSubmitting,
    showPassword,
    showConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    submit,
  } = useRegisterScreen();

  return (
    <BaseView edges={["bottom", "left", "right"]}>
      <View className="flex-1 justify-between mt-2">
        <View>
          <PreLoginTitle
            title={TEXT.auth.register.title}
            description={TEXT.auth.register.description}
          />

          <View className="mt-6 gap-4">
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={TEXT.auth.register.fullNameLabel}
                  isRequired
                  isInvalid={Boolean(errors.fullName)}
                  errorText={errors.fullName?.message}
                >
                  <InputField
                    placeholder={TEXT.auth.register.fullNamePlaceholder}
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
                  label={TEXT.auth.register.emailLabel}
                  isRequired
                  isInvalid={Boolean(errors.email)}
                  errorText={errors.email?.message}
                >
                  <InputField
                    placeholder={TEXT.auth.register.emailPlaceholder}
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
                <View>
                  <Input
                    label={TEXT.auth.register.passwordLabel}
                    isRequired
                    isInvalid={Boolean(errors.password)}
                    errorText={errors.password?.message}
                  >
                    <InputField
                      placeholder={TEXT.auth.register.passwordPlaceholder}
                      secureTextEntry={!showPassword}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                    />
                    <InputSlot className="pr-2" onPress={toggleShowPassword}>
                      <InputIcon as={showPassword ? EyeOffIcon : EyeIcon} />
                    </InputSlot>
                  </Input>

                  <Text className="mt-2 body-xs text-typography-500">
                    {TEXT.auth.register.passwordHelper}
                  </Text>
                </View>
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={TEXT.auth.register.confirmPasswordLabel}
                  isRequired
                  isInvalid={Boolean(errors.confirmPassword)}
                  errorText={errors.confirmPassword?.message}
                >
                  <InputField
                    placeholder={TEXT.auth.register.confirmPasswordPlaceholder}
                    secureTextEntry={!showConfirmPassword}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                  <InputSlot
                    className="pr-2"
                    onPress={toggleShowConfirmPassword}
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

        <View className="pt-6 pb-6">
          <Button
            action="primary"
            variant="solid"
            size="lg"
            isDisabled={isSubmitting}
            onPress={submit}
          >
            <ButtonText>{TEXT.auth.register.submit}</ButtonText>
          </Button>
        </View>
      </View>
    </BaseView>
  );
}
