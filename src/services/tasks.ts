import { useEffect, useState } from "react";

export const useLocalStorage = (initialState: [object]) => {
  const get = () => {
    const tasks = JSON.parse(
      localStorage.getItem("tasks") || JSON.stringify(initialState)
    );
    return tasks;
  };

  const [value, setValue] = useState(get());

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(value));
    setValue(value);
  }, [value]);

  return [value, setValue];
};
