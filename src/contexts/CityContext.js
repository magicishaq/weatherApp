import { createContext } from "react";

//context with a hook
const CityContext = createContext(["england", () => {}]);

export default CityContext;