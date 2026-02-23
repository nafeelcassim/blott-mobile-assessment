import { FinnhubNewsItem } from "@/models";
import { formatNewsDate } from "@/utils";
import React from "react";
import { Image, Linking, Pressable, Text, View } from "react-native";

export type HomeListItemProps = {
  item: FinnhubNewsItem;
};

export function HomeListItem({ item }: HomeListItemProps) {
  const onReadMore = React.useCallback(async () => {
    if (!item.url) return;
    const canOpen = await Linking.canOpenURL(item.url);
    if (canOpen) {
      await Linking.openURL(item.url);
    }
  }, [item.url]);

  return (
    <View className="bg-white">
      <View className="flex-row gap-4 p-5">
        <View className="h-38 w-36 overflow-hidden rounded-lg bg-neutral-100">
          {!!item.image ? (
            <Image
              source={{ uri: item.image }}
              className="h-full w-full"
              resizeMode="stretch"
            />
          ) : null}
        </View>

        <View className="flex-1">
          <Text className="body-2xs text-neutral-500">
            {formatNewsDate(item.datetime)}
          </Text>
          <Text className="mt-1 body-2xs text-neutral-500">{item.source}</Text>

          <Text className="mt-3 heading-sm text-neutral-900" numberOfLines={4}>
            {item.headline}
          </Text>

          <Pressable onPress={onReadMore}>
            <Text className="body-2xs text-neutral-500 underline mt-3">
              Read More
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
