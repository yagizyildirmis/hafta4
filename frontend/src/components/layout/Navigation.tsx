import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

// App.tsx'ten kestiğin menuItems dizisi buraya gelecek

 const menuItems: { page: PageName; label: string }[] = [
   { page: "home", label: "Ana Sayfa" },
   { page: "events", label: "Etkinlikler" },
   { page: "add", label: "Ekle" },
 ];
 

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu">
      <ul>
        {menuItems.map((item) => (
          <li key={item.page}>
            <a
              href="#"
              aria-current={current === item.page ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.page);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;