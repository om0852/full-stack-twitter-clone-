import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "./component/Header";
import Form from "./component/Form";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (

  <>
                          <Header label='Home'/>
                          <Form placeholder="what's happening?"/>
                          </>
  );
}
