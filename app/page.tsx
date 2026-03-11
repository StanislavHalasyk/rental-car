import Link from "next/link";
import Image from "next/image";
import css from "./Home.module.css";

export default function HomePage() {
  return (
    <section className={css.hero}>
      {/* Фоновая картинка через next/image для качества */}
      <div className={css.imageWrapper}>
        <Image
          src="/hero-bg.jpg"
          alt="Rental Car"
          fill
          priority
          className={css.image}
          sizes="100vw"
        />
        {/* Градиентный оверлей */}
        <div className={css.overlay}></div>
      </div>

      {/* Контент поверх картинки */}
      <div className={css.container}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.subtitle}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link href="/catalog" className={css.button}>
          View Catalog
        </Link>
      </div>
    </section>
  );
}
