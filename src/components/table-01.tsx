export default function SkeletonTableExpanded() {
  const Skeleton = ({ className }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );

  return (
    <div className="border rounded-lg overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b">
            {[...Array(10)].map((_, i) => (
              <th key={i} className="px-4 py-3 text-left">
                <Skeleton className="h-3 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, i) => (
            <tr key={i} className="border-b">
              {[...Array(10)].map((_, j) => (
                <td key={j} className="px-4 py-3">
                  <Skeleton className="h-5 w-20" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}