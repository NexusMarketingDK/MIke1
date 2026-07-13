import { MDXRemote } from "next-mdx-remote/rsc";

// Typografi-styling til MDX-brødtekst.
const komponenter = {
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-12 text-2xl font-bold tracking-tight text-krom" {...p} />
  ),
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 text-xl font-bold text-krom" {...p} />
  ),
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mt-4 leading-relaxed text-staal-lys" {...p} />
  ),
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mt-4 list-disc space-y-2 pl-6 text-staal-lys marker:text-accent" {...p} />
  ),
  ol: (p: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-staal-lys marker:text-accent" {...p} />
  ),
  li: (p: React.HTMLAttributes<HTMLLIElement>) => <li className="pl-1" {...p} />,
  strong: (p: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-krom" {...p} />
  ),
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-accent underline underline-offset-4 hover:text-accent-klar" {...p} />
  ),
  blockquote: (p: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="mt-6 border-l-2 border-accent pl-5 text-lg italic text-krom"
      {...p}
    />
  ),
};

export function MdxIndhold({ kilde }: { kilde: string }) {
  return (
    <div className="text-base">
      <MDXRemote source={kilde} components={komponenter} />
    </div>
  );
}
