import { FlashList, FlashListProps } from "@shopify/flash-list";
import { cssInterop } from "nativewind";
import { ListProps } from "./list.types";

cssInterop(FlashList, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});

export function List<TItem>({
  estimatedItemSize = 200,
  ...props
}: ListProps<TItem>) {
  const FlashListComponent = FlashList as unknown as React.ComponentType<any>;

  return (
    <FlashListComponent
      {...(props as unknown as FlashListProps<TItem>)}
      estimatedItemSize={estimatedItemSize}
    />
  );
}
