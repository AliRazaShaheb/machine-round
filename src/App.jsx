import { MultiSelectDropdown } from "./components/MultiSelectDropdown";
import UserCrud from "./components/UserCrud";

function App() {
  return (
    <div className="">
      <h1 className="flex justify-center items-center w-full text-lg font-medium my-4">
        Machine Round Projects
      </h1>
      <div className="mx-8">
        <UserCrud />
      </div>
    </div>
  );
}

export default App;
