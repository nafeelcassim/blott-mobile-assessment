import {
  HomeEmptyState,
  HomeErrorState,
  HomeListItem,
} from "@/components/home";
import { BaseView } from "@/components/ui/core/base-view";
import { List } from "@/components/ui/core/list";
import { ActivityIndicator } from "@/components/ui/loading";
import { useGeneralNews } from "@/hooks";
import { Text, View } from "react-native";

const cardShadowStyle = {
  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 4 },
  elevation: 3,
} as const;

export default function HomeScreen() {
  const { data, isLoading, error, refetch, isRefetching } = useGeneralNews();
  console.log(data);

  return (
    <BaseView containsList>
      <View className="flex-1 bg-white pt-8">
        <Text className="body-4xl text-neutral-900">News Feed</Text>

        {isLoading ? (
          <ActivityIndicator />
        ) : error ? (
          <HomeErrorState onRetry={refetch} />
        ) : (data?.length ?? 0) === 0 ? (
          <HomeEmptyState />
        ) : (
          <View className="flex-1">
            <List
              className="flex-1 mt-6"
              data={data ?? []}
              keyExtractor={(item) => String(item.id)}
              estimatedItemSize={260}
              renderItem={({ item }) => (
                <View className="mt-3" style={cardShadowStyle}>
                  <View className="overflow-hidden rounded-xl border border-neutral-200 bg-white">
                    <HomeListItem item={item} />
                  </View>
                </View>
              )}
              ItemSeparatorComponent={() => <View className="h-4" />}
              contentContainerStyle={{ paddingBottom: 24 }}
              showsVerticalScrollIndicator={false}
              onRefresh={refetch}
              refreshing={isRefetching}
            />
          </View>
        )}
      </View>
    </BaseView>
  );
}
