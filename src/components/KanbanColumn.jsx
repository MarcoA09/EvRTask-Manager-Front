import KanbanCard from "./KanbanCard";

const KanbanColumn = ({ title, children }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg w-1/3 min-h-[550px]">
      <h2 className="text-lg text-gray-900 font-bold mb-2">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
};

export default KanbanColumn;
export { KanbanCard }; 

  