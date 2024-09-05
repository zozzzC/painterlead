import { AUTH_CONFIG } from "@/auth-variables";
import "rxjs/add/operator/filter";
import auth0 from "auth0-js";
import { redirect } from "next/navigation";

//taken from Auth0 Docs 
export class AuthService {
  userProfile: any;
  requestedScopes: string = "openid profile read:timesheets create:timesheets";

  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: "token id_token",
    audience: AUTH_CONFIG.apiUrl,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: this.requestedScopes,
  });

  constructor() {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err: any, authResult: any) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = "";
        this.setSession(authResult);
        redirect("/");
      } else if (err) {
        redirect("/");
        console.log(err);
        alert(
          'Error: <%= "${err.error}" %>. Check the console for further details.',
        );
      }
    });
  }

  private setSession(authResult: any): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime(),
    );

    // If there is a value on the scope param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes = authResult.scope || this.requestedScopes || "";

    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    localStorage.setItem("scopes", JSON.stringify(scopes));
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("scopes");
    // Go back to the home route
    redirect("/");
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    //@ts-ignore
    const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }

  public userHasScopes(scopes: Array<string>): boolean {
    //@ts-ignore
    const grantedScopes = JSON.parse(localStorage.getItem("scopes")).split(" ");
    return scopes.every((scope) => grantedScopes.includes(scope));
  }
}
