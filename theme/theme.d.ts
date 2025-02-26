import "styled-components";
import { themeLight } from "./index";

type ThemeType = typeof themeLight;

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends ThemeType {}
}
