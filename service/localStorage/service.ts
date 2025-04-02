import { codesErrors, loadError } from "../errors";

export type SimpleProfile = {
  picture: string;
  name: string;
  username: string;
  typeUser: TypeUser;
};

type TypeUser = "user" | "nutri";

function isSimpleProfile(obj: SimpleProfile): obj is SimpleProfile {
  return typeof obj.name === "string" && typeof obj.username === "string";
}

export async function getUserBySimpleProfile(): Promise<SimpleProfile> {
  const simpleS = localStorage.getItem("simpleProfile");
  const typeUser = localStorage.getItem("type");

  let simpleProfile: SimpleProfile = {
    name: "No Found",
    picture: "",
    username: "No Username",
    typeUser: "user",
  };

  return new Promise((resolve, reject) => {
    if (simpleS && typeUser) {
      simpleProfile = JSON.parse(simpleS);
      simpleProfile.typeUser = typeUser as TypeUser;

      console.log(simpleProfile);

      console.log(isSimpleProfile(simpleProfile));

      if (isSimpleProfile(simpleProfile)) {
        resolve(simpleProfile);
        return;
      }
    }

    loadError(codesErrors.NSF.tag as keyof typeof codesErrors);
    reject(codesErrors.NSF.tag);
  });
}
