import axios from "axios";
import { APIResponse, TodoFormData } from "../types";

const BASE_URL = "http://localhost:8000/api/todos";

export const fetchAllTodos = async () => {
  const data: APIResponse = await axios.get(BASE_URL);
  return data;
};

export const completeTodo = async (todoId: string) => {
  const completedTodoStatus = { isComplete: true };
  const response = await axios.patch(`${BASE_URL}/${todoId}`, completedTodoStatus);
  
  return response;
};

export const createTodo = async(newTodo: TodoFormData) => {
  const response = await axios.post(`${BASE_URL}/`, newTodo);

  return response;
}
