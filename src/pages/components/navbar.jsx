
import Link from 'next/link';
import styles from './Navbar.module.css'; // Importing styles

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link href="/" style={{ textDecoration: 'none' }}>
                <p className={styles.title}>BloomSpace</p>
            </Link>
        </nav>
    );
}
