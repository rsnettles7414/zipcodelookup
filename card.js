export function Card({ children, ...props }) {
  return <div {...props} className="bg-white border rounded-2xl shadow p-4">{children}</div>;
}

export function CardContent({ children, ...props }) {
  return <div {...props}>{children}</div>;
}