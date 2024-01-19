import { memo } from "react";
import { CompTreeWithDnd } from "./components/CompTreeWithDnd";
import { CompTreeDefault } from "./components/CompTreeDefault";

interface CompTreeProps {
  rootId: string | null;
  withDnd?: boolean;
}

const CompTreeTmpl = (props: CompTreeProps) => {
  const { rootId, withDnd = true } = props;

  return withDnd ? (
    <CompTreeWithDnd rootId={rootId} />
  ) : (
    <CompTreeDefault rootId={rootId} />
  );
};

export const CompTree = memo(CompTreeTmpl);
