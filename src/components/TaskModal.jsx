// // components/TaskModal.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import { PlusCircle, X, Save, Calendar, AlignLeft, Flag, CheckCircle } from 'lucide-react';
// import { baseControlClasses, priorityStyles, DEFAULT_TASK } from '../assets/dummy';
// import API from "../api"; // ✅ use your axios instance

// const TaskModal = ({ isOpen, onClose, taskToEdit, onSave, onLogout }) => {
//   const [taskData, setTaskData] = useState(DEFAULT_TASK);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const today = new Date().toISOString().split('T')[0];

//   // ✅ Load data when modal opens
//   useEffect(() => { 
//     if (!isOpen) return;
//     if (taskToEdit) {
//       const normalized = taskToEdit.completed === 'Yes' || taskToEdit.completed === true ? 'Yes' : 'No';
//       setTaskData({
//         ...DEFAULT_TASK,
//         title: taskToEdit.title || '',
//         description: taskToEdit.description || '',
//         priority: taskToEdit.priority || 'Low',
//         dueDate: taskToEdit.dueDate?.split('T')[0] || '',
//         completed: normalized,
//         id: taskToEdit._id,
//          owner: taskToEdit.owner || localStorage.getItem('userId'),
//       });
//     } else {
//       setTaskData(DEFAULT_TASK);
//     }
//     setError(null);
//   }, [isOpen, taskToEdit]);

//   // ✅ Handle input change
//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setTaskData(prev => ({ ...prev, [name]: value }));
//   }, []);

//   // ✅ Submit (create or update)
//   const handleSubmit = useCallback(async (e) => {
//     e.preventDefault();
//     if (taskData.dueDate < today) {
//       setError('Due date cannot be in the past.');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       let resp;
//     const payload = {
//                title: taskData.title,
//                description: taskData.description,
//                priority: taskData.priority,
//                dueDate: new Date(taskData.dueDate).toISOString(), // full ISO string
//                completed: taskData.completed === 'Yes',
             
// };

//       if (taskData.id) {
//         // ✅ Edit existing task
//         resp = await API.put(`/tasks/${taskData.id}`, payload);
//       } else {
//         // ✅ Create new task
//         resp = await API.post(`/tasks`, payload);
//       }

//       onSave?.(resp.data);
//       onClose();
//     } catch (err) {
//       console.error('Task save error:', err);
//       if (err.response?.status === 401) {
//         onLogout?.();
//       } else {
//         setError(err.response?.data?.message || err.message || 'Failed to save task');
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [taskData, today, onSave, onLogout, onClose]);

//   if (!isOpen) return null;

//   // ✅ Modal UI
//   return (
//     <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
//       <div className="bg-white border border-purple-100 rounded-xl max-w-md w-full shadow-lg p-6 relative animate-fadeIn">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             {taskData.id 
//               ? <Save className="text-purple-500 w-5 h-5" /> 
//               : <PlusCircle className="text-purple-500 w-5 h-5" />}
//             {taskData.id ? 'Edit Task' : 'Create New Task'}
//           </h2>
//           <button 
//             onClick={onClose} 
//             className="p-2 hover:bg-purple-100 rounded-lg transition-colors text-gray-500 hover:text-purple-700"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {error && (
//             <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
//               {error}
//             </div>
//           )}

//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
//             <div className="flex items-center border border-purple-100 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 transition-all duration-200">
//               <input
//                 type="text"
//                 name="title"
//                 required
//                 value={taskData.title}
//                 onChange={handleChange}
//                 className="w-full focus:outline-none text-sm"
//                 placeholder="Enter task title"
//               />
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
//               <AlignLeft className="w-4 h-4 text-purple-500" /> Description
//             </label>
//             <textarea
//               name="description"
//               rows="3"
//               value={taskData.description}
//               onChange={handleChange}
//               className={baseControlClasses}
//               placeholder="Add details about your task"
//             />
//           </div>

//           {/* Priority + Due Date */}
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
//                 <Flag className="w-4 h-4 text-purple-500" /> Priority
//               </label>
//               <select
//                 name="priority"
//                 value={taskData.priority}
//                 onChange={handleChange}
//                 className={`${baseControlClasses} ${priorityStyles[taskData.priority]}`}
//               >
//                 <option>Low</option>
//                 <option>Medium</option>
//                 <option>High</option>
//               </select>
//             </div>
//             <div>
//               <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
//                 <Calendar className="w-4 h-4 text-purple-500" /> Due Date
//               </label>
//               <input
//                 type="date"
//                 name="dueDate"
//                 required
//                 min={today}
//                 value={taskData.dueDate}
//                 onChange={handleChange}
//                 className={baseControlClasses}
//               />
//             </div>
//           </div>

//           {/* Completed / In Progress */}
//           <div>
//             <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
//               <CheckCircle className="w-4 h-4 text-purple-500" /> Status
//             </label>
//             <div className="flex gap-4">
//               {[{ val: 'Yes', label: 'Completed' }, { val: 'No', label: 'In Progress' }].map(({ val, label }) => (
//                 <label key={val} className="flex items-center">
//                   <input
//                     type="radio"
//                     name="completed"
//                     value={val}
//                     checked={taskData.completed === val}
//                     onChange={handleChange}
//                     className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
//                   />
//                   <span className="ml-2 text-sm text-gray-700">{label}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 hover:shadow-md transition-all duration-200"
//           >
//             {loading 
//               ? 'Saving...' 
//               : (taskData.id 
//                 ? (<><Save className="w-4 h-4" /> Update Task</>) 
//                 : (<><PlusCircle className="w-4 h-4" /> Create Task</>)
//               )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TaskModal;



// ---------------------------------------------




// components/TaskModal.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, X, Save, Calendar, AlignLeft, Flag, CheckCircle } from 'lucide-react';
import { baseControlClasses, priorityStyles, DEFAULT_TASK } from '../assets/dummy';
import API from "../api"; // ✅ use your axios instance

const TaskModal = ({ isOpen, onClose, taskToEdit, onSave, onLogout }) => {
  const [taskData, setTaskData] = useState(DEFAULT_TASK);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const today = new Date().toISOString().split('T')[0];

  // ✅ Load data when modal opens
  useEffect(() => { 
    if (!isOpen) return;
    if (taskToEdit) {
      const normalized = taskToEdit.completed === 'Yes' || taskToEdit.completed === true ? 'Yes' : 'No';
      setTaskData({
        ...DEFAULT_TASK,
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        priority: taskToEdit.priority || 'Low',
        dueDate: taskToEdit.dueDate?.split('T')[0] || '',
        completed: normalized,
        id: taskToEdit._id,
         owner: taskToEdit.owner || localStorage.getItem('userId'),
      });
    } else {
      setTaskData(DEFAULT_TASK);
    }
    setError(null);
  }, [isOpen, taskToEdit]);

  // ✅ Handle input change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({ ...prev, [name]: value }));
  }, []);

  // ✅ Submit (create or update)
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (taskData.dueDate < today) {
      setError('Due date cannot be in the past.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let resp;
    const payload = {
               title: taskData.title,
               description: taskData.description,
               priority: taskData.priority,
               dueDate: new Date(taskData.dueDate).toISOString(), // full ISO string
               completed: taskData.completed === 'Yes',
             
};

      if (taskData.id) {
        // ✅ Edit existing task
        resp = await API.put(`/tasks/${taskData.id}`, payload);
      } else {
        // ✅ Create new task
        resp = await API.post(`/tasks`, payload);
      }

      onSave?.(resp.data);
      onClose();
    } catch (err) {
      console.error('Task save error:', err);
      if (err.response?.status === 401) {
        onLogout?.();
      } else {
        setError(err.response?.data?.message || err.message || 'Failed to save task');
      }
    } finally {
      setLoading(false);
    }
  }, [taskData, today, onSave, onLogout, onClose]);

  if (!isOpen) return null;

  // ✅ Modal UI
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-purple-100 rounded-xl max-w-md w-full shadow-lg p-6 relative animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {taskData.id 
              ? <Save className="text-purple-500 w-5 h-5" /> 
              : <PlusCircle className="text-purple-500 w-5 h-5" />}
            {taskData.id ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-purple-100 rounded-lg transition-colors text-gray-500 hover:text-purple-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <div className="flex items-center border border-purple-100 rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500 transition-all duration-200">
              <input
                type="text"
                name="title"
                required
                value={taskData.title}
                onChange={handleChange}
                className="w-full focus:outline-none text-sm"
                placeholder="Enter task title"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <AlignLeft className="w-4 h-4 text-purple-500" /> Description
            </label>
            <textarea
              name="description"
              rows="3"
              value={taskData.description}
              onChange={handleChange}
              className={baseControlClasses}
              placeholder="Add details about your task"
            />
          </div>

          {/* Priority + Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Flag className="w-4 h-4 text-purple-500" /> Priority
              </label>
              <select
                name="priority"
                value={taskData.priority}
                onChange={handleChange}
                className={`${baseControlClasses} ${priorityStyles[taskData.priority]}`}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                <Calendar className="w-4 h-4 text-purple-500" /> Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                required
                min={today}
                value={taskData.dueDate}
                onChange={handleChange}
                className={baseControlClasses}
              />
            </div>
          </div>

          {/* Completed / In Progress */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-purple-500" /> Status
            </label>
            <div className="flex gap-4">
              {[{ val: 'Yes', label: 'Completed' }, { val: 'No', label: 'In Progress' }].map(({ val, label }) => (
                <label key={val} className="flex items-center">
                  <input
                    type="radio"
                    name="completed"
                    value={val}
                    checked={taskData.completed === val}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 hover:shadow-md transition-all duration-200"
          >
            {loading 
              ? 'Saving...' 
              : (taskData.id 
                ? (<><Save className="w-4 h-4" /> Update Task</>) 
                : (<><PlusCircle className="w-4 h-4" /> Create Task</>)
              )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;

