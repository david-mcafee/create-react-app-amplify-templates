import { useState, useEffect, useCallback } from "react";
import { DataStore } from "aws-amplify";
import {
  Button,
  Collection,
  Card,
  Heading,
  Flex,
  Text,
} from "@aws-amplify/ui-react";

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

  async function deleteTodo(todo: any) {
    if (!todo) return;
    await DataStore.delete(todo.id);
  }

  return (
    <Card width={"100%"} variation={"elevated"}>
      <Flex direction="column" alignItems="center">
        <Card width={"100%"} variation={"elevated"}>
          <Flex direction={"column"} alignItems="center">
            <Heading level={1}>My Todos</Heading>
          </Flex>
        </Card>
        <Card variation={"elevated"}>
          <Flex direction={"column"}>
            <Button onClick={getTodos}>Get Todos</Button>
            <Button onClick={createTodo}>Create Todo</Button>
            <Button onClick={updateLastTodo}>Update Last Todo</Button>
          </Flex>
        </Card>
        <Collection type="list" items={todos} gap="1.5rem">
          {(todo, index) => (
            <Card
              key={todo.id ? todo.id : index}
              padding="1.5rem"
              variation={"elevated"}
            >
              <Heading level={4}>{todo.name}</Heading>
              <Text>{todo.description}</Text>
              <Button
                loadingText="loading"
                ariaLabel="Delete"
                onClick={() => deleteTodo(todo)}
              >
                Delete
              </Button>
            </Card>
          )}
        </Collection>
      </Flex>
    </Card>
  );
}

export default TodoComponent;
