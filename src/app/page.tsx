"use client";

import { useState } from "react";

interface Task {
  id: number;
  text: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const openModal = (task: Task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Task Manager</h1>

          <form onSubmit={addTask} className="mb-6">
            <div className="flex items-center border-b border-gray-300 py-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
              <button
                type="submit"
                className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
              >
                Add Task
              </button>
            </div>
          </form>

          <ul className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <li key={task.id} className="py-4 flex items-center justify-between">
                <span
                  className="text-gray-800 cursor-pointer"
                  onClick={() => openModal(task)} // Open modal on task click
                >
                  {task.text.length > 50 ? `${task.text.substring(0, 50)}...` : task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal for task detail */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Task Details</h2>
            {currentTask && (
              <p className="text-gray-700 max-h-60 overflow-auto">
                {currentTask.text}
              </p>
            )}
            <div className="mt-4">
              <button
                onClick={closeModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
