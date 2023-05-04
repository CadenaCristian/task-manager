import React from "react";
import InfoOurApp from '../screens/outOfSession/InfoOurApp';
import OutOfSession from './OutOfSession';
import { useAppSelector } from "../redux/hooks";
import TaskList from "../screens/inSession/task/TaskList";
import AddUpdateTask from "../screens/inSession/task/AddUpdateTask";
import TabsGenerator from "../components/tabsGenerator";
import { Colors } from "../common/Variables";

export default function Navigation() {
  const { isAuth }: any = useAppSelector((state) => state.userdata);

  const outOfsessionTabs: Array<any> = [
    {
      name: "Information",
      component: InfoOurApp,
      iconName: "info",
      color: Colors.mainColor,
      size: 25
    },
    {
      name: "SessionStack",
      component: OutOfSession,
      iconName: "person",
      color: Colors.mainColor,
      size: 28
    }
  ]

  const inOfsessionTabs: Array<any> = [
    {
      name: "listTask",
      component: TaskList,
      iconName: "list",
      color: "#fff",
      size: 23
    },
    {
      name: "manageTask",
      component: AddUpdateTask,
      iconName: "add-circle",
      color: "#fff",
      size: 23
    },
    {
      name: "profile",
      component: AddUpdateTask,
      iconName: "settings",
      color: "#fff",
      size: 23
    }
  ]

  if (isAuth) {
    return (
      <TabsGenerator tabs={inOfsessionTabs} color={Colors.mainColor} />
    );
  } else {
    return (
      <TabsGenerator tabs={outOfsessionTabs} color={"#fff"} />
    );
  }
}
