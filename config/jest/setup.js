import "jest-styled-components";
import { URL } from "url";

global.URL = URL;
global.window = { location : {} };
