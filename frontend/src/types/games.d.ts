export type Category = {
  id: string;
  name: string;
  age: number;
};

export type Game = {
  id: string;
  name: string;
  titleKey: string;
  categoryId: string;
  iconKey: string;
};
