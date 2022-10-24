import "../todoStyles.css";
import { useState, useEffect, useCallback } from "react";
import { DataStore, Predicates } from "aws-amplify";
import { Todo } from "../../models";
let subscriptions: any[] = [];

function TodoComponent() {
  const [todos, setTodos] = useState<any>([]);

  const initSubs = useCallback(() => {
    if (subscriptions.length) {
      unsubSubs();
    }

    subscriptions.push(
      DataStore.observe(Todo).subscribe((msg) => {
        console.log("observe", msg);
        getTodos();
      })
    );
  }, []);

  useEffect(() => {
    initSubs();

    return () => {
      unsubSubs();
    };
  }, [initSubs]);

  function unsubSubs() {
    subscriptions &&
      subscriptions.length &&
      subscriptions.forEach((sub) => sub.unsubscribe());
  }

  async function getTodos() {
    const _todos = await DataStore.query(Todo);
    setTodos(_todos);
    console.log("Todos", _todos);
  }

  async function createTodo() {
    try {
      const todo = await DataStore.save(
        new Todo({
          name: `Todo ${Date.now()}`,
        })
      );

      setTodos([todo]);
      console.log("Todo created:", todo);
    } catch (error) {
      console.error("Save failed:", error);
    }
  }

  async function updateLastTodo() {
    const [originalTodo] = await DataStore.query(Todo);
    console.log("Original Todo:", originalTodo);

    try {
      const todo = await DataStore.save(
        Todo.copyOf(originalTodo, (updated) => {
          updated.name = `name ${Date.now()}`;
        })
      );

      console.log("Todo updated:", todo);
    } catch (error) {
      console.error("Save failed:", error);
    }
  }

  async function deleteLastTodo() {
    const [todo] = await DataStore.query(Todo);
    if (!todo) return;
    await DataStore.delete(todo);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo</h1>
        <div className="buttons">
          <button data-test="datastore-query-1" onClick={getTodos}>
            Query
          </button>
          <button data-test="datastore-create-1" onClick={createTodo}>
            Create
          </button>
          <button data-test="datastore-update-1" onClick={updateLastTodo}>
            Update Last
          </button>
          <button data-test="datastore-delete-1" onClick={deleteLastTodo}>
            Delete Last
          </button>
        </div>
        <pre>
          <span>todos:</span>
          <pre data-test="datastore-output-1">
            {JSON.stringify(todos, null, 2)}
          </pre>
        </pre>
      </header>
    </div>
  );
}

export default TodoComponent;
