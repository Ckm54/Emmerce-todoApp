export interface APIResponse {
  status:    string;
  total:     number;
  page:      number;
  last_page: number;
  data:     Todos;
}

export interface Todos {
  todos: Todo[]
}

export interface Todo {
  id:          string;
  title:       string;
  description: string;
  isComplete:  boolean;
  createdAt:   Date;
  updatedAt:   Date;
}

interface TodoFormData {
  title: string;
  description: string;
}
