import { Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { fetchAllTodos } from "../api/api";
import { Todo } from "../types";
import TodoForm from "./Todos/TodoForm";
import TodoItem from "./Todos/TodoItem";

type Props = {};

const AllTodos = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todoFormData, setTodoFormData] = React.useState({
    title: "",
    description: "",
  });

  const { data, isLoading, isError } = useQuery("todos", fetchAllTodos);

  if (isLoading) return <Text>Loading...</Text>;

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTodoFormData({
      ...todoFormData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <>
      <TodoForm
        setTodoFormData={setTodoFormData}
        handleInputChange={handleChange}
        todoData={todoFormData}
        onClose={onClose}
        isUpdating={false}
        onOpen={onOpen}
        isOpen={isOpen}
      />

      {data &&
        data?.data.todos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            setTodoFormData={setTodoFormData}
            todo={todo}
          />
        ))}
    </>
  );
};

export default AllTodos;
