export default function TableBlock({ block }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-primary/10 border-dark/20 dark:border-light/20 border">
          <tr>
            {block.headers?.map((h, i) => (
              <th key={i} className="p-3 text-right">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {block.rows?.map((row, i) => (
            <tr
              key={i}
              className="border-dark/20 dark:border-light/20 border-t"
            >
              {row.map((cell, j) => (
                <td key={j} className="p-3">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
