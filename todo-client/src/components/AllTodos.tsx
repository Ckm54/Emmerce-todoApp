import {
  Container,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
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

  if (isLoading)
    return (
      <Stack
        justifyContent={"center"}
        alignItems="center"
        height={"100vh"}
        width={"100vh"}
      >
        <Container>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Container>
      </Stack>
    );

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTodoFormData({
      ...todoFormData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <>
      <Text fontSize={24} fontWeight='semibold' mt={10}>Your todos:</Text>
      <TodoForm
        setTodoFormData={setTodoFormData}
        handleInputChange={handleChange}
        todoData={todoFormData}
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
      />

      {data &&
        data?.data.todos.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
    </>
  );
};

export default AllTodos;
