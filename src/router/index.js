import HDiscover from "@/pages/discover";
import HMine from "@/pages/mine";
import HFriend from "@/pages/friend";


const routes = [
  {
    path: "/",
    exact: true,
    component: HDiscover
  },
  {
    path: "/mine",
    component: HMine
  },
  {
    path: "/friend",
    component: HFriend
  }
]

export default routes;
