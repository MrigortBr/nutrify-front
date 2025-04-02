import { Severity, showAlert } from "@/components/alert/page";

export const codesErrors = {
  NSF: { message: "Perfil não encontrado, faça login novamente.", typeError: "error" as Severity, tag: "NSF" },
};

export function loadError(errorCode: keyof typeof codesErrors) {
  const error = codesErrors[errorCode];
  showAlert(error.message, error.typeError);
}
