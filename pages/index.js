import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Addform from "../components/form";
import AllTodos from "../components/todos";
import Notification from "../components/notification";

export default function Home() {
  return (
    <>
      <h1>Todo App</h1>
      <Addform />
      <div>
        <AllTodos />
      </div>
    </>
  );
}
