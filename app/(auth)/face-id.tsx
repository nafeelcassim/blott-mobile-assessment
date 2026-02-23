import { BaseView } from "@/components/ui/core/base-view";
import { Button, ButtonText } from "@/components/ui/core/button";
import { TEXT } from "@/constants";
import { useFaceIdScreen } from "@/hooks";
import { Image, Text, View } from "react-native";

export default function FaceIdScreen() {
  const { isEnabling, isSupported, onEnableFaceId, onNotNow } =
    useFaceIdScreen();

  return (
    <BaseView edges={["bottom", "left", "right"]}>
      <View className="flex-1 justify-between">
        <View className="flex-1 items-center justify-center px-6">
          <View className="h-20 w-20 rounded-2xl bg-gray-100 items-center justify-center border-4 border-white shadow-md">
            <Image
              source={require("../../assets/images/face-id.png")}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          </View>
          <Text className="mt-6 body-2xl text-black">
            {TEXT.auth.faceId.title}
          </Text>
          <Text className="mt-2 body-md text-center text-base text-gray-500 max-w-[280px]">
            {isSupported
              ? TEXT.auth.faceId.supportedDescription
              : TEXT.auth.faceId.unsupportedDescription}
          </Text>
        </View>

        <View className="pb-6 gap-3">
          <Button
            action="primary"
            variant="solid"
            size="lg"
            className="rounded-full"
            isDisabled={!isSupported || isEnabling}
            onPress={onEnableFaceId}
          >
            <ButtonText>{TEXT.auth.faceId.enable}</ButtonText>
          </Button>

          <Button
            action="secondary"
            variant="outline"
            size="lg"
            className="rounded-full"
            onPress={onNotNow}
          >
            <ButtonText>{TEXT.auth.faceId.notNow}</ButtonText>
          </Button>
        </View>
      </View>
    </BaseView>
  );
}
