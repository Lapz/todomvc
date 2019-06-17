import Todo from "./Todo";

export default interface Filter {
  name: String;
  fn: (pred: Todo) => boolean;
}
