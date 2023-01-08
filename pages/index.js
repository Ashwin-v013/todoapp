import { useSelector } from "react-redux";
import Addform from "../components/form";
import AllTodos from "../components/todos";
import Notification from "../components/notification";
import Head from "next/head";


export default function Home() {
  const notification = useSelector(state => state.notification)

  return (
    <>
    <Head>
      <title>Todo App </title>
    </Head>
   { notification && <Notification title={notification.status} message={notification.error}/> }
    <section className="wrapper">
      <h1>Todo App</h1>
      <Addform />
      <div>
        <AllTodos />
      </div>
      </section>
    </>
  );
}
