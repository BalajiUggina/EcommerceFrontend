"use client";

import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
export type text = "signin_with" | "signup_with" | "continue_with" | undefined;
interface Props {
  handleGoogleSignIn: (credentialResponse: CredentialResponse) => void;
  text: text;
}

export default function GoogleSignInButton({
  handleGoogleSignIn,
  text,
}: Props) {
  return (
    <GoogleLogin
      text={text}
      logo_alignment="center"
      onSuccess={(credentialResponse) => {
        handleGoogleSignIn(credentialResponse);
      }}
      onError={() => {
        console.error("Google Login Failed");
      }}
      useOneTap={false}
    />
  );
}
