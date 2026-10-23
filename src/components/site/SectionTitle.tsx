import type { ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span className={["eyebrow", align === "center" ? "justify-center" : ""].join(" ")}>
          {eyebrow}
        </span>
      )}
      <Heading
        className={[
          "mt-4 font-semibold leading-[1.15] text-brand-navy",
          Heading === "h1"
            ? "text-4xl tracking-[-0.055em] md:text-5xl"
            : "text-3xl md:text-[2.5rem]",
        ].join(" ")}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={[
            "mt-5 max-w-xl text-[15px] leading-[1.8] text-muted-foreground",
            align === "center" ? "mx-auto" : "",
          ].join(" ")}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
