import MultiSelectDropdown from "@/pages/multiselect-dropdown/MultiSelectDropdown";
import UserCrud from "@/pages/users-crud/UserCrud";

export const appRoutes = [
  {
    title: "Multiselect Dropdown",
    path: "/multiselect-dropdown",
    component: MultiSelectDropdown,
  },
  {
    title: "API User CRUD",
    path: "/api-user-crud",
    component: UserCrud,
  },
];
