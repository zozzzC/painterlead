import { Alert } from "@mantine/core";
import { InformationCircleIcon } from "hugeicons-react";

export default function InputError({ errorMessage }: { errorMessage: string }) {
  const icon = <InformationCircleIcon />;
  return (
    <Alert variant="light" color="red" title={errorMessage} icon={icon}></Alert>
  );
}
