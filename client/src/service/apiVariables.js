export const login = {
   url: "/auth/login",
   method: "post",
   get api() {
      return `${this.url}`;
   },
};

export const register = {
   url: "/auth/register",
   method: "post",
   get api() {
      return `${this.url}`;
   },
};

export const getAvatarImages = {
   url: "/images",
   method: "get",
   get api() {
      return `${this.url}`;
   },
};

export const createTodo = {
   url: "/todo/create",
   method: "post",
   get api() {
      return `${this.url}`;
   },
};

export const getAllTodo = {
   url: "/todo/getAll",
   method: "get",
   token: true,
   get api() {
      return `${this.url}`;
   },
};

export const editTodo = {
   url: "/todo/edit",
   method: "put",
   token: true,
   get api() {
      return `${this.url}`;
   },
};

export const deleteTodo = {
   url: "/todo/delete",
   method: "delete",
   token: true,
   id: null,
   get api() {
      return `${this.url}/${this.id}`;
   },
};

export const filterDate = {
   url: "/todo/filterdate",
   method: "post",
   token: true,
   get api() {
      return `${this.url}`;
   },
};

export const logout = {
   url: "/auth/logout",
   method: "post",
   get api() {
      return `${this.url}`;
   },
};
