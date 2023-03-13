import { Box, Checkbox, Flex, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Todo } from "../../types";
import { completeTodo } from "../../api/api";
import { DeleteIcon } from "@chakra-ui/icons";

type Props = {
  todo: Todo;
  setTodoFormData: Dispatch<
    SetStateAction<{ title: string; description: string }>
  >;
};

const TodoItem = ({ todo }: Props) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation((todoId: string) => completeTodo(todoId), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  return (
    <Box border={"1px solid"} borderColor='grey' borderRadius={10} mb={4} py={4} px={6}>
      <Flex alignItems={'center'} justifyContent='space-between'>
        <Flex gap={2}>
          <Checkbox
            colorScheme="green"
            isChecked={todo.isComplete}
            onChange={() => (todo.isComplete ? null : mutate(todo.id))}
          />

          <Text
            fontSize={18}
            fontWeight="semibold"
            as={todo.isComplete ? "s" : "a"}
            color={todo.isComplete ? "green" : "black"}
          >
            {todo.title}
          </Text>
        </Flex>

        <DeleteIcon color={'red'} cursor='pointer' />
      </Flex>
      <Text>{todo.description}</Text>
    </Box>
  );
};

export default TodoItem;
