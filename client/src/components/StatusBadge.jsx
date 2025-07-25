// src/components/StatusBadge.jsx
function StatusBadge({ status }) {
    const getBadgeColor = (status) => {
      switch (status) {
        case 'Pending':
          return 'bg-yellow-500';
        case 'In Progress':
          return 'bg-blue-500';
        case 'Delivered':
          return 'bg-green-500';
        default:
          return 'bg-gray-500';
      }
    };
  
    return (
      <span className={`text-white px-3 py-1 rounded-full ${getBadgeColor(status)}`}>
        {status}
      </span>
    );
  }
  
  export default StatusBadge;
  