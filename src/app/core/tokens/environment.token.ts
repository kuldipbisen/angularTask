import { InjectionToken } from "@angular/core";
import { IEnvironment } from "@environments/environment.interface";

export const ENVIRONMENT = new InjectionToken<IEnvironment>("ENVIRONMENT");
