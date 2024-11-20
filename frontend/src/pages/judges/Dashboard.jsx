import Navbar from "@/components/components/Header";

export default function Dashboard() {

  const logoUrl = "https://via.placeholder.com/150"; // Replace with your company logo URL
  const tagContent = "Admin";
  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Profile", to: "/profile" },
    { label: "Settings", to: "/settings" },
  ];

  return (
    <div>
      <Navbar logo={logoUrl} tagContent={tagContent} menuItems={menuItems} />
    </div>
  )
}
