import { Link } from "@tanstack/react-router"
import styles from "./Header.module.scss"

const links: {path: string, label: React.ReactNode}[] = [
  {path: '/about', label: "about"},
  {path: '/work-experience', label: "work experience"},
  {path: '/blog', label: "blog"},
  {path: '/demo-projects', label: "demo projects"},
];

export const Header = () => {
  return <section className={styles['header-layout']}>
    <ul className={styles.links}>{links.map(link => <Link key={link.path} to={link.path}>{link.label}</Link>)}</ul>
  </section>
}