import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
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
  useToast,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createTodo, updateTodo } from "../../api/api";
import { TodoFormData, Todo } from "../../types";

type Props = {
  isOpen: boolean;
  todoData: TodoFormData | Todo;
  setTodoFormData: Dispatch<SetStateAction<{ title: string; description: string; }>>;
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onOpen: () => void;
};

const TodoForm = ({
  isOpen,
  onClose,
  onOpen,
  todoData,
  handleInputChange,
  setTodoFormData,
}: Props) => {

  const [error, setError] = React.useState(false);
  const [updating, setUpdating] = React.useState(false);
  const queryClient = useQueryClient();

  const toast = useToast();

  const {mutate, isLoading} = useMutation((newTodo: TodoFormData) => createTodo(newTodo), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      setTodoFormData({title: '', description: ''});
      onClose();
      toast({
        title: 'Todo added.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    },
    onError: () => setError(true)
  })

  

  const handleAddTodo = () => {
    mutate(todoData);
  };
  const handleSubmit = () => {
    setError(false)
    if (todoData.description === "" || todoData.title === "") {
      setError(true);
    } else {
      handleAddTodo();
    }
  };

  return (
    <>
      <Flex mt={5} mb={2} justifyContent="flex-end">
        <Button onClick={onOpen}>
          <AddIcon mr={4} />
          Add new
        </Button>
      </Flex>

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
                value={todoData.title}
                onChange={handleInputChange}
              />
              <FormLabel>Description:</FormLabel>
              <Input
                required
                type="text"
                name="description"
                placeholder="Description"
                value={todoData.description}
                onChange={handleInputChange}
              />
            </Stack>
            {error && <Text color={'red'} fontSize='10pt' mt={2}>Please enter both title and description.</Text>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => {
              onClose()
              setTodoFormData({title: '', description: ''})
            }}>
              Cancel
            </Button>
            <Button isLoading={isLoading} onClick={handleSubmit} type="submit" colorScheme={'green'}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TodoForm;
