import axios from "axios";
import { APIResponse, TodoFormData } from "../types";

const BASE_URL = "http://localhost:8000/api/todos";
const token = 'e8b3a734a8d07cca56dcce11b78f579e7ad864c7'

export const fetchAllTodos = async () => {
  const data: APIResponse = await axios.get(BASE_URL, {
    headers: {
      'Authorization': `Token ${token}`
    }
  });
  return data;
};

export const getTodo = async (todoId: string) => {
  const response = await axios.get(`${BASE_URL}/${todoId}`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  });
  
  return response;
};

export const completeTodo = async (todoId: string, isComplete: boolean) => {
  const completedTodoStatus = { isComplete: !isComplete };
  const response = await axios.patch(`${BASE_URL}/${todoId}`, completedTodoStatus, {
    headers: {
      'Authorization': `Token ${token}`
    }
  });
  
  return response;
};

export const updateTodo = async (todoId: string, todoData: TodoFormData) => {
  const response = await axios.patch(`${BASE_URL}/${todoId}`, todoData, {
    headers: {
      'Authorization': `Token ${token}`
    }
  });
  
  return response;
};

export const createTodo = async(newTodo: TodoFormData) => {
  const response = await axios.post(`${BASE_URL}/`, newTodo, {
    headers: {
      'Authorization': `Token ${token}`
    }
  });

  return response;
}

export const deleteTodo = async(todoId: string) => {
  const response = await axios.delete(`${BASE_URL}/${todoId}`, {
    headers: {
      'Authorization': `Token ${token}`
    }
  });

  return response;
}
