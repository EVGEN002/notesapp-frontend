import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { cn } from "./lib/utils";
import { Button } from "./components/ui/button";
import { Notebook } from "lucide-react";
import { Badge } from "./components/ui/badge";

interface Task {
  guid: string;
  text: string;
  created_at: Date;
  updated_at: Date;
  started_at: Date;
  completed_at: Date;
  total_time_spent: number;
  status: 0 | 1 | 2 | 3 | 4 | 5;
}

const Task = ({ task, onClick }: { task: Task, onClick: () => void }) => {
  return (
    <div className={cn("rounded-md p-6 bg-zinc-300", { "bg-cyan-300": task.status === 0, "bg-yellow-300": task.status === 1, "bg-green-300": task.status === 4 })}>
      <div className="line-clamp-5 text-ellipsis text-lg font-semibold">
        {task.text}
      </div>
      <div className="flex items-center space-x-3 mt-4">
        <Badge>{new Date(task.created_at).toLocaleDateString("ru-RU")} {new Date(task.created_at).toLocaleTimeString('ru-RU')}</Badge>
      </div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0);
  const [tasks, setTasks] = useState<Task[] | null>(null);

  useEffect(() => {
    fetch('http://localhost:5169/all').then(res => res.json().then(res => setTasks(res)));
  }, []);

  const editTask = () => {
    
  }

  return (
    <div className="min-dvh-screen p-4">
      <div className="flex items-center justify-between py-4">
        <div className="text-4xl font-bold flex items-center">Notes</div>
        <Button size="lg">Add note</Button>
      </div>
      <div className="mt-6 grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 gap-4">
        {tasks && tasks.map((task) => (
          <Task task={task} onClick={editTask} />
        ))}
      </div>
    </div>
  );
}

export default App;
