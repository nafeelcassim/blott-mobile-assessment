import { useAuthStore } from "@/stores";
import { RegisterInput, registerSchema } from "@/validations/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";

export function useRegisterScreen() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const register = useAuthStore((s) => s.register);

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
    await register({
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    });
    router.navigate("/set-pin");
  };

  return {
    control,
    errors,
    isSubmitting,
    showPassword,
    showConfirmPassword,
    toggleShowPassword: () => setShowPassword((prev) => !prev),
    toggleShowConfirmPassword: () => setShowConfirmPassword((prev) => !prev),
    submit: handleSubmit(onSubmit),
  };
}
