/** Admin area: not for public search or social previews. */
export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: {
    default: "Admin",
    template: "%s | Admin",
  },
};

export default function AdminLayout({ children }) {
  return children;
}
