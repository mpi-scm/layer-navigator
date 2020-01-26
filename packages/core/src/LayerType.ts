export type LayerType = Readonly<{
  key: symbol;
  label: string;
  navigate?: () => void;
}>;
