import { Redirect } from "expo-router";
import { JSX } from "react";

const Index = (): JSX.Element => {
  return <Redirect href='auth/log_in' />
}
export default Index;
