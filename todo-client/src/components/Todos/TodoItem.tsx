import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Todo, TodoFormData } from "../../types";
import { completeTodo, deleteTodo, getTodo, updateTodo } from "../../api/api";
import { DeleteIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";

interface TodoUpdateParams {
  id: string;
  todo: TodoFormData;
}

interface ToggleCompleteTodo {
  todoId: string;
  isComplete: boolean;
}

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  const [error, setError] = React.useState(false);
  const queryClient = useQueryClient();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: infoModalOpen,
    onOpen: openInfoModal,
    onClose: closeInfoModal,
  } = useDisclosure();
  const [todoFormData, setTodoFormData] = React.useState<TodoFormData>({
    title: todo.title,
    description: todo.description,
  });

  const { mutate } = useMutation(
    ({ todoId, isComplete }: ToggleCompleteTodo) =>
      completeTodo(todoId, isComplete),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
        toast({
          title: "Task updated.",
          status: "info",
          duration: 1000,
          isClosable: true,
        });
      },
    }
  );

  const { mutate: updateTodoItem, isLoading: updatingTodo } = useMutation(
    ({ id, todo }: TodoUpdateParams) => updateTodo(id, todo),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries("todos");
        onClose();
        toast({
          title: `${response.data.todo.title} updated.`,
          status: "info",
          duration: 2000,
          isClosable: true,
        });
        setTodoFormData({ title: "", description: "" });
      },
      onError: () => setError(true),
    }
  );

  const handleUpdateTodo = () => {
    updateTodoItem({
      id: todo.id,
      todo: { ...todoFormData, isComplete: false },
    });
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setTodoFormData({
      ...todoFormData,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const { mutate: deleteTodoItem } = useMutation(
    (todoId: string) => deleteTodo(todoId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
        toast({
          title: "Item deleted.",
          status: "info",
          duration: 1000,
          isClosable: true,
        });
      },
    }
  );

  return (
    <>
      <Box
        border={"1px solid"}
        borderColor="grey"
        borderRadius={10}
        mb={4}
        py={4}
        px={6}
      >
        <Flex alignItems={"center"} justifyContent="space-between">
          <Flex gap={2}>
            <Checkbox
              colorScheme="green"
              isChecked={todo.isComplete}
              onChange={() =>
                mutate({ todoId: todo.id, isComplete: todo.isComplete })
              }
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

          <Flex gap={6} alignItems="center">
            <ViewIcon
              width={5}
              height={5}
              onClick={() => {
                openInfoModal()
              }}
              cursor="pointer"
            />
            <EditIcon color="blue" cursor={"pointer"} onClick={onOpen} />
            <DeleteIcon
              onClick={() => deleteTodoItem(todo.id)}
              color={"red"}
              cursor="pointer"
            />
          </Flex>
        </Flex>
        <Text>{todo.description}</Text>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add new todo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <FormLabel>Title:</FormLabel>
                <Input
                  required
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={todoFormData.title}
                  onChange={handleChange}
                />
                <FormLabel>Description:</FormLabel>
                <Input
                  required
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={todoFormData.description}
                  onChange={handleChange}
                />
              </Stack>
              {error && (
                <Text color={"red"} fontSize="10pt" mt={2}>
                  Please enter both title and description.
                </Text>
              )}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                isLoading={updatingTodo}
                onClick={() => handleUpdateTodo()}
                type="submit"
                colorScheme={"green"}
              >
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isCentered isOpen={infoModalOpen} onClose={closeInfoModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize={24}>{todo.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <Flex gap={2}>
                  <Text fontWeight={'semibold'}>Description:</Text>
                  <Text>{todo.description}</Text>
                </Flex>
                <Flex gap={2}>
                  <Text fontWeight={'semibold'}>Completed:</Text>
                  <Text color={todo.isComplete ? 'green' : 'gray'}>{todo.isComplete ? 'Yes' : 'No'}</Text>
                </Flex>
                <Flex gap={2}>
                  <Text fontWeight={'semibold'}>Created At:</Text>
                  <Text>{new Date(todo.createdAt).toLocaleDateString() + " " + new Date(todo.createdAt).toLocaleTimeString()}</Text>
                </Flex>
                <Flex gap={2}>
                  <Text fontWeight={'semibold'}>Updated At:</Text>
                  <Text>{new Date(todo.createdAt).toLocaleDateString() + " " + new Date(todo.updatedAt).toLocaleTimeString()}</Text>
                </Flex>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={closeInfoModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default TodoItem;
