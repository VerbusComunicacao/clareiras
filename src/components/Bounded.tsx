import type { ReactNode } from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: "div" | "section" | "header" | "article" | "footer";
  yPadding?: "sm" | "base" | "lg";
  collapsible?: boolean;
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
};

export function Bounded({
  as: Comp = "div",
  yPadding = "base",
  collapsible = true,
  className,
  children,
  style,
}: BoundedProps) {
  return (
    <Comp
      data-collapsible={collapsible}
      className={clsx(
        "px-6",
        yPadding === "sm" && "py-6 md:py-8",
        yPadding === "base" && "py-12 md:py-16",
        yPadding === "lg" && "py-16 md:py-24",
        className,
      )}
      style={style}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Comp>
  );
}
