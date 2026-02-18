import { BaseView } from "@/components/ui/core/base-view";
import { Button, ButtonText } from "@/components/ui/core/button";
import { ChevronLeftIcon, Icon } from "@/components/ui/core/icon";
import { Input, InputField } from "@/components/ui/core/input";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <BaseView>
      <Text>Hello LOGIN </Text>
      <Button
        onPress={() => router.navigate("/register")}
        variant="solid"
        size="md"
        action="primary"
        className="rounded-xl"
      >
        <ButtonText>Click me</ButtonText>
      </Button>
      <View className="pt-10">
        <Input
          variant="outline"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputField placeholder="Enter Text here..." />
        </Input>
        <Icon as={ChevronLeftIcon} size="md" />
      </View>
    </BaseView>
  );
}
