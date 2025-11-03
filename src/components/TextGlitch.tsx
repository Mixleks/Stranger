export default function TextGlitch({ children }: any) {
  return <span className="glitch" data-text={children}>{children}</span>;
}
