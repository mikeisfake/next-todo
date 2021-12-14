import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import { Todo } from "../components/todo";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDetails, setTodoDetails] = useState("");

  const inputRef = useRef(null)

  const changeTitle = (e) => {
    setTodoTitle(e.target.value);
  };

  const changeDetails = (e) => {
    setTodoDetails(e.target.value);
  };

  const addTodo = (e) => {
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: todoTitle,
      details: todoDetails,
    };

    setTodos([newTodo, ...todos]);
    setTodoTitle("");
    setTodoDetails("");
    inputRef.current.focus()
  };

  useEffect(() => {
    let storedTodos = JSON.parse(localStorage.getItem("todos"))
    setTodos(storedTodos)
    inputRef.current.focus();
  },[])
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const removeTodo = (e) => {
    let todoId =  e.target.parentNode.id 
    let updatedTodos = todos.filter(todo => todo.id != todoId)

    setTodos(updatedTodos)
  }

  const closeDetails = (e) => {
    const details = document.querySelectorAll("details")

    details.forEach(detail => {
      if (detail != e.target) {
        detail.removeAttribute("open")
      } else if (e.target.hasAttribute("open")) {
        e.target.removeAttribute("open")
      }
    })
  }

  const todoList = todos
    .map((item) => {
      return <Todo key={item.id} item={item} closeDetails={closeDetails} removeTodo={removeTodo} />;
    })

  return (
    <div>
      <div className="container w-1/2 mx-auto ">
        <h1 className="text-4xl font-black py-4 text-sky-600  sticky top-0 bg-zinc-900">TODOS</h1>

        <form className="mt-4 bg-zinc-800 p-8 rounded" onSubmit={addTodo}>
          <h2 className="font-bold text-2xl mb-5">Create a new todo</h2>
          <div className="flex flex-col">
            <input
              type="text"
              name="title"
              ref={inputRef}
              placeholder="Title"
              onChange={changeTitle}
              value={todoTitle}
              required
              className="bg-zinc-700 rounded my-2 border-none placeholder:text-zinc-500 text-white focus:ring-offset-2 focus:ring-offset-transparent focus:ring-2 focus:ring-pink-700 focus:border-none"
            />

            <input
              type="text"
              name="details"
              placeholder="Details"
              onChange={changeDetails}
              value={todoDetails}
              className="bg-zinc-700 rounded my-2 border-none placeholder:text-zinc-500 text-white focus:ring-offset-2 focus:ring-offset-transparent focus:ring-2 focus:ring-pink-700 focus:border-none"
            />
          </div>
          <button
            type="submit"
            className="p-2 bg-pink-700 mt-6 rounded flex items-center font-bold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M12 4v16m8-8H4"
              />
            </svg>
            add todo
          </button>
        </form>

        <div className="mt-8">{todoList}</div>
      </div>
    </div>
  );
}
