import { FlashList, FlashListProps } from "@shopify/flash-list";
import { cssInterop } from "nativewind";

cssInterop(FlashList, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});

type ListProps<TItem> = FlashListProps<TItem> & {
  className?: string;
  contentContainerClassName?: string;
  estimatedItemSize?: number;
};

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
