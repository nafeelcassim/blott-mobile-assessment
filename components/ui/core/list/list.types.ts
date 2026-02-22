import { FlashListProps } from "@shopify/flash-list";

export type ListProps<TItem> = FlashListProps<TItem> & {
  className?: string;
  contentContainerClassName?: string;
  estimatedItemSize?: number;
};
