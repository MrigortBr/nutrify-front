import { showAlert } from "@/components/alert/page";

export function emailIsNullAndValid(email: string) {
  if (!email.trim()) {
    showAlert("O e-mail não pode estar vazio!", "error");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showAlert("Digite um e-mail válido!", "error");
    return false;
  }

  return true;
}

function nameIsNullAndMinSize(name: string) {
  if (!name.trim()) {
    showAlert("O nome não pode estar vazia!", "error");
    return false;
  }

  if (name.length < 0) {
    showAlert("O nome deve ter pelo menos 6 caracteres!", "error");
    return false;
  }

  return true;
}

export function passwordIsNullAndMinSize(password: string) {
  if (!password.trim()) {
    showAlert("A senha não pode estar vazia!", "error");
    return false;
  }

  if (password.length < 5) {
    showAlert("A senha deve ter pelo menos 6 caracteres!", "error");
    return false;
  }

  return true;
}

export function validateFormLogin(email: string, passwod: string) {
  if (!emailIsNullAndValid(email)) return false;
  if (!passwordIsNullAndMinSize(passwod)) return false;

  console.log("Retornando true;");

  return true;
}

export function validateConfirmEmail(email: string, confirmEmail: string) {
  if (email === confirmEmail) {
    return true;
  } else {
    showAlert("Os emails devem ser iguais.", "error");
  }
}

export function passwordIsSame(password: string, confirmPassoword: string) {
  if (password !== confirmPassoword) {
    showAlert("As senhas devem ser iguais", "error");
    return false;
  }

  return true;
}

export function tokenMinSize(token: string | null) {
  try {
    if (token == undefined || token.trim().length != 64) {
      showAlert("O Token informado é invalido, solicite um novo e tente novamente.", "error");
      return false;
    }
    return true;
  } catch (error) {
    showAlert("O Token informado é invalido, solicite um novo e tente novamente.", "error");
    return false;
  }
}

export function validateFormRegister(name: string, email: string, confirmEmail: string, password: string) {
  if (!nameIsNullAndMinSize(name)) return false;
  if (!emailIsNullAndValid(email)) return false;
  if (!validateConfirmEmail(email, confirmEmail)) return false;
  if (!passwordIsNullAndMinSize(password)) return false;

  console.log("Retornando true;");

  return true;
}
